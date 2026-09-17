import {
  Monitor,
  Languages,
  Clock3,
  Target,
  Stethoscope,
  BriefcaseBusiness,
} from "lucide-react";

import InfoCard from "@/components/ui/InfoCard";
import { Specialist } from "@/types/specialist";

interface PracticalInfoProps {
  specialist: Specialist;
}

export default function PracticalInfo({
  specialist,
}: PracticalInfoProps) {
  return (
    <section className="bg-gray-50 py-12">
      <div className="mx-auto max-w-5xl px-4">

        {/* Título */}

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#203564] md:text-3xl">
            Información práctica
          </h2>

          <p className="mt-2 max-w-3xl text-gray-600">
            Información útil sobre las modalidades de atención,
            idiomas, horarios, servicios y principales áreas de consulta.
          </p>
        </div>

        {/* Información general */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* Modalidades */}

          <InfoCard
            icon={<Monitor className="h-6 w-6" />}
            title="Modalidades"
          >
            <div className="flex flex-wrap gap-2">
              {specialist.consultation.modalities.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </InfoCard>

          {/* Idiomas */}

          <InfoCard
            icon={<Languages className="h-6 w-6" />}
            title="Idiomas"
          >
            <div className="flex flex-wrap gap-2">
              {specialist.consultation.languages.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </InfoCard>

          {/* Experiencia profesional */}

          {specialist.yearsExperience !== null && (
            <InfoCard
              icon={<BriefcaseBusiness className="h-6 w-6" />}
              title="Experiencia profesional"
            >
              <p className="text-2xl font-bold text-[#203564]">
                {specialist.yearsExperience}{" "}
                {specialist.yearsExperience === 1
                  ? "año"
                  : "años"}
              </p>

              <p className="mt-1 text-sm text-gray-600">
                de experiencia profesional
              </p>
            </InfoCard>
          )}

          {/* Horarios */}

          <InfoCard
            icon={<Clock3 className="h-6 w-6" />}
            title="Horarios de atención"
          >
            <div className="space-y-2">
              {specialist.consultation.schedules.map((item) => (
                <p
                  key={item}
                  className="text-gray-700"
                >
                  {item}
                </p>
              ))}
            </div>
          </InfoCard>

          {/* Áreas */}

          {specialist.consultation.attentionAreas.length > 0 && (
            <InfoCard
              icon={<Target className="h-6 w-6" />}
              title="Áreas de atención"
            >
              <div className="flex flex-wrap gap-2">
                {specialist.consultation.attentionAreas.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </InfoCard>
          )}

        </div>

        {/* Servicios */}

        {specialist.services.length > 0 && (
          <div className="mt-6">
            <InfoCard
              icon={<Stethoscope className="h-6 w-6" />}
              title="Servicios"
            >
              <div className="space-y-4">
                {specialist.services.map((service) => (
                  <div
                    key={service.name}
                    className="rounded-xl border border-gray-200 bg-white p-4"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                      <div>
                        <h3 className="font-semibold text-[#203564]">
                          {service.name}
                        </h3>

                        {service.description && (
                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            {service.description}
                          </p>
                        )}
                      </div>

                      <div className="shrink-0 text-left sm:text-right">
                        {service.price && (
                          <p className="text-lg font-bold text-emerald-700">
                            ${service.price} MXN
                          </p>
                        )}

                        {service.durationMinutes && (
                          <p className="mt-1 text-sm text-gray-500">
                            {service.durationMinutes} minutos
                          </p>
                        )}
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </InfoCard>
          </div>
        )}

      </div>
    </section>
  );
}