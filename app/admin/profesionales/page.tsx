import { redirect } from "next/navigation";
import Link from "next/link";

import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import LogoutButton from "@/components/auth/LogoutButton";

function getStatusLabel(status: string) {
  switch (status) {
    case "PENDING":
      return "Pendiente";

    case "IN_REVIEW":
      return "En revisión";

    case "VERIFIED":
      return "Verificado";

    case "CHANGES_REQUIRED":
      return "Requiere correcciones";

    case "REJECTED":
      return "Rechazado";

    default:
      return status;
  }
}

function getStatusClasses(status: string) {
  switch (status) {
    case "PENDING":
      return "bg-amber-50 text-amber-700 border-amber-200";

    case "IN_REVIEW":
      return "bg-blue-50 text-blue-700 border-blue-200";

    case "VERIFIED":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";

    case "CHANGES_REQUIRED":
      return "bg-orange-50 text-orange-700 border-orange-200";

    case "REJECTED":
      return "bg-red-50 text-red-700 border-red-200";

    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
}

export default async function AdminProfesionalesPage() {
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
  // 3. Obtener profesionales
  // -----------------------------------------------

  const professionals =
    await prisma.specialist.findMany({
      include: {
        specialty: true,
        specialistverification: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  // -----------------------------------------------
  // 4. Panel
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
            CONTENIDO
        ------------------------------------------ */}

        <div className="rounded-2xl bg-white p-8 shadow-sm">

          {/* Encabezado */}

          <div className="border-b border-gray-100 pb-6">

            <Link
              href="/admin"
              className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
            >
              ← Volver al panel administrativo
            </Link>

            <p className="mt-5 text-sm font-medium text-emerald-600">
              SAVIA · Administración
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#17365D]">
              Profesionales
            </h1>

            <p className="mt-2 text-gray-600">
              Consulta y revisa el estado de los profesionales
              registrados en SAVIA.
            </p>

          </div>

          {/* ----------------------------------------
              RESUMEN
          ---------------------------------------- */}

          <div className="mt-6">

            <p className="text-sm text-gray-500">
              Profesionales registrados
            </p>

            <p className="mt-1 text-2xl font-bold text-[#17365D]">
              {professionals.length}
            </p>

          </div>

          {/* ----------------------------------------
              LISTA
          ---------------------------------------- */}

          <div className="mt-8">

            {professionals.length === 0 ? (
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-sm text-gray-500">
                No hay profesionales registrados en SAVIA.
              </div>
            ) : (
              <div className="space-y-4">

                {professionals.map((professional) => {

                  const verificationStatus =
                    professional
                      .specialistverification
                      ?.verificationStatus ?? "PENDING";

                  return (
                    <div
                      key={professional.id}
                      className="rounded-2xl border border-gray-200 bg-white p-6"
                    >

                      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                        {/* Información */}

                        <div>

                          <h2 className="text-lg font-semibold text-[#17365D]">
                            {professional.firstName}{" "}
                            {professional.lastName}
                          </h2>

                          <p className="mt-1 text-sm text-gray-600">
                            {professional.specialty
                              .map(
                                (specialty) =>
                                  specialty.name
                              )
                              .join(", ") ||
                              "Especialidad no registrada"}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            {professional.email}
                          </p>

                        </div>

                        {/* Estado y acción */}

                        <div className="flex flex-col items-start gap-3 md:items-end">

                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClasses(
                              verificationStatus
                            )}`}
                          >
                            {getStatusLabel(
                              verificationStatus
                            )}
                          </span>

                          <Link
                            href={`/admin/profesionales/${professional.id}`}
                            className="rounded-lg bg-[#17365D] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#102A49]"
                          >
                            Revisar
                          </Link>

                        </div>

                      </div>

                    </div>
                  );
                })}

              </div>
            )}

          </div>

        </div>

      </div>

    </main>
  );
}