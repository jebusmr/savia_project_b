import Link from "next/link";
import {
  Target,
  Eye,
  Heart,
  ShieldCheck,
  Users,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

export default function MisionVisionPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            Filosofía institucional
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight text-[#203564] md:text-6xl">
            Misión, visión y valores
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600 md:text-xl">
            Los principios que orientan el trabajo de SAVIA y la forma en que
            buscamos contribuir a la salud y al desarrollo de nuestras
            comunidades.
          </p>
        </div>
      </section>

      {/* Misión */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl bg-[#203564] p-8 md:p-10">
              <Target className="h-10 w-10 text-[#C7A76C]" />

              <h2 className="mt-6 text-3xl font-bold text-white">
                Nuestra misión
              </h2>

              <p className="mt-5 text-lg leading-8 text-white/85">
                Facilitar el acceso a la salud física, mental y social mediante
                proyectos innovadores, tecnología y acciones comunitarias que
                contribuyan al bienestar y desarrollo de las personas.
              </p>
            </div>

            {/* Visión */}
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-8 md:p-10">
              <Eye className="h-10 w-10 text-emerald-600" />

              <h2 className="mt-6 text-3xl font-bold text-[#203564]">
                Nuestra visión
              </h2>

              <p className="mt-5 text-lg leading-8 text-gray-600">
                Ser una organización referente en salud y desarrollo humano,
                reconocida por integrar personas, profesionales, instituciones,
                tecnología e información confiable para generar soluciones con
                impacto social.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
              Nuestros valores
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#203564] md:text-4xl">
              Principios que orientan nuestro trabajo
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Confianza",
                description:
                  "Construimos relaciones responsables y transparentes.",
                icon: ShieldCheck,
              },
              {
                title: "Comunidad",
                description:
                  "Promovemos la participación y colaboración.",
                icon: Users,
              },
              {
                title: "Bienestar",
                description:
                  "Ponemos a las personas y su calidad de vida en el centro.",
                icon: Heart,
              },
              {
                title: "Innovación",
                description:
                  "Buscamos nuevas formas de generar soluciones con impacto.",
                icon: Lightbulb,
              },
            ].map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm"
                >
                  <Icon className="h-9 w-9 text-emerald-600" />

                  <h3 className="mt-5 text-xl font-bold text-[#203564]">
                    {value.title}
                  </h3>

                  <p className="mt-3 leading-7 text-gray-600">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-[#203564] md:text-4xl">
            Conoce nuestra organización
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-gray-600">
            SAVIA es una asociación civil sin fines de lucro orientada a la
            salud, el bienestar y el desarrollo humano.
          </p>

          <Link
            href="/savia/asociacion-civil"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#203564] px-7 py-3 font-semibold text-white transition hover:bg-[#16294f]"
          >
            La Asociación Civil
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}