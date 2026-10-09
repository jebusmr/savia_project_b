import Link from "next/link";
import { ArrowRight, FlaskConical, PawPrint } from "lucide-react";
import PetBusinessCard from "@/components/huellitas/PetBusinessCard";
import { huellitasBusinesses } from "@/data/huellitas";

const laboratoryBusinesses = huellitasBusinesses.filter(
  (business) => business.type === "laboratorio"
);

export default function LaboratoriosPage() {
  return (
    <main className="bg-white">
      {/* Encabezado */}
      <section className="bg-gradient-to-br from-[#203564] via-[#285276] to-[#2f6f62]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <Link
            href="/areas_salud"
            className="inline-flex items-center text-sm font-medium text-emerald-100 transition-colors hover:text-white"
          >
            ← SAVIA Huellitas
          </Link>

          <div className="mt-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-100">
              <PawPrint className="h-4 w-4" />
              SAVIA Huellitas
            </div>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Laboratorios y diagnóstico
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-blue-50 md:text-lg">
              Consulta laboratorios y servicios de análisis que pueden apoyar
              el diagnóstico y cuidado de tu mascota en La Piedad y la región.
            </p>
          </div>
        </div>
      </section>

      {/* Introducción */}
      <section className="mx-auto max-w-5xl px-6 py-14 md:py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Diagnóstico veterinario
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#203564] md:text-4xl">
            Opciones para apoyar el diagnóstico
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            En este espacio encontrarás información de laboratorios y
            establecimientos que ofrecen servicios relacionados con el
            diagnóstico veterinario. Consulta sus datos de contacto y conoce
            las opciones disponibles para el cuidado de tu mascota.
          </p>
        </div>
      </section>

      {/* Anuncios */}
      <section className="bg-[#f8faf9]">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Directorio
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#203564] md:text-3xl">
                Laboratorios y servicios de diagnóstico
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-gray-500 md:text-right">
              Conoce las opciones disponibles en SAVIA Huellitas.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {laboratoryBusinesses.map((business) => (
              <PetBusinessCard
                key={business.slug}
                name={business.name}
                address={business.address}
                phone={business.phone}
                website={business.website}
                image={business.image}
                whatsapp={business.whatsapp}
                email={business.email}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA para anunciantes */}
      <section className="border-t border-emerald-100 bg-emerald-50/70">
        <div className="mx-auto max-w-5xl px-6 py-14 text-center md:py-16">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
            <FlaskConical className="h-6 w-6" />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-[#203564] md:text-3xl">
            ¿Tienes un laboratorio o servicio de diagnóstico?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
            Forma parte de SAVIA Huellitas y permite que más personas conozcan
            tus servicios.
          </p>

          <Link
            href="/contacto"
            className="mt-7 inline-flex items-center rounded-xl bg-[#203564] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#16284d]"
          >
            Quiero formar parte de SAVIA Huellitas
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}