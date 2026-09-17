import Link from "next/link";
import {
  ShieldCheck,
  FileText,
  Eye,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";

export default function TransparenciaPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            SAVIA
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight text-[#203564] md:text-6xl">
            Transparencia y rendición de cuentas
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600 md:text-xl">
            La confianza de nuestra comunidad requiere información clara,
            responsabilidad y apertura sobre el trabajo de SAVIA.
          </p>
        </div>
      </section>

      {/* Compromiso */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <ShieldCheck className="h-10 w-10 text-emerald-600" />

              <h2 className="mt-6 text-3xl font-bold text-[#203564] md:text-4xl">
                Nuestro compromiso
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-600">
                SAVIA busca desarrollar una cultura institucional basada en la
                transparencia, la responsabilidad y el uso adecuado de los
                recursos destinados a sus proyectos.
              </p>

              <p className="mt-5 text-lg leading-8 text-gray-600">
                La transparencia no debe entenderse únicamente como la
                publicación de documentos, sino como una forma permanente de
                relacionarnos con las personas, instituciones y comunidades con
                las que trabajamos.
              </p>
            </div>

            <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-8 md:p-10">
              <Eye className="h-10 w-10 text-emerald-600" />

              <h3 className="mt-6 text-2xl font-bold text-[#203564]">
                Información clara y accesible
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Conforme SAVIA avance en sus actividades, esta sección
                concentrará la información institucional y los documentos que
                permitan conocer mejor el trabajo de la organización.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principios */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
              Principios
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#203564] md:text-4xl">
              Una organización abierta y responsable
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
              <FileText className="h-9 w-9 text-emerald-600" />

              <h3 className="mt-5 text-xl font-bold text-[#203564]">
                Información institucional
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Facilitaremos información sobre la organización, sus objetivos,
                proyectos y actividades.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
              <ShieldCheck className="h-9 w-9 text-emerald-600" />

              <h3 className="mt-5 text-xl font-bold text-[#203564]">
                Responsabilidad
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Los recursos y esfuerzos de SAVIA deben estar orientados al
                cumplimiento de su propósito social.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
              <HeartHandshake className="h-9 w-9 text-emerald-600" />

              <h3 className="mt-5 text-xl font-bold text-[#203564]">
                Confianza
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Buscamos construir relaciones duraderas basadas en la apertura,
                el respeto y la responsabilidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Documentos */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            Documentación
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#203564] md:text-4xl">
            Información pública de SAVIA
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Esta sección se irá enriqueciendo conforme la organización
            formalice y publique sus documentos institucionales, informes y
            mecanismos de rendición de cuentas.
          </p>

          <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8">
            <FileText className="mx-auto h-10 w-10 text-gray-400" />

            <p className="mt-4 font-medium text-gray-600">
              Próximamente encontrarás aquí documentación institucional de
              SAVIA.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#203564] py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Conoce más sobre SAVIA
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-white/80">
            Nuestra organización trabaja para facilitar el acceso a la salud y
            contribuir al desarrollo humano.
          </p>

          <Link
            href="/savia/quienes-somos"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 font-semibold text-[#203564] transition hover:scale-[1.02]"
          >
            Quiénes somos
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}