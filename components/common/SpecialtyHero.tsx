import Link from "next/link";
import { ArrowRight, ShieldCheck, MapPin, Users } from "lucide-react";

interface SpecialtyHeroProps {
  area: string;
  areaHref: string;
  title: string;
  description: string;
  specialists?: number;
  verified?: number;
  location: string;
  image?: React.ReactNode;
}

export default function SpecialtyHero({
  area,
  areaHref,
  title,
  description,
  specialists,
  verified,
  location,
  image,
}: SpecialtyHeroProps) {
  return (
    <section className="border-b bg-gradient-to-b from-emerald-50 to-white">
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Breadcrumb */}
        <nav
          aria-label="Navegación de ruta"
          className="mb-6 flex flex-wrap items-center gap-1 text-sm"
        >
          <Link
            href="/"
            className="text-slate-500 transition-colors hover:text-emerald-700"
          >
            Inicio
          </Link>

          <span className="mx-1 text-slate-400">/</span>

          <Link
            href="/areas_salud"
            className="text-slate-500 transition-colors hover:text-emerald-700"
          >
            Áreas de Salud
          </Link>

          <span className="mx-1 text-slate-400">/</span>

          <Link
            href={areaHref ?? "/areas_salud"}
            className="text-slate-500 transition-colors hover:text-emerald-700"
          >
            {area}
          </Link>

          <span className="mx-1 text-slate-400">/</span>

          <span className="font-semibold text-[#203564]">{title}</span>
        </nav>

        <div className="grid items-center gap-14 lg:grid-cols-2">

          {/* Información */}
          <div>

            <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
              🌿 {area}
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-tight text-[#203564]">
              {title}
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              {description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <Link
                href="#especialistas"
                className="inline-flex items-center gap-2 rounded-xl bg-[#203564] px-6 py-3 font-semibold text-white transition hover:bg-[#18294f]"
              >
                Encontrar un especialista
                <ArrowRight size={18} />
              </Link>

              <Link
                href="#about"
                className="rounded-xl border border-[#C7A76C] px-6 py-3 font-semibold text-[#203564] transition hover:bg-[#C7A76C]/10"
              >
                ¿Qué es esta especialidad?
              </Link>

            </div>

            {/* Estadísticas */}
            <div
              className={`mt-10 grid gap-5 ${
                specialists !== undefined || verified !== undefined
                  ? "sm:grid-cols-3"
                  : "max-w-sm"
              }`}
            >

              {specialists !== undefined && (
                <div className="rounded-2xl border bg-white p-5 shadow-sm">
                  <Users className="mb-3 text-emerald-600" />

                  <h3 className="text-2xl font-bold text-[#203564]">
                    {specialists}
                  </h3>

                  <p className="text-sm text-slate-500">
                    Especialistas
                  </p>
                </div>
              )}

              {verified !== undefined && (
                <div className="rounded-2xl border bg-white p-5 shadow-sm">
                  <ShieldCheck className="mb-3 text-emerald-600" />

                  <h3 className="text-2xl font-bold text-[#203564]">
                    {verified}
                  </h3>

                  <p className="text-sm text-slate-500">
                    Verificados
                  </p>
                </div>
              )}

              <div className="rounded-2xl border bg-white p-5 shadow-sm">
                <MapPin className="mb-3 text-emerald-600" />

                <h3 className="text-lg font-bold text-[#203564]">
                  {location}
                </h3>

                <p className="text-sm text-slate-500">
                  Cobertura
                </p>
              </div>

            </div>

          </div>

          {/* Imagen */}
          <div className="flex justify-center">

            <div className="flex h-[430px] w-full max-w-md items-center justify-center rounded-3xl border bg-white shadow-xl">

              {image ? (
                image
              ) : (
                <div className="px-8 text-center">

                  <div className="mb-6 text-6xl">
                    🧠
                  </div>

                  <h3 className="text-2xl font-bold text-[#203564]">
                    Ilustración
                  </h3>

                  <p className="mt-3 text-slate-500">
                    Aquí mostraremos la ilustración oficial del área de salud.
                  </p>

                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}