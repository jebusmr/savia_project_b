import {
  ShieldCheck,
  Users,
  Leaf,
  Handshake,
  Lightbulb,
} from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Confianza",
    description:
      "Verificamos la identidad y documentación de los profesionales que forman parte de SAVIA.",
  },
  {
    icon: Users,
    title: "Comunidad",
    description:
      "Conectamos personas, profesionales e instituciones para fortalecer nuestra comunidad.",
  },
  {
    icon: Leaf,
    title: "Prevención",
    description:
      "Impulsamos acciones que promueven el cuidado de la salud y la prevención.",
  },
  {
    icon: Handshake,
    title: "Impacto social",
    description:
      "Como Asociación Civil, buscamos generar beneficios para nuestra comunidad.",
  },
  {
    icon: Lightbulb,
    title: "Innovación",
    description:
      "Utilizamos tecnología para acercar servicios y desarrollar nuevas soluciones.",
  },
];

export default function WhyChooseSavia() {
  return (
    <section className="bg-[var(--color-background)] py-6 md:py-10">

      <div className="mx-auto max-w-7xl px-6">

        {/* Encabezado */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="text-sm font-semibold uppercase tracking-wide text-[var(--color-primary)]">
            Nuestra esencia
          </span>

          <h2 className="mt-2 text-3xl font-bold text-[var(--color-text)] md:text-4xl">
            ¿Por qué confiar en SAVIA?
          </h2>

          <p className="mt-4 text-lg leading-7 text-[var(--color-text-light)]">
            Trabajamos para facilitar el acceso a la salud con confianza,
            cercanía y compromiso social.
          </p>

        </div>

        {/* Valores */}

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {values.map((value) => {

            const Icon = value.icon;

            return (
              <div
                key={value.title}
                className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >

                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--color-primary-light)]">

                  <Icon
                    size={25}
                    className="text-[var(--color-primary)]"
                  />

                </div>

                <h3 className="mt-2 text-xl font-bold text-[var(--color-text)]">
                  {value.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[var(--color-text-light)]">
                  {value.description}
                </p>

              </div>
            );

          })}

        </div>

      </div>

    </section>
  );
}