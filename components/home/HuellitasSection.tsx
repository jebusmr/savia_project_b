
import Link from "next/link";
import { ArrowRight, PawPrint } from "lucide-react";

export default function HuellitasSection() {
  return (
    <section className="px-6 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6 sm:flex-row sm:p-8">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-sm">
          <PawPrint className="h-8 w-8" />
        </div>

        <div className="flex-1 text-center sm:text-left">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            También en SAVIA
          </p>

          <h2 className="mt-1 text-2xl font-bold text-[#203564]">
            SAVIA Huellitas
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
            El bienestar de nuestra comunidad también incluye a quienes nos
            acompañan. Encuentra estéticas, hospedaje, cuidadores y otros
            servicios para tus mascotas.
          </p>
        </div>

        <Link
        href="/areas_salud"
        className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#203564] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#16284d]"
        >
        Conoce SAVIA Huellitas
        <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
