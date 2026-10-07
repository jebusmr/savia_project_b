import { redirect } from "next/navigation";
import Link from "next/link";

import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import LogoutButton from "@/components/auth/LogoutButton";

export default async function AdminPage() {
  const user = await getCurrentUser();

  // -----------------------------------------------
  // 1. Verificar sesión
  // -----------------------------------------------

  if (!user) {
    redirect("/login");
  }

  // -----------------------------------------------
  // 2. Verificar rol administrativo
  // -----------------------------------------------

  if (user.role !== "ADMIN") {
    redirect("/mi-cuenta");
  }

  // -----------------------------------------------
  // 3. Obtener estadísticas reales
  // -----------------------------------------------

  const [
    totalProfessionals,
    pendingVerifications,
    inReviewVerifications,
    verifiedProfessionals,
  ] = await Promise.all([
    prisma.specialist.count(),

    prisma.specialistverification.count({
      where: {
        verificationStatus: "PENDING",
      },
    }),

    prisma.specialistverification.count({
      where: {
        verificationStatus: "IN_REVIEW",
      },
    }),

    prisma.specialistverification.count({
      where: {
        verificationStatus: "VERIFIED",
      },
    }),
  ]);

  // -----------------------------------------------
  // 4. Panel administrativo
  // -----------------------------------------------

  return (
    <main className="min-h-screen bg-gray-50">

      <div className="mx-auto max-w-6xl px-6 py-10">

        {/* ------------------------------------------
            ENCABEZADO
        ------------------------------------------ */}

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

        {/* ------------------------------------------
            PANEL
        ------------------------------------------ */}

        <div className="rounded-2xl bg-white p-8 shadow-sm">

          {/* ----------------------------------------
              ENCABEZADO
          ---------------------------------------- */}

          <div className="border-b border-gray-100 pb-6">

            <p className="text-sm font-medium text-emerald-600">
              SAVIA · Administración
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#17365D]">
              Panel administrativo
            </h1>

            <p className="mt-2 text-gray-600">
              Bienvenido, {user.email}
            </p>

          </div>

          {/* ----------------------------------------
              RESUMEN
          ---------------------------------------- */}

          <div className="grid gap-5 py-8 md:grid-cols-4">

            {/* Profesionales */}

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">

              <p className="text-sm font-medium text-gray-500">
                Profesionales
              </p>

              <p className="mt-2 text-3xl font-bold text-[#17365D]">
                {totalProfessionals}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Registrados en SAVIA
              </p>

            </div>

            {/* Pendientes */}

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">

              <p className="text-sm font-medium text-gray-600">
                Pendientes
              </p>

              <p className="mt-2 text-3xl font-bold text-amber-700">
                {pendingVerifications}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Por revisar
              </p>

            </div>

            {/* En revisión */}

            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">

              <p className="text-sm font-medium text-gray-600">
                En revisión
              </p>

              <p className="mt-2 text-3xl font-bold text-blue-700">
                {inReviewVerifications}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Solicitudes activas
              </p>

            </div>

            {/* Verificados */}

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">

              <p className="text-sm font-medium text-gray-600">
                Verificados
              </p>

              <p className="mt-2 text-3xl font-bold text-emerald-700">
                {verifiedProfessionals}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Perfiles aprobados
              </p>

            </div>

          </div>

          {/* ----------------------------------------
              ADMINISTRACIÓN
          ---------------------------------------- */}

          <div className="border-t border-gray-100 pt-8">

            <h2 className="text-xl font-semibold text-[#17365D]">
              Administración
            </h2>

            <div className="mt-5 grid gap-4 md:grid-cols-2">

              {/* Verificaciones */}

              <Link
                href="/admin/profesionales"
                className="rounded-2xl border border-gray-200 bg-white p-6 transition hover:border-emerald-400 hover:shadow-sm"
              >

                <h3 className="font-semibold text-[#17365D]">
                  Verificación de profesionales
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Revisa las solicitudes de profesionales
                  y administra su proceso de validación.
                </p>

                <span className="mt-4 inline-block text-sm font-semibold text-emerald-600">
                  Ver solicitudes →
                </span>

              </Link>

              {/* Profesionales */}

              <Link
                href="/admin/profesionales"
                className="rounded-2xl border border-gray-200 bg-white p-6 transition hover:border-emerald-400 hover:shadow-sm"
              >

                <h3 className="font-semibold text-[#17365D]">
                  Profesionales registrados
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Consulta la información de los profesionales
                  registrados en SAVIA.
                </p>

                <span className="mt-4 inline-block text-sm font-semibold text-emerald-600">
                  Ver profesionales →
                </span>

              </Link>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}