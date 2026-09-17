import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const specialistId = searchParams.get(
      "specialistId"
    );

    if (!specialistId) {
      return NextResponse.json(
        {
          success: false,
          error:
            "El specialistId es obligatorio.",
        },
        { status: 400 }
      );
    }

    const appointments =
      await prisma.appointment.findMany({
        where: {
          specialistId,
        },

        include: {
          patient: true,
          service: true,
          office: {
            include: {
              address: true,
            },
          },
        },

        orderBy: [
          {
            date: "asc",
          },
          {
            time: "asc",
          },
        ],
      });

    return NextResponse.json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.error(
      "Error obteniendo citas:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible obtener las citas.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const {
      appointmentId,
      specialistId,
      patientId,
      status,
    } = body;

    // --------------------------------------------------
    // 1. Validar datos básicos
    // --------------------------------------------------

    if (!appointmentId || !status) {
      return NextResponse.json(
        {
          success: false,
          error:
            "appointmentId y status son obligatorios.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // 2. Validar estado solicitado
    // --------------------------------------------------

    const allowedStatuses = [
      "CONFIRMED",
      "REJECTED",
      "CANCELLED",
    ];

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "El estado solicitado no es válido.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // 3. Obtener usuario autenticado
    // --------------------------------------------------

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Debes iniciar sesión para realizar esta acción.",
        },
        { status: 401 }
      );
    }

    // --------------------------------------------------
    // 4. Buscar la cita
    // --------------------------------------------------

    const appointment =
      await prisma.appointment.findUnique({
        where: {
          id: appointmentId,
        },
      });

    if (!appointment) {
      return NextResponse.json(
        {
          success: false,
          error: "Cita no encontrada.",
        },
        { status: 404 }
      );
    }

    // --------------------------------------------------
    // 5. CANCELACIÓN POR PARTE DEL PACIENTE
    // --------------------------------------------------

    if (status === "CANCELLED") {
      // -----------------------------------------------
      // Verificar que el usuario tenga paciente
      // -----------------------------------------------

      if (!currentUser.patient) {
        return NextResponse.json(
          {
            success: false,
            error:
              "La cuenta no tiene un perfil de paciente.",
          },
          { status: 403 }
        );
      }

      // -----------------------------------------------
      // Verificar que la cita pertenezca al paciente
      // -----------------------------------------------

      if (
        appointment.patientId !==
        currentUser.patient.id
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "No tienes permiso para cancelar esta cita.",
          },
          { status: 403 }
        );
      }

      // -----------------------------------------------
      // Solo se pueden cancelar citas pendientes
      // o confirmadas
      // -----------------------------------------------

      if (
        appointment.status !== "PENDING" &&
        appointment.status !== "CONFIRMED"
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Esta cita no puede ser cancelada.",
          },
          { status: 409 }
        );
      }

      // -----------------------------------------------
      // Actualizar cita
      // -----------------------------------------------

      const updatedAppointment =
        await prisma.appointment.update({
          where: {
            id: appointmentId,
          },
          data: {
            status: "CANCELLED",
          },
          include: {
            patient: true,
            specialist: true,
            service: true,
            office: {
              include: {
                address: true,
              },
            },
          },
        });

      return NextResponse.json({
        success: true,
        data: updatedAppointment,
      });
    }

    // --------------------------------------------------
    // 6. CONFIRMAR / RECHAZAR POR PARTE DEL PROFESIONAL
    // --------------------------------------------------

    if (!specialistId) {
      return NextResponse.json(
        {
          success: false,
          error:
            "specialistId es obligatorio para actualizar el estado como profesional.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // 7. Obtener perfil del profesional actual
    // --------------------------------------------------

    if (!currentUser.specialist) {
      return NextResponse.json(
        {
          success: false,
          error:
            "La cuenta actual no tiene un perfil de profesional.",
        },
        { status: 403 }
      );
    }

    // --------------------------------------------------
    // 8. Verificar que sea el profesional correcto
    // --------------------------------------------------

    if (
      currentUser.specialist.id !==
      specialistId
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "No tienes permiso para modificar esta cita.",
        },
        { status: 403 }
      );
    }

    // --------------------------------------------------
    // 9. Verificar que la cita pertenezca
    //    al especialista
    // --------------------------------------------------

    if (
      appointment.specialistId !==
      specialistId
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "La cita no pertenece a este especialista.",
        },
        { status: 403 }
      );
    }

    // --------------------------------------------------
    // 10. Solo se pueden confirmar o rechazar
    //     citas PENDING
    // --------------------------------------------------

    if (appointment.status !== "PENDING") {
      return NextResponse.json(
        {
          success: false,
          error:
            "Esta cita ya no está pendiente de confirmación.",
        },
        { status: 409 }
      );
    }

    // --------------------------------------------------
    // 11. Actualizar estado
    // --------------------------------------------------

    const updatedAppointment =
      await prisma.appointment.update({
        where: {
          id: appointmentId,
        },
        data: {
          status,
        },
        include: {
          patient: true,
          specialist: true,
          service: true,
          office: {
            include: {
              address: true,
            },
          },
        },
      });

    // --------------------------------------------------
    // 12. Respuesta
    // --------------------------------------------------

    return NextResponse.json({
      success: true,
      data: updatedAppointment,
    });
  } catch (error) {
    console.error(
      "Error actualizando estado de cita:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible actualizar el estado de la cita.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      specialistId,
      serviceId,
      date,
      time,
      modality,
      reason,
      firstName,
      lastName,
      email,
      phone,
    } = body;

    // --------------------------------------------------
    // 1. Validar datos obligatorios
    // --------------------------------------------------

    if (
      !specialistId ||
      !serviceId ||
      !date ||
      !time ||
      !modality ||
      !reason
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Faltan datos obligatorios para registrar la cita.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // 2. Obtener usuario autenticado
    // --------------------------------------------------

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Debes iniciar sesión para registrar una cita.",
        },
        { status: 401 }
      );
    }

    // --------------------------------------------------
    // 3. Verificar que exista el paciente
    // --------------------------------------------------

    if (!currentUser.patient) {
      return NextResponse.json(
        {
          success: false,
          error:
            "La cuenta actual no tiene un perfil de paciente.",
        },
        { status: 403 }
      );
    }

    const patientId = currentUser.patient.id;

    // --------------------------------------------------
    // 4. Buscar especialista
    // --------------------------------------------------

    const specialist =
      await prisma.specialist.findUnique({
        where: {
          id: specialistId,
        },
      });

    if (!specialist) {
      return NextResponse.json(
        {
          success: false,
          error:
            "El especialista no existe.",
        },
        { status: 404 }
      );
    }

    // --------------------------------------------------
    // 5. Buscar servicio
    // --------------------------------------------------

    const service =
      await prisma.service.findUnique({
        where: {
          id: serviceId,
        },
      });

    if (!service) {
      return NextResponse.json(
        {
          success: false,
          error:
            "El servicio seleccionado no existe.",
        },
        { status: 404 }
      );
    }

    // --------------------------------------------------
    // 6. Verificar que el servicio pertenezca
    //    al especialista
    // --------------------------------------------------

    const specialistService =
  await prisma.specialistservice.findFirst({
    where: {
      specialistId,
      serviceId,
    },
  });

if (!specialistService) {
  return NextResponse.json(
    {
      success: false,
      error:
        "El servicio seleccionado no está disponible con este especialista.",
    },
    { status: 409 }
  );
}

// --------------------------------------------------
// 7. Preparar modalidad
// --------------------------------------------------

const requestedModality =
  String(modality).trim();

if (!requestedModality) {
  return NextResponse.json(
    {
      success: false,
      error:
        "La modalidad de la cita es obligatoria.",
    },
    { status: 400 }
  );
}

    // --------------------------------------------------
    // 8. Preparar fecha
    // --------------------------------------------------

    const appointmentDate = new Date(date);

    if (
      Number.isNaN(
        appointmentDate.getTime()
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "La fecha seleccionada no es válida.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // 9. Verificar que no exista otra cita
    //    del especialista en la misma fecha y hora
    // --------------------------------------------------

    const existingAppointment =
      await prisma.appointment.findFirst({
        where: {
          specialistId,
          date: appointmentDate,
          time,
          status: {
            in: [
              "PENDING",
              "CONFIRMED",
            ],
          },
        },
      });

    if (existingAppointment) {
      return NextResponse.json(
        {
          success: false,
          error:
            "El horario seleccionado ya no está disponible.",
        },
        { status: 409 }
      );
    }

    // --------------------------------------------------
    // 10. Crear cita
    // --------------------------------------------------

    const appointment =
      await prisma.appointment.create({
        data: {
          patientId,
          specialistId,
          serviceId,
          date: appointmentDate,
          time: String(time).trim(),
          modality: requestedModality,
          reason: String(reason).trim(),
          status: "PENDING",
        },
        include: {
          patient: true,
          specialist: true,
          service: true,
          office: {
            include: {
              address: true,
            },
          },
        },
      });

    // --------------------------------------------------
    // 11. Respuesta
    // --------------------------------------------------

    return NextResponse.json(
      {
        success: true,
        message:
          "Cita registrada correctamente.",
        data: appointment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Error registrando cita:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible registrar la cita.",
      },
      { status: 500 }
    );
  }
}