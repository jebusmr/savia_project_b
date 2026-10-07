import { notFound, redirect } from "next/navigation";
import Link from "next/link";

import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import LogoutButton from "@/components/auth/LogoutButton";
import VerificationActions from "@/components/admin/VerificationActions";
import VerificationChecks from "@/components/admin/VerificationChecks";

interface AdminProfessionalPageProps {
  params: Promise<{
    id: string;
  }>;
}

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
      return "border-amber-200 bg-amber-50 text-amber-700";

    case "IN_REVIEW":
      return "border-blue-200 bg-blue-50 text-blue-700";

    case "VERIFIED":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";

    case "CHANGES_REQUIRED":
      return "border-orange-200 bg-orange-50 text-orange-700";

    case "REJECTED":
      return "border-red-200 bg-red-50 text-red-700";

    default:
      return "border-gray-200 bg-gray-50 text-gray-700";
  }
}

export default async function AdminProfessionalPage({
  params,
}: AdminProfessionalPageProps) {
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
  // 3. Obtener ID
  // -----------------------------------------------

  const { id } = await params;

  // -----------------------------------------------
  // 4. Obtener profesional
  // -----------------------------------------------

  const professional =
    await prisma.specialist.findUnique({
      where: {
        id,
      },
      include: {
        specialty: true,
        specialistverification: true,
      },
    });

  if (!professional) {
    notFound();
  }

  // -----------------------------------------------
  // 5. Datos de verificación
  // -----------------------------------------------

  const verification =
    professional.specialistverification;

  const verificationStatus =
    verification?.verificationStatus ?? "PENDING";

  // -----------------------------------------------
  // 6. Panel administrativo
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

          {/* Navegación */}

          <div className="border-b border-gray-100 pb-6">

            <Link
              href="/admin/profesionales"
              className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
            >
              ← Volver a profesionales
            </Link>

            <p className="mt-5 text-sm font-medium text-emerald-600">
              SAVIA · Administración
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#17365D]">
              Revisión de profesional
            </h1>

            <p className="mt-2 text-gray-600">
              Consulta la información registrada antes de
              realizar la validación.
            </p>

          </div>

          {/* ----------------------------------------
              INFORMACIÓN DEL PROFESIONAL
          ---------------------------------------- */}

          <section className="border-b border-gray-100 py-8">

            <h2 className="text-xl font-semibold text-[#17365D]">
              Información del profesional
            </h2>

            <div className="mt-5 grid gap-5 md:grid-cols-2">

              <div>
                <p className="text-sm text-gray-500">
                  Nombre completo
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {professional.firstName}{" "}
                  {professional.lastName}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Correo electrónico
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {professional.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Teléfono
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {professional.phone ||
                    "No registrado"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Estado del profesional
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {professional.status}
                </p>
              </div>

              <div className="md:col-span-2">

                <p className="text-sm text-gray-500">
                  Especialidad
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {professional.specialty
                    .map(
                      (specialty) =>
                        specialty.name
                    )
                    .join(", ") ||
                    "Especialidad no registrada"}
                </p>

              </div>

              {professional.title && (
                <div className="md:col-span-2">

                  <p className="text-sm text-gray-500">
                    Título profesional
                  </p>

                  <p className="mt-1 font-medium text-gray-900">
                    {professional.title}
                  </p>

                </div>
              )}

            </div>

          </section>

          {/* ----------------------------------------
              VERIFICACIÓN
          ---------------------------------------- */}

          <section className="border-b border-gray-100 py-8">

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

              <div>

                <h2 className="text-xl font-semibold text-[#17365D]">
                  Estado de verificación
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Información utilizada para el proceso
                  de validación de SAVIA.
                </p>

              </div>

              <span
                className={`rounded-full border px-4 py-2 text-sm font-semibold ${getStatusClasses(
                  verificationStatus
                )}`}
              >
                {getStatusLabel(
                  verificationStatus
                )}
              </span>

            </div>

            {verification ? (
              <div className="mt-6 grid gap-5 md:grid-cols-2">

                {/* Cédula profesional */}

                <div>
                  <p className="text-sm text-gray-500">
                    Cédula profesional
                  </p>

                  <p className="mt-1 font-medium text-gray-900">
                    {verification.professionalLicense ||
                      "No registrada"}
                  </p>
                </div>

                {/* Cédula de especialidad */}

                <div>
                  <p className="text-sm text-gray-500">
                    Cédula de especialidad
                  </p>

                  <p className="mt-1 font-medium text-gray-900">
                    {verification.specialtyLicense ||
                      "No registrada"}
                  </p>
                </div>

                {/* Identidad */}

                <div className="rounded-xl border border-gray-200 p-4">

                  <p className="text-sm text-gray-500">
                    Identidad
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {verification.identityVerified
                      ? "✓ Verificada"
                      : "Pendiente"}
                  </p>

                </div>

                {/* Cédula */}

                <div className="rounded-xl border border-gray-200 p-4">

                  <p className="text-sm text-gray-500">
                    Cédula profesional
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {verification.licenseVerified
                      ? "✓ Verificada"
                      : "Pendiente"}
                  </p>

                </div>

                {/* Especialidad */}

                <div className="rounded-xl border border-gray-200 p-4">

                  <p className="text-sm text-gray-500">
                    Especialidad
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {verification.specialtyVerified
                      ? "✓ Verificada"
                      : "Pendiente"}
                  </p>

                </div>

                {/* Documentos */}

                <div className="rounded-xl border border-gray-200 p-4">

                  <p className="text-sm text-gray-500">
                    Documentos
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {verification.documentsVerified
                      ? "✓ Verificados"
                      : "Pendientes"}
                  </p>

                </div>

                {/* Fecha */}

                {verification.verifiedAt && (
                  <div>

                    <p className="text-sm text-gray-500">
                      Fecha de verificación
                    </p>

                    <p className="mt-1 font-medium text-gray-900">
                      {verification.verifiedAt.toLocaleString(
                        "es-MX"
                      )}
                    </p>

                  </div>
                )}

                {/* Responsable */}

                {verification.verifiedBy && (
                  <div>

                    <p className="text-sm text-gray-500">
                      Verificado por
                    </p>

                    <p className="mt-1 font-medium text-gray-900">
                      {verification.verifiedBy}
                    </p>

                  </div>
                )}

                {/* Notas */}

                <div className="md:col-span-2">

                  <p className="text-sm text-gray-500">
                    Notas de verificación
                  </p>

                  <div className="mt-2 rounded-xl bg-gray-50 p-4">

                    <p className="whitespace-pre-wrap text-sm text-gray-700">
                      {verification.notes ||
                        "No hay notas registradas."}
                    </p>

                  </div>

                </div>

              </div>
            ) : (
              <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-700">
                Este profesional no tiene un registro
                de verificación asociado.
              </div>
            )}

          </section>

          {/* ----------------------------------------
              ACCIONES
          ---------------------------------------- */}

          <VerificationChecks
            specialistId={professional.id}
            status={verificationStatus}
            identityVerified={
              professional.specialistverification?.identityVerified ?? false
            }
            licenseVerified={
              professional.specialistverification?.licenseVerified ?? false
            }
            specialtyVerified={
              professional.specialistverification?.specialtyVerified ?? false
            }
            documentsVerified={
              professional.specialistverification?.documentsVerified ?? false
            }
          />

          <section className="pt-8">

            <h2 className="text-xl font-semibold text-[#17365D]">
              Acciones administrativas
            </h2>

            <VerificationActions
              specialistId={professional.id}
              status={verificationStatus}
              identityVerified={
                professional.specialistverification?.identityVerified ?? false
              }
              licenseVerified={
                professional.specialistverification?.licenseVerified ?? false
              }
              specialtyVerified={
                professional.specialistverification?.specialtyVerified ?? false
              }
              documentsVerified={
                professional.specialistverification?.documentsVerified ?? false
              }
            />

          </section>

        </div>

      </div>

    </main>
  );
}