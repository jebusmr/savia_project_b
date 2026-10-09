import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  PawPrint,
  TriangleAlert,
} from "lucide-react";
import PetBusinessCard from "@/components/huellitas/PetBusinessCard";
import { huellitasBusinesses } from "@/data/huellitas";

const veterinaryAttention = huellitasBusinesses.filter(
  (business) => business.type === "atencion"
);

export default function AtencionVeterinariaPage() {
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
              Atención veterinaria
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-blue-50 md:text-lg">
              Encuentra opciones de atención veterinaria para el cuidado de tu
              mascota en La Piedad y la región.
            </p>
          </div>
        </div>
      </section>

      {/* Información */}
      <section className="mx-auto max-w-5xl px-6 py-14 md:py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Atención oportuna
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#203564] md:text-4xl">
            Opciones de atención para tu mascota
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            En este espacio encontrarás información de establecimientos y
            profesionales que ofrecen atención veterinaria. Consulta sus
            datos de contacto para conocer las opciones disponibles y
            determinar cuál puede ser adecuada para las necesidades de tu
            mascota.
          </p>
        </div>
      </section>

      {/* Consideraciones */}
      <section className="border-y border-amber-100 bg-amber-50/60">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-amber-700 shadow-sm">
              <TriangleAlert className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-semibold text-[#203564]">
                Ante una situación urgente
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Si tu mascota presenta una situación que requiere atención
                inmediata, comunícate directamente con un establecimiento
                veterinario para confirmar su disponibilidad y las opciones
                de atención.
              </p>
            </div>
          </div>
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
                Opciones de atención veterinaria
              </h2>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock3 className="h-4 w-4" />
              Confirma horarios y disponibilidad
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {veterinaryAttention.map((business) => (
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
          <h2 className="text-2xl font-bold text-[#203564] md:text-3xl">
            ¿Ofreces atención veterinaria?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
            Forma parte de SAVIA Huellitas y permite que más personas conozcan
            tus servicios de atención veterinaria.
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