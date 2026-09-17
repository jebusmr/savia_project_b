import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SpecialtyCTAProps {
  specialty?: string;
  specialtySlug?: string;
  title?: string;
  description?: string;
}

export default function SpecialtyCTA({
  specialty = "Psicología",
  specialtySlug = "psicologia",
  title = "¿Listo para encontrar al profesional adecuado?",
  description = "En SAVIA reunimos especialistas verificados para ayudarte a tomar decisiones informadas sobre tu salud y bienestar. Encuentra al profesional ideal y da el siguiente paso con confianza.",
}: SpecialtyCTAProps) {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-3xl border border-emerald-100 bg-emerald-50 px-8 pt-16 pb-8 text-center shadow-sm md:px-16">
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-700">
            SAVIA · Especialistas verificados
          </span>

          <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
            {title}
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {description}
          </p>

          <div className="mt-8">
            <Link
              href={`/especialistas?specialty=${encodeURIComponent(
                specialtySlug
              )}`}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-emerald-700 hover:shadow-lg"
            >
              Ver especialistas en {specialty}
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}