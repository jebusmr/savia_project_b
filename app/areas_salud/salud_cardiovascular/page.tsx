import Link from "next/link";
import {
  HeartPulse,
  Stethoscope,
  Activity,
  ShieldCheck,
  Clock,
  HeartHandshake,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

const cardiovascularConditions = [
  {
    title: "Hipertensión arterial",
    description:
      "La presión arterial elevada puede requerir seguimiento profesional y control periódico.",
    icon: Activity,
  },
  {
    title: "Arritmias cardíacas",
    description:
      "Alteraciones en el ritmo del corazón que pueden requerir valoración por un especialista.",
    icon: HeartPulse,
  },
  {
    title: "Colesterol y triglicéridos elevados",
    description:
      "Factores que pueden aumentar el riesgo cardiovascular y requieren atención preventiva.",
    icon: Activity,
  },
  {
    title: "Enfermedad cardiovascular",
    description:
      "Diversas condiciones que afectan al corazón y al sistema circulatorio.",
    icon: HeartPulse,
  },
];

const attentionReasons = [
  "Dolor o presión en el pecho",
  "Falta de aire sin causa aparente",
  "Palpitaciones o alteraciones del ritmo cardíaco",
  "Mareos o desmayos recurrentes",
  "Presión arterial elevada",
  "Antecedentes familiares de enfermedad cardiovascular",
];

const careTypes = [
  {
    title: "Evaluación cardiovascular",
    description:
      "Valoración del estado general del corazón y de los principales factores de riesgo.",
    icon: Stethoscope,
  },
  {
    title: "Seguimiento médico",
    description:
      "Acompañamiento profesional para el control y seguimiento de condiciones cardiovasculares.",
    icon: Clock,
  },
  {
    title: "Prevención",
    description:
      "Identificación de factores de riesgo y orientación para favorecer hábitos saludables.",
    icon: ShieldCheck,
  },
  {
    title: "Acompañamiento integral",
    description:
      "Atención orientada al bienestar cardiovascular y a la calidad de vida.",
    icon: HeartHandshake,
  },
];

export default function SaludCardiovascularPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section className="border-b bg-gradient-to-b from-slate-50 via-white to-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <nav
            aria-label="Navegación de ruta"
            className="mb-8 flex flex-wrap items-center gap-2 text-sm"
          >
            <Link
              href="/"
              className="text-slate-500 transition-colors hover:text-[#203564]"
            >
              Inicio
            </Link>

            <span className="text-slate-400">/</span>

            <Link
              href="/areas_salud"
              className="text-slate-500 transition-colors hover:text-[#203564]"
            >
              Áreas de Salud
            </Link>

            <span className="text-slate-400">/</span>

            <span className="font-semibold text-[#203564]">
              Salud cardiovascular
            </span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                <HeartPulse className="h-4 w-4" />
                Salud y bienestar
              </div>

              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-[#203564] md:text-5xl">
                Salud cardiovascular
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                El cuidado del corazón y del sistema circulatorio forma parte
                del bienestar integral. En SAVIA puedes conocer información
                sobre salud cardiovascular y encontrar profesionales que
                pueden acompañarte en la prevención, valoración y seguimiento.
              </p>
            </div>

            <div className="flex justify-start lg:justify-end">
              <div className="flex h-40 w-40 items-center justify-center rounded-3xl bg-[#203564] shadow-sm">
                <HeartPulse className="h-20 w-20 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCCIÓN */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            Conoce esta área de salud
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#203564]">
            Cuidar la salud cardiovascular también es prevenir
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            La salud cardiovascular está relacionada con el funcionamiento del
            corazón y los vasos sanguíneos. La prevención, la detección
            oportuna y el seguimiento profesional pueden contribuir a reducir
            riesgos y favorecer una mejor calidad de vida.
          </p>
        </div>
      </section>

      {/* PROFESIONALES */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Profesionales relacionados
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#203564]">
              ¿Qué profesional puede ayudarte?
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              La atención cardiovascular puede involucrar diferentes
              profesionales de la salud. Entre las especialidades directamente
              relacionadas se encuentra Cardiología.
            </p>
          </div>

          <div className="mt-8 max-w-md">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#203564]/10">
                <HeartPulse className="h-6 w-6 text-[#203564]" />
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#203564]">
                Cardiología
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Especialidad médica dedicada a la valoración, diagnóstico,
                tratamiento y seguimiento de las enfermedades del corazón y
                del sistema cardiovascular.
              </p>

              <Link
                href="/areas_salud/salud_cardiovascular/cardiologia"
                className="mt-5 inline-flex items-center gap-2 font-semibold text-emerald-700 transition hover:text-emerald-800"
              >
                Conocer Cardiología
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CUÁNDO BUSCAR ATENCIÓN */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Atención oportuna
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#203564]">
              ¿Cuándo buscar atención?
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Algunos síntomas o antecedentes pueden ser motivo para consultar
              con un profesional de salud. La valoración adecuada depende de
              cada persona y de su situación particular.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {attentionReasons.map((reason) => (
              <div
                key={reason}
                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4"
              >
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
                <span className="text-sm leading-6 text-slate-700">
                  {reason}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONDICIONES */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Información
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#203564]">
              Condiciones cardiovasculares frecuentes
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Conocer algunos de los problemas cardiovasculares más comunes
              puede ayudarte a identificar la importancia de la prevención y
              de una valoración profesional.
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cardiovascularConditions.map((condition) => {
              const Icon = condition.icon;

              return (
                <div
                  key={condition.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                    <Icon className="h-5 w-5 text-emerald-700" />
                  </div>

                  <h3 className="mt-5 font-bold text-[#203564]">
                    {condition.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {condition.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TIPOS DE ATENCIÓN */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            Atención
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#203564]">
            Tipos de atención
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            La atención cardiovascular puede tener diferentes objetivos según
            las necesidades de cada persona.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {careTypes.map((care) => {
            const Icon = care.icon;

            return (
              <div
                key={care.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#203564]/10">
                  <Icon className="h-5 w-5 text-[#203564]" />
                </div>

                <h3 className="mt-5 font-bold text-[#203564]">
                  {care.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {care.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#203564]">
        <div className="mx-auto max-w-7xl px-6 py-14 text-center">
          <h2 className="text-3xl font-bold text-white">
            Encuentra atención cardiovascular en SAVIA
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-200">
            Conoce a los profesionales de Cardiología que forman parte de la
            red SAVIA.
          </p>

          <Link
            href="/areas_salud/salud_cardiovascular/cardiologia"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[#203564] transition hover:bg-slate-100"
          >
            Conocer Cardiología
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}