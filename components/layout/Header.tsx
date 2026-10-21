import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* LOGO */}
        <Link
          href="/"
          className="flex shrink-0 items-center"
        >
          <Image
            src="/images/logo_sf.png"
            alt="SAVIA"
            width={90}
            height={30}
            priority
          />
        </Link>

        {/* NAVEGACIÓN PRINCIPAL */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-[var(--color-text)] xl:flex">

          {/* INICIO */}
          <Link
            href="/"
            className="transition hover:text-[var(--color-secondary)]"
          >
            Inicio
          </Link>

          {/* ATENCIÓN */}
          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1 transition hover:text-[var(--color-secondary)]"
            >
              Atención
              <ChevronDown className="h-4 w-4 transition group-hover:rotate-180" />
            </button>

            <div className="invisible absolute left-0 top-full z-50 mt-4 w-64 translate-y-2 rounded-2xl border border-[var(--color-border)] bg-white p-3 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">

              <Link
                href="/especialidades"
                className="block rounded-xl px-4 py-3 transition hover:bg-emerald-50"
              >
                <p className="font-semibold">
                  Especialidades
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Explora las diferentes especialidades.
                </p>
              </Link>

              <Link
                href="/servicios"
                className="block rounded-xl px-4 py-3 transition hover:bg-emerald-50"
              >
                <p className="font-semibold">
                  Servicios
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Conoce los servicios disponibles.
                </p>
              </Link>

            </div>
          </div>

        {/* SAVIA HUELLITAS */}
        <div className="group relative">
          <button
            type="button"
            className="flex items-center gap-1 transition hover:text-[var(--color-secondary)]"
          >
            Savia Huellitas
            <ChevronDown className="h-4 w-4 transition group-hover:rotate-180" />
          </button>

          <div className="invisible absolute left-0 top-full z-50 mt-4 w-72 translate-y-2 rounded-2xl border border-[var(--color-border)] bg-white p-3 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
            <Link
              href="/areas_salud/atencion-veterinaria"
              className="block rounded-xl px-4 py-3 transition hover:bg-emerald-50"
            >
              <p className="font-semibold">
                Servicios para mascotas
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Encuentra servicios veterinarios y opciones para el cuidado de tus mascotas.
              </p>
            </Link>

            <Link
              href="/areas_salud/veterinarios"
              className="block rounded-xl px-4 py-3 transition hover:bg-emerald-50"
            >
              <p className="font-semibold">Veterinarios</p>
              <p className="mt-1 text-xs text-gray-500">
                Encuentra profesionales para el cuidado de tus mascotas.
              </p>
            </Link>

            <Link
              href="/areas_salud/laboratorios"
              className="block rounded-xl px-4 py-3 transition hover:bg-emerald-50"
            >
              <p className="font-semibold">Laboratorios y estudios</p>
              <p className="mt-1 text-xs text-gray-500">
                Consulta opciones de diagnóstico veterinario.
              </p>
            </Link>

            <Link
              href="/areas_salud/servicios"
              className="block rounded-xl px-4 py-3 transition hover:bg-emerald-50"
            >
              <p className="font-semibold">Servicios para mascotas</p>
              <p className="mt-1 text-xs text-gray-500">
                Explora servicios y opciones de atención.
              </p>
            </Link>
          </div>
        </div>


          {/* COMUNIDAD */}
          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1 transition hover:text-[var(--color-secondary)]"
            >
              Comunidad
              <ChevronDown className="h-4 w-4 transition group-hover:rotate-180" />
            </button>

            <div className="invisible absolute left-0 top-full z-50 mt-4 w-64 translate-y-2 rounded-2xl border border-[var(--color-border)] bg-white p-3 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">

              <Link
                href="/comunidad/campanas"
                className="block rounded-xl px-4 py-3 hover:bg-emerald-50"
              >
                Campañas
              </Link>

              <Link
                href="/comunidad/actividades"
                className="block rounded-xl px-4 py-3 hover:bg-emerald-50"
              >
                Actividades
              </Link>

              <Link
                href="/comunidad/participacion"
                className="block rounded-xl px-4 py-3 hover:bg-emerald-50"
              >
                Participación
              </Link>

            </div>
          </div>

          {/* SALUD Y TERRITORIO */}
          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1 transition hover:text-[var(--color-secondary)]"
            >
              Salud y territorio
              <ChevronDown className="h-4 w-4 transition group-hover:rotate-180" />
            </button>

            <div className="invisible absolute left-0 top-full z-50 mt-4 w-72 translate-y-2 rounded-2xl border border-[var(--color-border)] bg-white p-3 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">

              <Link
                href="/salud-territorio/mapa"
                className="block rounded-xl px-4 py-3 hover:bg-emerald-50"
              >
                Mapa de servicios
              </Link>

              <Link
                href="/salud-territorio/acceso"
                className="block rounded-xl px-4 py-3 hover:bg-emerald-50"
              >
                Acceso a la salud
              </Link>

              <Link
                href="/salud-territorio/servicios-cercanos"
                className="block rounded-xl px-4 py-3 hover:bg-emerald-50"
              >
                Servicios cercanos
              </Link>

              <Link
                href="/salud-territorio/indicadores"
                className="block rounded-xl px-4 py-3 hover:bg-emerald-50"
              >
                Indicadores
              </Link>

            </div>
          </div>

          {/* SAVIA */}
          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1 transition hover:text-[var(--color-secondary)]"
            >
              SAVIA
              <ChevronDown className="h-4 w-4 transition group-hover:rotate-180" />
            </button>

            <div className="invisible absolute right-0 top-full z-50 mt-4 w-64 translate-y-2 rounded-2xl border border-[var(--color-border)] bg-white p-3 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">

              <Link
                href="/savia/quienes-somos"
                className="block rounded-xl px-4 py-3 hover:bg-emerald-50"
              >
                Quiénes somos
              </Link>

              <Link
                href="/savia/mision-vision"
                className="block rounded-xl px-4 py-3 hover:bg-emerald-50"
              >
                Misión y visión
              </Link>

              <Link
                href="/savia/asociacion-civil"
                className="block rounded-xl px-4 py-3 hover:bg-emerald-50"
              >
                La Asociación Civil
              </Link>

              <Link
                href="/savia/transparencia"
                className="block rounded-xl px-4 py-3 hover:bg-emerald-50"
              >
                Transparencia
              </Link>

              <Link
                href="/contacto"
                className="block rounded-xl px-4 py-3 hover:bg-emerald-50"
              >
                Contacto
              </Link>

            </div>
          </div>

        </nav>

        {/* MI CUENTA */}
        <Link
          href="/mi-cuenta"
          className="rounded-xl bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-dark)]"
        >
          Mi cuenta
        </Link>

      </div>
    </header>
  );
}