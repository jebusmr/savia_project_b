import Link from "next/link";
import {
  ArrowRight,
  Building2,
  FlaskConical,
  HeartPulse,
  Pill,
  Stethoscope,
} from "lucide-react";

const serviceCategories = [
  {
    title: "Profesionales de la salud",
    description:
      "Encuentra médicos, especialistas y otros profesionales de la salud verificados que forman parte de SAVIA.",
    icon: Stethoscope,
    href: "/especialidades",
    action: "Ver especialistas",
    available: true,
  },
  {
    title: "Laboratorios y estudios",
    description:
      "Encuentra laboratorios y servicios de diagnóstico para realizar análisis y estudios de salud.",
    icon: FlaskConical,
    href: "#",
    action: "Próximamente",
    available: false,
  },
  {
    title: "Farmacias",
    description:
      "Localiza farmacias y conoce los servicios relacionados con el cuidado y atención de la salud.",
    icon: Pill,
    href: "#",
    action: "Próximamente",
    available: false,
  },
  {
    title: "Hospitales y clínicas",
    description:
      "Conoce hospitales, clínicas y otras instituciones que forman parte de la red de atención de SAVIA.",
    icon: Building2,
    href: "#",
    action: "Próximamente",
    available: false,
  },
];

export default function ServiciosPage() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Encabezado */}

      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">

          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            Atención SAVIA
          </p>

          <h1 className="mt-3 text-4xl font-bold text-[#203564] md:text-5xl">
            Encuentra el servicio de salud que necesitas
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            SAVIA conecta a las personas con profesionales,
            instituciones y servicios de salud para facilitar
            el acceso a una atención confiable y cercana.
          </p>

        </div>
      </section>

      {/* Categorías */}

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">

        <div className="grid gap-7 md:grid-cols-2">

          {serviceCategories.map((category) => {

            const Icon = category.icon;

            return (
              <article
                key={category.title}
                className="flex flex-col rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >

                {/* Icono */}

                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50">
                  <Icon className="h-7 w-7 text-emerald-600" />
                </div>

                {/* Contenido */}

                <h2 className="mt-6 text-2xl font-bold text-[#203564]">
                  {category.title}
                </h2>

                <p className="mt-3 flex-1 leading-7 text-gray-600">
                  {category.description}
                </p>

                {/* Acción */}

                <div className="mt-7">

                  {category.available ? (

                    <Link
                      href={category.href}
                      className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-3 font-semibold text-white transition hover:bg-[var(--color-primary-dark)]"
                    >
                      {category.action}

                      <ArrowRight className="h-5 w-5" />
                    </Link>

                  ) : (

                    <span className="inline-flex items-center rounded-xl bg-gray-100 px-5 py-3 text-sm font-medium text-gray-500">
                      {category.action}
                    </span>

                  )}

                </div>

              </article>
            );
          })}

        </div>

      </section>

      {/* Mensaje institucional */}

      <section className="border-t border-emerald-100 bg-emerald-50">

        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">

          <div className="max-w-3xl">

            <div className="flex items-center gap-3">

              <HeartPulse className="h-7 w-7 text-emerald-600" />

              <h2 className="text-2xl font-bold text-[#203564]">
                Una red de salud para nuestra comunidad
              </h2>

            </div>

            <p className="mt-4 leading-7 text-gray-700">
              SAVIA busca integrar progresivamente a los
              distintos actores y servicios relacionados con
              la salud en La Piedad y la región, facilitando
              el encuentro entre las personas y las opciones
              de atención disponibles.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}