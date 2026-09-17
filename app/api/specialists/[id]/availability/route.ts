import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const { searchParams } = new URL(request.url);

    const date = searchParams.get("date");
    const serviceId = searchParams.get("serviceId");
    const modality = searchParams.get("modality");

    /*
     * Si no se solicita una fecha concreta,
     * conservamos el comportamiento original:
     * devolver la disponibilidad semanal.
     */
    if (!date) {
      const availability =
        await prisma.availability.findMany({
          where: {
            specialistId: id,
            status: "ACTIVE",
          },
          orderBy: [
            {
              dayOfWeek: "asc",
            },
            {
              startTime: "asc",
            },
          ],
        });

      return NextResponse.json({
        success: true,
        data: availability,
      });
    }

    /*
     * Para calcular horarios necesitamos
     * un servicio y una modalidad.
     */
    if (!serviceId || !modality) {
      return NextResponse.json(
        {
          success: false,
          error:
            "date, serviceId y modality son obligatorios para consultar horarios.",
        },
        { status: 400 }
      );
    }

    const selectedDate = new Date(`${date}T00:00:00`);

    if (Number.isNaN(selectedDate.getTime())) {
      return NextResponse.json(
        {
          success: false,
          error: "La fecha proporcionada no es válida.",
        },
        { status: 400 }
      );
    }

    /*
     * JavaScript:
     * 0 = domingo
     * 1 = lunes
     * ...
     * 6 = sábado
     *
     * Esto coincide con nuestro Availability.dayOfWeek.
     */
    const dayOfWeek = selectedDate.getDay();

    /*
     * Buscamos la disponibilidad del especialista
     * para ese día y modalidad.
     */
    const availability =
      await prisma.availability.findMany({
        where: {
          specialistId: id,
          dayOfWeek,
          modality,
          status: "ACTIVE",
        },
        orderBy: {
          startTime: "asc",
        },
      });

    /*
     * Si no trabaja ese día/modalidad,
     * no existen horarios disponibles.
     */
    if (availability.length === 0) {
      return NextResponse.json({
        success: true,
        data: {
          date,
          availableTimes: [],
        },
      });
    }

    /*
     * Obtenemos el servicio específico del especialista.
     */
    const specialistService =
      await prisma.specialistservice.findFirst({
        where: {
          specialistId: id,
          serviceId,
          status: "ACTIVE",
        },
        include: {
          service: true,
        },
      });

    if (!specialistService) {
      return NextResponse.json(
        {
          success: false,
          error:
            "El servicio seleccionado no está disponible para este especialista.",
        },
        { status: 404 }
      );
    }

    /*
     * La duración específica del especialista
     * tiene prioridad sobre la duración general del servicio.
     */
    const durationMinutes =
      specialistService.durationMinutes ??
      specialistService.service.durationMinutes;

    if (!durationMinutes || durationMinutes <= 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            "El servicio no tiene una duración válida configurada.",
        },
        { status: 400 }
      );
    }

    /*
     * Buscamos excepciones activas para la fecha.
     */
    const startOfDay = new Date(`${date}T00:00:00`);
    const endOfDay = new Date(`${date}T23:59:59.999`);

    const exceptions =
      await prisma.availabilityexception.findMany({
        where: {
          specialistId: id,
          status: "ACTIVE",
          date: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });

    /*
     * Si existe una excepción de bloqueo de día,
     * no hay horarios.
     *
     * Usamos BLOCKED como valor inicial.
     */
    const blockedDay = exceptions.some(
      (exception) =>
        exception.type === "BLOCKED"
    );

    if (blockedDay) {
      return NextResponse.json({
        success: true,
        data: {
          date,
          availableTimes: [],
        },
      });
    }

    /*
     * Buscamos citas existentes que puedan ocupar
     * horarios.
     *
     * CANCELLED no bloquea.
     */
    const appointments =
      await prisma.appointment.findMany({
        where: {
          specialistId: id,
          date: {
            gte: startOfDay,
            lte: endOfDay,
          },
          status: {
            in: ["PENDING", "CONFIRMED"],
          },
        },
        select: {
          time: true,
          service: {
            select: {
              durationMinutes: true,
            },
          },
        },
      });

    /*
     * Convertimos HH:MM a minutos desde medianoche.
     */
    const timeToMinutes = (
      time: string
    ): number => {
      const [hours, minutes] =
        time.split(":").map(Number);

      return hours * 60 + minutes;
    };

    /*
     * Convertimos minutos a HH:MM.
     */
    const minutesToTime = (
      minutes: number
    ): string => {
      const hours = Math.floor(
        minutes / 60
      );

      const mins = minutes % 60;

      return `${String(hours).padStart(2, "0")}:${String(
        mins
      ).padStart(2, "0")}`;
    };

    /*
     * Generamos los horarios posibles.
     */
    const availableTimes: string[] = [];

    for (const block of availability) {
      const blockStart =
        timeToMinutes(block.startTime);

      const blockEnd =
        timeToMinutes(block.endTime);

      let current = blockStart;

      while (
        current + durationMinutes <=
        blockEnd
      ) {
        const slotStart = current;
        const slotEnd =
          current + durationMinutes;

        /*
         * Comprobamos si existe una excepción
         * que bloquee este intervalo.
         */
        const blockedByException =
          exceptions.some((exception) => {
            if (
              exception.type !==
                "BLOCKED" &&
              exception.type !==
                "UNAVAILABLE"
            ) {
              return false;
            }

            if (
              !exception.startTime ||
              !exception.endTime
            ) {
              return true;
            }

            const exceptionStart =
              timeToMinutes(
                exception.startTime
              );

            const exceptionEnd =
              timeToMinutes(
                exception.endTime
              );

            return (
              slotStart <
                exceptionEnd &&
              slotEnd >
                exceptionStart
            );
          });

        /*
         * Comprobamos si una cita existente
         * se cruza con este horario.
         */
        const blockedByAppointment =
          appointments.some(
            (appointment) => {
              const appointmentStart =
                timeToMinutes(
                  appointment.time
                );

              const appointmentDuration =
                appointment.service
                  .durationMinutes ??
                durationMinutes;

              const appointmentEnd =
                appointmentStart +
                appointmentDuration;

              return (
                slotStart <
                  appointmentEnd &&
                slotEnd >
                  appointmentStart
              );
            }
          );

        if (
          !blockedByException &&
          !blockedByAppointment
        ) {
          availableTimes.push(
            minutesToTime(current)
          );
        }

        current += durationMinutes;
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        date,
        availableTimes,
      },
    });
  } catch (error) {
    console.error(
      "Error calculando horarios disponibles:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible calcular los horarios disponibles.",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const {
      dayOfWeek,
      startTime,
      endTime,
      modality,
    } = body;

    if (
      dayOfWeek === undefined ||
      !startTime ||
      !endTime ||
      !modality
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "dayOfWeek, startTime, endTime y modality son obligatorios.",
        },
        { status: 400 }
      );
    }

    if (dayOfWeek < 0 || dayOfWeek > 6) {
      return NextResponse.json(
        {
          success: false,
          error:
            "dayOfWeek debe estar entre 0 y 6.",
        },
        { status: 400 }
      );
    }

    const specialist =
      await prisma.specialist.findUnique({
        where: {
          id,
        },
      });

    if (!specialist) {
      return NextResponse.json(
        {
          success: false,
          error: "Especialista no encontrado.",
        },
        { status: 404 }
      );
    }

    const availability =
      await prisma.availability.create({
        data: {
          specialistId: id,
          dayOfWeek,
          startTime,
          endTime,
          modality,
        },
      });

    return NextResponse.json(
      {
        success: true,
        data: availability,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Error creando disponibilidad:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible guardar la disponibilidad.",
      },
      { status: 500 }
    );
  }
}