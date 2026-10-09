import Link from "next/link";
import {
  Stethoscope,
  FlaskConical,
  PawPrint,
  TriangleAlert,
  ArrowRight,
  HeartHandshake,
  Globe,
} from "lucide-react";

const huellitasSections = [
  {
    title: "Veterinarios y clínicas",
    description:
      "Encuentra veterinarios, consultorios y clínicas para el cuidado y atención de tu mascota.",
    icon: Stethoscope,
    href: "/areas_salud/veterinarios",
    action: "Buscar veterinario",
  },
  {
    title: "Laboratorios y diagnóstico",
    description:
      "Consulta laboratorios y servicios de análisis para apoyar el diagnóstico y cuidado de tu mascota.",
    icon: FlaskConical,
    href: "/areas_salud/laboratorios",
    action: "Buscar laboratorio",
  },
  {
    title: "Servicios para mascotas",
    description:
      "Encuentra estéticas, hospedaje, entrenamiento, cuidadores y otros servicios para el bienestar de tu mascota.",
    icon: PawPrint,
    href: "/areas_salud/servicios",
    action: "Ver servicios",
  },
  {
    title: "Atención veterinaria",
    description:
      "Encuentra opciones de atención veterinaria y servicios de atención urgente para tu mascota.",
    icon: TriangleAlert,
    href: "/areas_salud/atencion-veterinaria",
    action: "Buscar atención",
  },
];

export default function AreasSaludPage() {
  return (
    <main className="bg-white">

    {/* Hero */}
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/huellitas/banner-huellitas.jpeg')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#203564]/80 via-[#203564]/35 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-[#203564]/45 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
            <PawPrint className="h-4 w-4" />
            SAVIA Huellitas
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Cuidado y bienestar para nuestras huellitas
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white drop-shadow-sm md:text-lg">
            Un espacio para encontrar profesionales, establecimientos y
            servicios relacionados con el cuidado y bienestar de las
            mascotas en La Piedad y la región.
          </p>
        </div>
      </div>
    </section>

      {/* Categorías */}
      <section className="bg-[#f8faf9]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Encuentra lo que necesitas
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#203564] md:text-4xl">
              Servicios para nuestras mascotas
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Explora las diferentes opciones de atención, diagnóstico y
              servicios disponibles para el cuidado de tus mascotas.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {huellitasSections.map((section) => {
              const Icon = section.icon;

              return (
                <Link
                  key={section.title}
                  href={section.href}
                  className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-100">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-6 text-2xl font-semibold text-[#203564]">
                    {section.title}
                  </h3>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600">
                    {section.description}
                  </p>

                  <div className="mt-6 inline-flex items-center rounded-xl bg-[#203564] px-5 py-3 text-sm font-semibold text-white transition-colors group-hover:bg-[#16284d]">
                    {section.action}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Anunciantes */}
      <section className="border-y border-emerald-100 bg-emerald-50/70">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm md:p-10">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <HeartHandshake className="h-6 w-6" />
                </div>

                <h2 className="mt-6 text-2xl font-bold text-[#203564] md:text-3xl">
                  ¿Tienes un servicio para mascotas?
                </h2>

                <p className="mt-4 leading-7 text-gray-600">
                  También puedes formar parte de la comunidad SAVIA. Abrimos
                  este espacio para veterinarios, clínicas, laboratorios,
                  estéticas, cuidadores, hospedajes, entrenadores y otros
                  servicios para mascotas.
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  href="/contacto"
                  className="inline-flex items-center rounded-xl bg-[#203564] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#16284d]"
                >
                  Quiero formar parte de SAVIA Huellitas
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Puente hacia SAVIA */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center md:py-20">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
            <Globe className="h-7 w-7" />
          </div>

          <h2 className="mt-6 text-2xl font-bold text-[#203564] md:text-3xl">
            SAVIA es una red para nuestra comunidad
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
            Las mascotas también forman parte de nuestras familias. SAVIA
            Huellitas complementa nuestra red con espacios para encontrar
            servicios relacionados con su cuidado y bienestar.
          </p>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
            ¿Buscas atención para ti o tu familia? También puedes encontrar
            profesionales y servicios de salud en SAVIA.
          </p>

          <div className="mt-8">
            <Link
              href="/especialidades"
              className="inline-flex items-center rounded-xl bg-[#203564] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#16284d]"
            >
              Conocer los servicios de salud
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}