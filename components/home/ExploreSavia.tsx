import Link from "next/link";
import {
  ArrowRight,
  HeartPulse,
  Map,
  Stethoscope,
  Users,
} from "lucide-react";

const sections = [
  {
    title: "Atención",
    description:
      "Encuentra profesionales, especialistas y servicios de salud disponibles en SAVIA.",
    icon: Stethoscope,
    href: "/servicios",
    action: "Explorar atención",
    available: true,
  },
  {
    title: "Salud",
    description:
      "Conoce nuestras áreas de salud y encuentra información para el cuidado y la prevención.",
    icon: HeartPulse,
    href: "/areas_salud",
    action: "Explorar salud",
    available: true,
  },
  {
    title: "Comunidad",
    description:
      "Participa en campañas, actividades e iniciativas que contribuyen a una comunidad más saludable.",
    icon: Users,
    href: "#",
    action: "Próximamente",
    available: false,
  },
  {
    title: "Salud y territorio",
    description:
      "Explora la relación entre la salud, los servicios disponibles y el territorio donde vivimos.",
    icon: Map,
    href: "#",
    action: "Próximamente",
    available: false,
  },
];

export default function ExploreSavia() {
  return (
    <section className="bg-white py-10 md:py-2">
      <div className="mx-auto max-w-7xl px-4 md:px-4">

        {/* Encabezado */}

        <div className="max-w-3xl">

          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            Conoce SAVIA
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#203564] md:text-4xl">
            Explora SAVIA
          </h2>

          <p className="mt-4 text-lg leading-7 text-gray-600">
            Encuentra servicios de salud, información,
            iniciativas comunitarias y herramientas para
            comprender mejor la salud de nuestra región.
          </p>

        </div>

        {/* Tarjetas */}

        <div className="mt-6 grid gap-6 md:grid-cols-2">

          {sections.map((section) => {

            const Icon = section.icon;

            return (
              <article
                key={section.title}
                className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50">
                  <Icon className="h-7 w-7 text-emerald-600" />
                </div>

                <h3 className="mt-3 text-2xl font-bold text-[#203564]">
                  {section.title}
                </h3>

                <p className="mt-3 min-h-[72px] leading-7 text-gray-600">
                  {section.description}
                </p>

                <div className="mt-4">

                  {section.available ? (

                    <Link
                      href={section.href}
                      className="inline-flex items-center gap-2 font-semibold text-[#203564] transition hover:text-emerald-600"
                    >
                      {section.action}

                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>

                  ) : (

                    <span className="inline-flex rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500">
                      {section.action}
                    </span>

                  )}

                </div>

              </article>
            );
          })}

        </div>

      </div>
    </section>
  );
}