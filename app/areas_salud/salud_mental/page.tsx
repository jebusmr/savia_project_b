import Link from "next/link";
import { Brain, HeartHandshake, Stethoscope } from "lucide-react";

const specialties = [
  {
    title: "Psicología",
    description:
      "Acompañamiento profesional para el bienestar emocional, psicológico y conductual.",
    icon: Brain,
    href: "/areas_salud/salud_mental/psicologia",
  },
  {
    title: "Psiquiatría",
    description:
      "Atención médica especializada para la evaluación y tratamiento de diferentes condiciones de salud mental.",
    icon: Stethoscope,
    href: "/especialistas?specialty=psiquiatria",
  },
];

const topics = [
  "Bienestar emocional",
  "Ansiedad y estrés",
  "Estado de ánimo",
  "Salud mental en diferentes etapas de la vida",
  "Prevención y autocuidado",
  "Acompañamiento profesional",
];

export default function SaludMentalPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#203564] via-[#27467c] to-[#2f6f62]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-emerald-200">
              <Brain className="h-7 w-7" />
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">
              Área de salud
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Salud mental
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-blue-50 md:text-lg">
              La salud mental forma parte del bienestar integral de las
              personas. Explora información y encuentra profesionales que
              pueden acompañarte de acuerdo con tus necesidades.
            </p>
          </div>
        </div>
      </section>

      {/* Introducción */}
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-emerald-700">
              Bienestar integral
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#203564] md:text-4xl">
              Cuidar la salud mental también es cuidar la salud
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              La salud mental está relacionada con la manera en que las
              personas piensan, sienten, se relacionan y enfrentan las
              diferentes situaciones de la vida.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Buscar orientación profesional puede ser parte del cuidado
              preventivo y del acompañamiento necesario en distintos momentos
              y circunstancias.
            </p>
          </div>

          <div className="rounded-3xl bg-emerald-50 p-8">
            <HeartHandshake className="h-10 w-10 text-emerald-700" />

            <h3 className="mt-5 text-xl font-semibold text-[#203564]">
              Un enfoque de acompañamiento
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              SAVIA busca acercar a las personas con profesionales y recursos
              que contribuyan al cuidado de su bienestar.
            </p>
          </div>
        </div>
      </section>

      {/* Especialidades */}
      <section className="border-y border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-emerald-700">
              Atención profesional
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#203564] md:text-4xl">
              Encuentra el tipo de atención que necesitas
            </h2>

            <p className="mt-4 text-gray-600">
              Explora las especialidades relacionadas con la salud mental.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            {specialties.map((specialty) => {
              const Icon = specialty.icon;

              return (
                <Link
                  key={specialty.title}
                  href={specialty.href}
                  className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-[#203564]">
                    {specialty.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {specialty.description}
                  </p>

                  <span className="mt-6 inline-flex items-center text-sm font-semibold text-emerald-700">
                    Explorar
                    <span className="ml-2 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Temas */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-[#203564] md:text-4xl">
            Temas relacionados con la salud mental
          </h2>

          <p className="mt-4 text-gray-600">
            Algunos de los temas que SAVIA puede abordar dentro de esta área.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <div
              key={topic}
              className="rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm"
            >
              <p className="text-sm font-medium text-gray-700">{topic}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#203564]">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            ¿Buscas atención profesional?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100">
            Explora los profesionales disponibles en SAVIA y encuentra la
            atención que necesitas.
          </p>

          <div className="mt-8">
            <Link
              href="/especialistas"
              className="inline-flex items-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#203564] transition-colors hover:bg-gray-100"
            >
              Explorar especialistas
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}