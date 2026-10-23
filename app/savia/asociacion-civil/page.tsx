import Link from "next/link";
import {
  Building2,
  HeartHandshake,
  Users,
  Target,
  ArrowRight,
} from "lucide-react";

export default function AsociacionCivilPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            Organización
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight text-[#203564] md:text-6xl">
            La Asociación Civil
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600 md:text-xl">
            Conoce la naturaleza institucional de SAVIA y el propósito social
            que orienta sus proyectos y actividades.
          </p>
        </div>
      </section>

      {/* Qué somos */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Building2 className="h-10 w-10 text-emerald-600" />

              <h2 className="mt-6 text-3xl font-bold text-[#203564] md:text-4xl">
                Una organización sin fines de lucro
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-600">
                SAVIA (Savia Agencia Integradora para la salud y el desarrollo A.C.)
                es una asociación civil sin fines de lucro orientada a
                impulsar acciones que contribuyan a la salud, el bienestar y
                el desarrollo humano.
              </p>

              <p className="mt-5 text-lg leading-8 text-gray-600">
                Su trabajo busca generar valor social mediante proyectos,
                alianzas, participación comunitaria, información y herramientas
                que permitan atender necesidades relacionadas con la salud y
                el desarrollo de las personas.
              </p>
            </div>

            <div className="rounded-3xl bg-[#203564] p-8 md:p-10">
              <HeartHandshake className="h-10 w-10 text-[#C7A76C]" />

              <h3 className="mt-6 text-2xl font-bold text-white">
                El propósito está en las personas
              </h3>

              <p className="mt-4 text-lg leading-8 text-white/80">
                SAVIA busca que la colaboración entre ciudadanía,
                profesionales, instituciones y organizaciones se convierta en
                soluciones que fortalezcan la salud y el bienestar colectivo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Objeto */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
              Objeto institucional
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#203564] md:text-4xl">
              Salud y desarrollo humano
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              El objeto de SAVIA se orienta a promover acciones, proyectos e
              iniciativas relacionadas con la salud, el bienestar y el
              desarrollo humano, favoreciendo la prevención, el acceso a
              información y servicios, la participación social y la
              colaboración entre distintos actores.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-7">
              <Target className="h-9 w-9 text-emerald-600" />

              <h3 className="mt-5 text-xl font-bold text-[#203564]">
                Salud
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Promover iniciativas que faciliten el acceso y fortalezcan la
                prevención y el bienestar.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-7">
              <Users className="h-9 w-9 text-emerald-600" />

              <h3 className="mt-5 text-xl font-bold text-[#203564]">
                Participación
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Impulsar la colaboración y participación de la comunidad.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-7">
              <HeartHandshake className="h-9 w-9 text-emerald-600" />

              <h3 className="mt-5 text-xl font-bold text-[#203564]">
                Desarrollo
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Contribuir a iniciativas que mejoren las condiciones y
                oportunidades de las personas y comunidades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Financiamiento */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            Financiamiento
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#203564] md:text-4xl">
            Recursos orientados al propósito social
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Como organización sin fines de lucro, los recursos de SAVIA deben
            estar orientados al cumplimiento de su objeto y al desarrollo de
            sus proyectos e iniciativas.
          </p>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            La información específica sobre fuentes de financiamiento,
            proyectos y aplicación de recursos formará parte de los mecanismos
            de transparencia de la organización.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#203564] py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            La confianza también se construye con transparencia
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-white/80">
            Conoce los principios mediante los cuales SAVIA busca rendir
            cuentas y mantener una relación responsable con su comunidad.
          </p>

          <Link
            href="/savia/transparencia"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 font-semibold text-[#203564] transition hover:scale-[1.02]"
          >
            Transparencia
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}