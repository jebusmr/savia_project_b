
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Stethoscope,
  FlaskConical,
  PawPrint,
  TriangleAlert,
  ArrowRight,
  HeartHandshake,
  Globe,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";

const huellitasSections = [
  {
    title: "Veterinarios y clínicas",
    category: "veterinarios-clinicas",
    description:
      "Encuentra veterinarios, consultorios y clínicas para el cuidado de tu mascota.",
    icon: Stethoscope,
  },
  {
    title: "Laboratorios y diagnóstico",
    category: "laboratorios-estudios",
    description:
      "Consulta laboratorios y servicios de diagnóstico veterinario.",
    icon: FlaskConical,
  },
  {
    title: "Servicios para mascotas",
    category: "servicios-mascotas",
    description:
      "Encuentra estéticas, hospedajes, cuidadores y otros servicios para mascotas.",
    icon: PawPrint,
  },
  {
    title: "Atención urgente",
    category: "atencion-urgente",
    description:
      "Encuentra opciones de atención veterinaria urgente para tu mascota.",
    icon: TriangleAlert,
  },
];


type Establishment = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  website: string | null;
  image: string | null;
  address: string | null;
  city: string;
  municipality: string | null;
  state: string;
};

export default function AreasSaludPage() {
  const [selectedCategory, setSelectedCategory] = useState(
    huellitasSections[0].category
  );
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const activeSection = huellitasSections.find(
    (section) => section.category === selectedCategory
  )!;

  const ActiveIcon = activeSection.icon;

  useEffect(() => {
    let cancelled = false;

    async function loadEstablishments() {
      setLoading(true);
      setError("");
      setEstablishments([]);

      try {
        const response = await fetch(
          `/api/establecimientos?project=HUELLITAS&category=${encodeURIComponent(
            selectedCategory
          )}`
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.error || "No fue posible cargar los establecimientos."
          );
        }

        if (!cancelled) {
          setEstablishments(result.data as Establishment[]);
        }
      } catch {
        if (!cancelled) {
          setError("No fue posible cargar los establecimientos. Intenta nuevamente.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadEstablishments();

    return () => {
      cancelled = true;
    };
  }, [selectedCategory]);

  return (
    <main className="bg-white">
      {/* Encabezado */}
      <section
        className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/huellitas/banner-huellitas.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#203564]/85 via-[#203564]/50 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-[#203564]/45 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
              <PawPrint className="h-4 w-4" />
              SAVIA Huellitas
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Cuidado y bienestar para nuestras huellitas
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white md:text-lg">
              Encuentra profesionales, establecimientos y servicios para
              tus mascotas.
            </p>
          </div>
        </div>
      </section>

      {/* Catálogo interactivo */}
      <section className="bg-[#f8faf9]">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Encuentra lo que necesitas
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#203564] md:text-4xl">
              Servicios para nuestras mascotas
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Selecciona una categoría para consultar los establecimientos disponibles.
            </p>
          </div>

          {/* Botones de categoría */}
          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {huellitasSections.map((section) => {
              const Icon = section.icon;
              const isSelected = selectedCategory === section.category;

              return (
                <button
                  key={section.category}
                  type="button"
                  onClick={() => setSelectedCategory(section.category)}
                  aria-pressed={isSelected}
                  className={`rounded-2xl border p-5 text-left transition ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-50 shadow-sm"
                      : "border-gray-200 bg-white hover:border-emerald-300"
                  }`}
                >
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                      isSelected
                        ? "bg-emerald-600 text-white"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>

                  <span className="mt-4 block font-semibold text-[#203564]">
                    {section.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Resultados de la categoría */}
          <section aria-live="polite" className="mt-8">
            <div className="flex flex-col gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-center">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <ActiveIcon className="h-7 w-7" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#203564]">
                  {activeSection.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  {activeSection.description}
                </p>
              </div>
            </div>

            {loading ? (
              <div className="mt-6 rounded-2xl border border-gray-200 bg-white px-5 py-12 text-center text-gray-600">
                Cargando establecimientos...
              </div>
            ) : error ? (
              <div className="mt-6 rounded-2xl border border-red-200 bg-white px-5 py-8 text-center text-red-700">
                <p>{error}</p>
                <button
                  type="button"
                  onClick={() => setSelectedCategory(selectedCategory)}
                  className="mt-4 rounded-lg bg-[#203564] px-4 py-2 text-sm font-semibold text-white"
                >
                  Volver a consultar
                </button>
              </div>
            ) : establishments.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-12 text-center">
                <MapPin className="mx-auto h-10 w-10 text-emerald-700" />

                <h4 className="mt-4 text-xl font-bold text-[#203564]">
                  Aún no hay establecimientos publicados
                </h4>

                <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-600">
                  Estamos integrando el directorio de SAVIA Huellitas.
                  Cuando haya establecimientos aprobados y publicados
                  en esta categoría, aparecerán aquí.
                </p>
              </div>
            ) : (
              <>
                <p className="mt-6 text-sm text-gray-600">
                  {establishments.length}{" "}
                  {establishments.length === 1
                    ? "establecimiento encontrado"
                    : "establecimientos encontrados"}
                </p>

                <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {establishments.map((establishment) => (
                    <article
                      key={establishment.id}
                      className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                    >
                      {establishment.image ? (
                        <img
                          src={establishment.image}
                          alt={establishment.name}
                          className="h-48 w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-36 items-center justify-center bg-emerald-50 text-emerald-700">
                          <ActiveIcon className="h-12 w-12" />
                        </div>
                      )}

                      <div className="p-5">
                        <h4 className="text-lg font-bold text-[#203564]">
                          {establishment.name}
                        </h4>

                        {establishment.description && (
                          <p className="mt-2 text-sm leading-6 text-gray-600">
                            {establishment.description}
                          </p>
                        )}

                        <p className="mt-3 flex items-start gap-2 text-sm text-gray-600">
                          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                          <span>
                            {[establishment.address, establishment.municipality, establishment.city, establishment.state]
                              .filter(Boolean)
                              .join(", ")}
                          </span>
                        </p>

                        {establishment.phone && (
                          <p className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="h-4 w-4 text-emerald-700" />
                            {establishment.phone}
                          </p>
                        )}

                        {establishment.email && (
                          <p className="mt-2 flex items-center gap-2 break-all text-sm text-gray-600">
                            <Mail className="h-4 w-4 shrink-0 text-emerald-700" />
                            {establishment.email}
                          </p>
                        )}

                        <div className="mt-5 flex flex-wrap gap-2">
                          {establishment.whatsapp && (
                            <a
                              href={`https://wa.me/${establishment.whatsapp.replace(/\D/g, "")}`}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
                            >
                              WhatsApp
                            </a>
                          )}

                          {establishment.website && (
                            <a
                              href={establishment.website}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-[#203564] hover:bg-gray-50"
                            >
                              Sitio web
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}
          </section>
        </div>
      </section>

      {/* Invitación a establecimientos */}
      <section className="border-y border-emerald-100 bg-emerald-50/70">
        <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
          <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <HeartHandshake className="h-8 w-8 text-emerald-700" />

                <h2 className="mt-5 text-2xl font-bold text-[#203564] md:text-3xl">
                  ¿Tienes un servicio para mascotas?
                </h2>

                <p className="mt-4 leading-7 text-gray-600">
                  Invitamos a veterinarios, clínicas, laboratorios,
                  estéticas, cuidadores y otros servicios a formar
                  parte de la comunidad SAVIA Huellitas.
                </p>
              </div>

              <Link
                href="/contacto"
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#203564] px-6 py-3 text-sm font-semibold text-white hover:bg-[#16284d]"
              >
                Quiero formar parte
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vínculo institucional */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-12 text-center md:py-16">
          <Globe className="mx-auto h-8 w-8 text-emerald-700" />

          <h2 className="mt-4 text-2xl font-bold text-[#203564]">
            SAVIA es una red para nuestra comunidad
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
            Las mascotas también forman parte de nuestras familias.
            Huellitas complementa la red SAVIA con opciones para su cuidado
            y bienestar.
          </p>

          <Link
            href="/especialidades"
            className="mt-7 inline-flex items-center rounded-xl bg-[#203564] px-6 py-3 text-sm font-semibold text-white hover:bg-[#16284d]"
          >
            Conocer los servicios de salud
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
