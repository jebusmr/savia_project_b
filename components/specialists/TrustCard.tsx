import { BadgeCheck, CheckCircle2, ShieldCheck } from "lucide-react";
import { Specialist } from "@/types/specialist";

interface TrustCardProps {
  specialist: Specialist;
}

export default function TrustCard({
  specialist,
}: TrustCardProps) {
  const checks = [
    {
      label: "Identidad validada",
      value: specialist.verification.checks.identityVerified,
    },
    {
      label: "Cédula profesional verificada",
      value: specialist.verification.checks.professionalLicenseVerified,
    },
    {
      label: "Especialidad comprobada",
      value: specialist.verification.checks.specialtyVerified,
    },
    {
      label: "Documentación revisada",
      value: specialist.verification.checks.documentationReviewed,
    },
    {
      label: "Perfil actualizado recientemente",
      value: specialist.verification.checks.profileUpdated,
    },
  ];

    const formattedDate = specialist.verification.lastVerified
      ? new Date(
      specialist.verification.lastVerified
      ).toLocaleDateString("es-MX", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    : "Pendiente de validación";

  return (
    <section className="bg-gray-50 py-12">
      <div className="mx-auto max-w-5xl px-4">

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

          {/* Encabezado */}

          <div className="flex items-start gap-5">

            <div className="rounded-full bg-emerald-100 p-4">
              <ShieldCheck className="h-7 w-7 text-emerald-700" />
            </div>

            <div>

              <h2 className="text-2xl md:text-3xl font-bold text-[#203564]">
                Confianza SAVIA
              </h2>

              <p className="mt-2 max-w-3xl leading-7 text-gray-600">
                La información mostrada en este perfil ha sido revisada
                conforme a los criterios de validación de SAVIA para
                brindar mayor transparencia y confianza a los usuarios.
              </p>

            </div>

          </div>

          {/* Lista */}

 <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">

  {checks
    .filter((item) => item.value)
    .map((item) => (
      <div
        key={item.label}
        className="flex items-center gap-3"
      >
        <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-600" />

        <span className="text-gray-700">
          {item.label}
        </span>

      </div>
    ))}

</div>

          {/* Información */}

          <div className="mt-8 border-t border-gray-200 pt-5">

            <div className="grid gap-6 md:grid-cols-2">

              <div>

                <p className="text-sm uppercase tracking-wide text-stone-500">
                  Cédula profesional
                </p>

                <p className="mt-1 font-semibold text-[#203564]">
                  {specialist.verification.professionalLicense}
                </p>

              </div>

              <div>

                <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">
                  Última validación
                </p>

                <p className="mt-1 font-semibold text-[#203564]">
                  {formattedDate}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}