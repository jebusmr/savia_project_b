import Link from "next/link";
import {
  HeartHandshake,
  Users,
  ShieldCheck,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

export default function QuienesSomosPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
              SAVIA
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight text-[#203564] md:text-6xl">
              Una iniciativa para construir comunidades más saludables.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600 md:text-xl">
              SAVIA es una organización orientada a facilitar el acceso a la
              salud, fortalecer la prevención y promover el desarrollo humano
              mediante la colaboración, la información y la participación
              comunitaria.
            </p>
          </div>
        </div>
      </section>

      {/* Qué es SAVIA */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
                Qué es SAVIA
              </p>

              <h2 className="mt-3 text-3xl font-bold text-[#203564] md:text-4xl">
                Salud, bienestar y desarrollo humano
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-600">
                SAVIA (Agencia Integradora para la salud y el desarrollo A.C.)
                es una asociación civil sin fines de lucro que impulsa
                iniciativas orientadas a mejorar el bienestar de las personas
                y fortalecer el desarrollo de las comunidades.
              </p>

              <p className="mt-5 text-lg leading-8 text-gray-600">
                La plataforma digital de SAVIA es uno de sus proyectos
                estratégicos. Busca conectar a las personas con profesionales,
                instituciones y servicios de salud, facilitando el acceso a
                información y atención confiable.
              </p>
            </div>

            <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-8 md:p-10">
              <HeartHandshake className="h-10 w-10 text-emerald-600" />

              <h3 className="mt-6 text-2xl font-bold text-[#203564]">
                Una visión integral de la salud
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Para SAVIA, la salud no se limita a la atención de una
                enfermedad. También implica prevención, bienestar, información,
                participación y condiciones que permitan a las personas
                desarrollar una vida saludable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Historia */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
              Nuestra historia
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#203564] md:text-4xl">
              Una iniciativa que nace de la comunidad
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              SAVIA surge como una iniciativa ciudadana con el propósito de
              contribuir a mejorar la calidad de vida de las personas,
              fortalecer el acceso a información y servicios de salud y
              promover una cultura de prevención y participación.
            </p>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Desde esta perspectiva, SAVIA busca generar vínculos entre
              personas, profesionales, instituciones y comunidad para
              desarrollar soluciones que respondan a necesidades reales y
              contribuyan al bienestar colectivo.
            </p>
          </div>
        </div>
      </section>

      {/* Enfoque */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
              Nuestro enfoque
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#203564] md:text-4xl">
              Una plataforma al servicio de las personas
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
              <Users className="h-9 w-9 text-emerald-600" />

              <h3 className="mt-5 text-xl font-bold text-[#203564]">
                Comunidad
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Promovemos la participación y la colaboración para construir
                comunidades más informadas, saludables y solidarias.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
              <ShieldCheck className="h-9 w-9 text-emerald-600" />

              <h3 className="mt-5 text-xl font-bold text-[#203564]">
                Confianza
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Buscamos facilitar el acceso a información y servicios
                confiables, promoviendo vínculos responsables entre usuarios y
                profesionales.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
              <Lightbulb className="h-9 w-9 text-emerald-600" />

              <h3 className="mt-5 text-xl font-bold text-[#203564]">
                Innovación
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Utilizamos tecnología, información y nuevas formas de
                colaboración para desarrollar soluciones con impacto social.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#203564] py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Conoce la filosofía que guía a SAVIA
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-white/80">
            Nuestra misión, visión y valores orientan cada proyecto y cada
            iniciativa de la organización.
          </p>

          <div className="mt-8">
            <Link
              href="/savia/mision-vision"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 font-semibold text-[#203564] transition hover:scale-[1.02]"
            >
              Misión y visión
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}