import Link from "next/link";
import {
  Brain,
  Apple,
  Stethoscope,
  Activity,
  Baby,
  Smile,
  ArrowRight,
} from "lucide-react";

const specialties = [
  {
    name: "Psicología",
    description: "Atención emocional y bienestar mental.",
    icon: Brain,
  },
  {
    name: "Nutrición",
    description: "Orientación alimentaria y hábitos saludables.",
    icon: Apple,
  },
  {
    name: "Medicina General",
    description: "Atención médica integral y preventiva.",
    icon: Stethoscope,
  },
  {
    name: "Fisioterapia",
    description: "Rehabilitación física y recuperación funcional.",
    icon: Activity,
  },
  {
    name: "Pediatría",
    description: "Cuidado de la salud infantil.",
    icon: Baby,
  },
  {
    name: "Odontología",
    description: "Prevención y cuidado de la salud dental.",
    icon: Smile,
  },
];

export default function Specialties() {
  return (
    <section className="bg-white py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-6">

        {/* Encabezado */}

        <div className="max-w-3xl">

          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            Atención SAVIA
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[var(--color-text)] md:text-4xl">
            Especialidades de salud
          </h2>

          <p className="mt-3 text-lg text-[var(--color-text-light)]">
            Explora las áreas de atención disponibles en SAVIA.
          </p>

        </div>

        {/* Especialidades */}

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {specialties.map((specialty) => {
            const Icon = specialty.icon;

            return (
              <div
                key={specialty.name}
                className="group rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)] hover:shadow-md"
              >

                {/* Icono */}

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary-light)]">
                  <Icon
                    size={26}
                    className="text-[var(--color-primary)]"
                  />
                </div>

                {/* Nombre */}

                <h3 className="mt-4 text-xl font-semibold text-[var(--color-text)]">
                  {specialty.name}
                </h3>

                {/* Descripción */}

                <p className="mt-2 text-sm leading-6 text-[var(--color-text-light)]">
                  {specialty.description}
                </p>

              </div>
            );
          })}

        </div>

        {/* Botón general */}

        <div className="mt-8 flex justify-center">

          <Link
            href="/especialidades"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-3 font-semibold text-white transition hover:bg-[var(--color-primary-dark)]"
          >
            Ver todas las especialidades

            <ArrowRight size={19} />
          </Link>

        </div>

      </div>
    </section>
  );
}