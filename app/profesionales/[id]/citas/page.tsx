import AppointmentActions from "@/components/appointment/AppointmentActions";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

interface Appointment {
  id: string;
  date: string;
  time: string;
  modality: string;
  reason: string;
  status: string;

  patient: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };

  service: {
    name: string;
    durationMinutes: number | null;
    price: string | null;
  };

  office: {
    name: string;
  } | null;
}

export default async function CitasProfesionalPage({
  params,
}: PageProps) {
  const { id } = await params;

  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
    }/api/appointments?specialistId=${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("No fue posible obtener las citas.");
  }

  const result = await response.json();

  const appointments: Appointment[] =
    result.success ? result.data : [];

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">

        {/* ENCABEZADO */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

            <div>

              <p className="text-sm font-medium text-emerald-700">
                SAVIA · Panel profesional
              </p>

              <h1 className="mt-2 text-3xl font-bold text-slate-900">
                Mis citas
              </h1>

              <p className="mt-2 text-gray-600">
                Consulta las solicitudes de cita recibidas y su estado.
              </p>

            </div>

            <a
              href="/mi-cuenta"
              className="inline-flex shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-gray-50"
            >
              Volver a mi panel
            </a>

          </div>

        </div>

        {/* CITAS */}
        <div className="mt-8 space-y-4">

          {appointments.length === 0 ? (

            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">

              <p className="text-gray-500">
                No hay citas registradas.
              </p>

            </div>

          ) : (

            appointments.map((appointment) => (

              <div
                key={appointment.id}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >

                {/* CABECERA DE CITA */}
                <div className="flex items-start justify-between gap-6">

                  <div>

                    <h2 className="text-xl font-semibold text-slate-900">
                      {appointment.patient.firstName}{" "}
                      {appointment.patient.lastName}
                    </h2>

                    <p className="mt-1 text-gray-500">
                      {appointment.service.name}
                    </p>

                  </div>

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-medium ${
                      appointment.status === "PENDING"
                        ? "bg-amber-100 text-amber-700"
                        : appointment.status === "CONFIRMED"
                        ? "bg-emerald-100 text-emerald-700"
                        : appointment.status === "REJECTED"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {appointment.status === "PENDING"
                      ? "Pendiente de confirmación"
                      : appointment.status === "CONFIRMED"
                      ? "Cita confirmada"
                      : appointment.status === "REJECTED"
                      ? "Cita rechazada"
                      : appointment.status}
                  </span>

                </div>

                {/* DATOS DE LA CITA */}
                <div className="mt-6 grid gap-4 border-t border-gray-100 pt-6 md:grid-cols-4">

                  <div>
                    <p className="text-sm text-gray-500">
                      Fecha
                    </p>

                    <p className="mt-1 font-medium text-slate-900">
                      {new Date(
                        appointment.date
                      ).toLocaleDateString("es-MX", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
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

                  <div>
                    <p className="text-sm text-gray-500">
                      Duración
                    </p>

                    <p className="mt-1 font-medium text-slate-900">
                      {appointment.service.durationMinutes
                        ? `${appointment.service.durationMinutes} minutos`
                        : "No especificada"}
                    </p>
                  </div>

                </div>

                {/* CONTACTO */}
                <div className="mt-6 border-t border-gray-100 pt-5">

                  <p className="text-sm text-gray-500">
                    Contacto del paciente
                  </p>

                  <p className="mt-1 text-slate-900">
                    {appointment.patient.email}
                  </p>

                  <p className="text-slate-900">
                    {appointment.patient.phone}
                  </p>

                </div>

                {/* ACCIONES */}
                <AppointmentActions
                  appointmentId={appointment.id}
                  specialistId={id}
                  status={appointment.status}
                />

              </div>

            ))

          )}

        </div>

      </div>
    </main>
  );
}