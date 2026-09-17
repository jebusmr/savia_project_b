import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import CancelAppointmentButton from "@/components/appointment/CancelAppointmentButton";

export default async function MisCitasPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (!user.patient) {
    redirect("/mi-cuenta");
  }

  const appointments = await prisma.appointment.findMany({
    where: {
      patientId: user.patient.id,
    },
    include: {
      specialist: {
        select: {
          firstName: true,
          lastName: true,
          title: true,
        },
      },
      service: {
        select: {
          name: true,
          durationMinutes: true,
          price: true,
        },
      },
      office: {
        select: {
          name: true,
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

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-6 py-10">

        <div className="mb-8">
          <img
            src="/images/logo.jpeg"
            alt="SAVIA - Salud y desarrollo"
            className="h-16 w-auto object-contain"
          />
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Mis citas
              </h1>

              <p className="mt-2 text-gray-600">
                Consulta tus citas programadas y su estado.
              </p>
            </div>

            <a
              href="/mi-cuenta"
              className="inline-flex w-fit items-center rounded-xl border border-gray-300 px-4 py-2 font-medium text-slate-700 transition hover:bg-gray-50"
            >
              Volver a mi cuenta
            </a>

          </div>

          <div className="mt-8 space-y-5">

            {appointments.length === 0 ? (
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center">

                <h2 className="text-lg font-semibold text-slate-900">
                  No tienes citas registradas
                </h2>

                <p className="mt-2 text-gray-600">
                  Cuando agendes una cita con un profesional,
                  aparecerá aquí.
                </p>

                <a
                  href="/especialistas"
                  className="mt-5 inline-flex rounded-xl bg-[#17365D] px-5 py-3 font-semibold text-white transition hover:bg-[#102A49]"
                >
                  Buscar especialista
                </a>

              </div>
            ) : (
              appointments.map((appointment) => {

                const statusLabel =
                  appointment.status === "PENDING"
                    ? "Pendiente de confirmación"
                    : appointment.status === "CONFIRMED"
                    ? "Confirmada"
                    : appointment.status === "REJECTED"
                    ? "Rechazada"
                    : appointment.status === "CANCELLED"
                    ? "Cancelada"
                    : appointment.status;

                const statusClass =
                  appointment.status === "CONFIRMED"
                    ? "bg-green-100 text-green-700"
                    : appointment.status === "REJECTED"
                    ? "bg-red-100 text-red-700"
                    : appointment.status === "CANCELLED"
                    ? "bg-gray-100 text-gray-700"
                    : "bg-amber-100 text-amber-700";

                return (
                  <div
                    key={appointment.id}
                    className="rounded-2xl border border-gray-200 bg-white p-6"
                  >

                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

                      <div>
                        <h2 className="text-xl font-semibold text-slate-900">
                          {appointment.specialist.title
                            ? `${appointment.specialist.title} `
                            : ""}
                          {appointment.specialist.firstName}{" "}
                          {appointment.specialist.lastName}
                        </h2>

                        <p className="mt-1 text-gray-600">
                          {appointment.service.name}
                        </p>
                      </div>

                      <span
                        className={`w-fit rounded-full px-4 py-2 text-sm font-medium ${statusClass}`}
                      >
                        {statusLabel}
                      </span>

                    </div>

                    <div className="mt-6 grid gap-5 md:grid-cols-3">

                      <div>
                        <p className="text-sm text-gray-500">
                          Fecha
                        </p>

                        <p className="mt-1 font-medium text-slate-900">
                          {new Date(
                            appointment.date
                          ).toLocaleDateString(
                            "es-MX",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Horario
                        </p>

                        <p className="mt-1 font-medium text-slate-900">
                          {appointment.time}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Modalidad
                        </p>

                        <p className="mt-1 font-medium text-slate-900">
                          {appointment.modality}
                        </p>
                      </div>

                    </div>

                    <div className="mt-6 border-t border-gray-100 pt-5">

                      <p className="text-sm text-gray-500">
                        Motivo de la consulta
                      </p>

                      <p className="mt-1 text-slate-900">
                        {appointment.reason}
                      </p>

                    </div>

                    {appointment.office && (
                      <div className="mt-4">

                        <p className="text-sm text-gray-500">
                          Consultorio
                        </p>

                        <p className="mt-1 text-slate-900">
                          {appointment.office.name}
                        </p>

                      </div>
                    )}

                    {(
                      appointment.status === "PENDING" ||
                      appointment.status === "CONFIRMED"
                    ) && (
                      <div className="mt-6 flex justify-end border-t border-gray-100 pt-5">
                        <CancelAppointmentButton
                          appointmentId={appointment.id}
                        />
                      </div>
                    )}

                  </div>
                );
              })
            )}

          </div>

        </div>

      </div>
    </main>
  );
}