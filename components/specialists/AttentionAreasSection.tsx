import {
  HeartPulse,
  CheckCircle2,
} from "lucide-react";

import type { Specialist } from "@/types/specialist";

interface AttentionAreasSectionProps {
  specialist: Specialist;
}

export default function AttentionAreasSection({
  specialist,
}: AttentionAreasSectionProps) {
  const attentionAreas =
    specialist.consultation.attentionAreas;

  if (attentionAreas.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-8 md:px-6">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">

        {/* Encabezado */}

        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <HeartPulse size={24} />
          </div>

          <div>
            <p className="text-sm font-semibold text-emerald-600">
              ÁREAS DE ATENCIÓN
            </p>

            <h2 className="mt-1 text-2xl font-bold text-[#203564]">
              ¿En qué puede ayudarte?
            </h2>

            <p className="mt-2 text-gray-600">
              Estas son algunas de las áreas y problemas de salud
              que este profesional atiende.
            </p>
          </div>
        </div>

        {/* Áreas */}

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {attentionAreas.map((area) => (
            <div
              key={area}
              className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 transition hover:border-emerald-200 hover:bg-emerald-50"
            >
              <CheckCircle2
                size={20}
                className="shrink-0 text-emerald-600"
              />

              <span className="font-medium text-gray-700">
                {area}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}