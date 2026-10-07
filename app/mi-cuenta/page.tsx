import { redirect } from "next/navigation";
import Link from "next/link";

import { getCurrentUser } from "@/lib/auth/session";
import LogoutButton from "@/components/auth/LogoutButton";
import AvailabilityManager from "@/components/professional/AvailabilityManager";
import VerificationStatus from "@/components/professional/VerificationStatus";

interface Appointment {
  id: string;
  status: string;
}

export default async function MiCuentaPage() {
  const user = await getCurrentUser();

  // --------------------------------------------------
  // 1. Verificar sesión
  // --------------------------------------------------

  if (!user) {
    redirect("/login");
  }

  if (user.role === "ADMIN") {
    redirect("/admin");
  }

  // --------------------------------------------------
  // 2. Panel profesional
  // --------------------------------------------------

  if (
    (user.role === "SPECIALIST" || user.role === "PROFESSIONAL") &&
    user.specialist
  ) {
    const verificationStatus =
      user.specialist.specialistverification?.verificationStatus ??
      "PENDING";

    const verificationNotes =
      user.specialist.specialistverification?.notes ?? "";

    let appointments: Appointment[] = [];

    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_APP_URL ??
          "http://localhost:3000"
        }/api/specialists/${user.specialist.id}/appointments`,
        {
          cache: "no-store",
        }
      );

      if (response.ok) {
        const result = await response.json();

        if (result.success) {
          appointments = result.data ?? [];
        }
      }
    } catch (error) {
      console.error(
        "Error obteniendo citas para el panel profesional:",
        error
      );
    }

    const pendingAppointments = appointments.filter(
      (appointment) =>
        appointment.status === "PENDING"
    ).length;

    const confirmedAppointments = appointments.filter(
      (appointment) =>
        appointment.status === "CONFIRMED"
    ).length;

    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-5xl px-6 py-10">

          {/* ------------------------------------------------
              ENCABEZADO
          ------------------------------------------------ */}

          <div className="mb-8 flex items-center justify-between">
            <div>
              <img
                src="/images/logo.jpeg"
                alt="SAVIA - Salud y desarrollo"
                className="h-16 w-auto object-contain"
              />
            </div>

            <LogoutButton />
          </div>

          {/* ------------------------------------------------
              PANEL PRINCIPAL
          ------------------------------------------------ */}

          <div className="rounded-2xl bg-white p-8 shadow-sm">

            {/* Encabezado del panel */}

            <div className="border-b border-gray-100 pb-6">

              <p className="text-sm font-medium text-emerald-600">
                SAVIA · Panel profesional
              </p>

              <div className="mt-2 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">

                <div>
                  <h1 className="text-3xl font-bold text-[#17365D]">
                    Mi panel profesional
                  </h1>

                  <p className="mt-1 text-gray-600">
                    {user.specialist.firstName}{" "}
                    {user.specialist.lastName}
                  </p>
                </div>

                <p className="font-medium text-emerald-600">
                  {user.specialist.specialty.length > 0
                    ? user.specialist.specialty
                        .map((specialty) => specialty.name)
                        .join(", ")
                    : "Especialidad pendiente"}
                </p>

              </div>

            </div>

            {/* ------------------------------------------------
                RESUMEN DE CITAS
            ------------------------------------------------ */}

            <div className="grid gap-5 py-8 md:grid-cols-2">

              {/* Pendientes */}

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">

                <p className="text-sm font-medium text-gray-500">
                  Citas pendientes
                </p>

                <p className="mt-2 text-4xl font-bold text-[#17365D]">
                  {pendingAppointments}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Solicitudes por revisar
                </p>

              </div>

              {/* Confirmadas */}

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">

                <p className="text-sm font-medium text-gray-500">
                  Citas confirmadas
                </p>

                <p className="mt-2 text-4xl font-bold text-emerald-600">
                  {confirmedAppointments}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Citas agendadas
                </p>

              </div>

            </div>

            {/* ------------------------------------------------
                ACCESOS RÁPIDOS
            ------------------------------------------------ */}

            <div className="border-t border-gray-100 pt-8">

              <h2 className="text-xl font-semibold text-[#17365D]">
                Accesos rápidos
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">

                {/* Mis citas */}

                <Link
                  href={`/profesionales/${user.specialist.id}/citas`}
                  className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-emerald-400 hover:shadow-sm"
                >
                  <p className="font-semibold text-[#17365D]">
                    Mis citas
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Consulta y administra las citas de tus pacientes.
                  </p>
                </Link>

                {/* Mi perfil */}

                <Link
                  href={`/profesionales/${user.specialist.id}`}
                  className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-emerald-400 hover:shadow-sm"
                >
                  <p className="font-semibold text-[#17365D]">
                    Mi perfil
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Consulta cómo ven los usuarios tu perfil profesional.
                  </p>
                </Link>

                {/* Servicios */}

                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">

                  <p className="font-semibold text-[#17365D]">
                    Servicios
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Administra los servicios que ofreces en SAVIA.
                  </p>

                  <span className="mt-3 inline-block text-xs font-medium text-emerald-600">
                    Próximamente
                  </span>

                </div>

                {/* Disponibilidad */}

                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">

                  <p className="font-semibold text-[#17365D]">
                    Disponibilidad
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Configura tus días y horarios de atención.
                  </p>

                  <span className="mt-3 inline-block text-xs font-medium text-emerald-600">
                    Administrar horarios más abajo
                  </span>

                </div>

              </div>

            </div>

            {/* ------------------------------------------------
                ADMINISTRACIÓN DE DISPONIBILIDAD
            ------------------------------------------------ */}

            <AvailabilityManager
              specialistId={user.specialist.id}
            />

            {/* ------------------------------------------------
                INFORMACIÓN DEL PERFIL
            ------------------------------------------------ */}

            <div className="mt-8 border-t border-gray-100 pt-8">

              <h2 className="text-xl font-semibold text-[#17365D]">
                Información de mi perfil
              </h2>

              <div className="mt-5">
                <VerificationStatus
                  specialistId={user.specialist.id}
                  status={verificationStatus}
                  notes={verificationNotes}
                />
              </div>

            </div>

            {/* ------------------------------------------------
                EDITAR PERFIL
            ------------------------------------------------ */}

            <div className="mt-6">

              <Link
                href={`/profesionales/${user.specialist.id}/perfil`}
                className="inline-flex rounded-xl bg-[#17365D] px-5 py-3 font-semibold text-white transition hover:bg-[#102A49]"
              >
                Completar / editar perfil
              </Link>

            </div>

          </div>

        </div>
      </main>
    );
  }

  // --------------------------------------------------
  // 3. Vista del paciente
  // --------------------------------------------------

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-6 py-10">

        {/* Logo */}

        <div className="mb-8">
          <img
            src="/images/logo.jpeg"
            alt="SAVIA - Salud y desarrollo"
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Panel */}

        <div className="rounded-2xl bg-white p-8 shadow-sm">

          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Mi cuenta
              </h1>

              <p className="mt-2 text-gray-600">
                Información de tu cuenta en SAVIA.
              </p>
            </div>

            <LogoutButton />

          </div>

          {/* Información del paciente */}

          <div className="mt-8 border-t border-gray-100 pt-6">

            <h2 className="text-xl font-semibold text-slate-900">
              Información personal
            </h2>

            {user.patient ? (
              <div className="mt-5 grid gap-5 md:grid-cols-2">

                <div>
                  <p className="text-sm text-gray-500">
                    Nombre
                  </p>

                  <p className="mt-1 font-medium text-slate-900">
                    {user.patient.firstName}{" "}
                    {user.patient.lastName}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Correo electrónico
                  </p>

                  <p className="mt-1 font-medium text-slate-900">
                    {user.patient.email}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Teléfono
                  </p>

                  <p className="mt-1 font-medium text-slate-900">
                    {user.patient.phone}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Tipo de cuenta
                  </p>

                  <p className="mt-1 font-medium text-slate-900">
                    Paciente
                  </p>
                </div>

              </div>
            ) : (
              <p className="mt-5 text-gray-500">
                No se encontró información de paciente.
              </p>
            )}

          </div>

          {/* Citas del paciente */}

          <div className="mt-8 border-t border-gray-100 pt-6">

            <h2 className="text-xl font-semibold text-slate-900">
              Mis citas
            </h2>

            <p className="mt-2 text-gray-600">
              Aquí podrás consultar tus próximas citas
              y el historial de atención.
            </p>

            <Link
              href="/mi-cuenta/citas"
              className="mt-5 inline-flex rounded-xl bg-[#17365D] px-5 py-3 font-semibold text-white transition hover:bg-[#102A49]"
            >
              Ver mis citas
            </Link>

          </div>

        </div>

      </div>
    </main>
  );
}