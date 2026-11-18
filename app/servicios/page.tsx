
"use client";

import { useEffect, useState } from "react";
import {
  Ambulance,
  ArrowRight,
  Building2,
  FlaskConical,
  HeartPulse,
  Leaf,
  MapPin,
  Package,
  Pill,
  Phone,
  Mail,
  Globe,
  MessageCircle,
} from "lucide-react";

const serviceCategories = [
  {
    id: "laboratorios",
    apiCategory: "laboratorios-estudios",
    title: "Laboratorios y estudios",
    description:
      "Análisis clínicos, estudios de laboratorio y servicios de diagnóstico.",
    icon: FlaskConical,
  },
  {
    id: "farmacias",
    apiCategory: "farmacias",
    title: "Farmacias",
    description:
      "Farmacias y establecimientos dedicados al acceso a medicamentos y productos para la salud.",
    icon: Pill,
  },
  {
    id: "hospitales",
    apiCategory: "hospitales-clinicas",
    title: "Hospitales y clínicas",
    description:
      "Instituciones de salud, clínicas y establecimientos de atención médica.",
    icon: Building2,
  },
  {
    id: "equipamiento",
    apiCategory: "equipamiento-suministros",
    title: "Equipamiento y suministros",
    description:
      "Equipos médicos, materiales e insumos para el cuidado de la salud.",
    icon: Package,
  },
  {
    id: "alternativa",
    apiCategory: "medicina-alternativa",
    title: "Medicina alternativa",
    description:
      "Establecimientos y servicios complementarios relacionados con el bienestar.",
    icon: Leaf,
  },
  {
    id: "urgencias",
    apiCategory: "atencion-urgente",
    title: "Atención urgente",
    description:
      "Servicios de atención inmediata y opciones de asistencia urgente.",
    icon: Ambulance,
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
  city: string | null;
  municipality: string | null;
  state: string | null;
};

export default function ServiciosPage() {
  const [selectedCategory, setSelectedCategory] = useState(
    serviceCategories[0].id
  );

  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const activeCategory = serviceCategories.find(
    (category) => category.id === selectedCategory
  )!;

  const ActiveIcon = activeCategory.icon;

  useEffect(() => {
    const controller = new AbortController();

    async function loadEstablishments() {
      try {
        setLoading(true);
        setError("");
        setEstablishments([]);

        const response = await fetch(
          `/api/establecimientos?project=SAVIA&category=${activeCategory.apiCategory}`,
          { signal: controller.signal }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.error || "No fue posible consultar los establecimientos."
          );
        }

        setEstablishments(result.data);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Ocurrió un error al consultar los establecimientos."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadEstablishments();

    return () => controller.abort();
  }, [activeCategory.apiCategory]);

  function getWebsiteUrl(website: string) {
    return website.startsWith("http") ? website : `https://${website}`;
  }

  function getWhatsAppUrl(whatsapp: string) {
    const number = whatsapp.replace(/\D/g, "");
    return `https://wa.me/${number}`;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Encabezado */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            Atención SAVIA
          </p>

          <h1 className="mt-3 max-w-4xl text-3xl font-bold leading-tight text-[#203564] md:text-5xl">
            Encuentra el servicio de salud que necesitas
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-gray-600 md:text-lg md:leading-8">
            Explora establecimientos y servicios de salud y selecciona una
            categoría para conocer las opciones disponibles.
          </p>
        </div>
      </section>

      {/* Selector de categorías */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
        <div>
          <h2 className="text-2xl font-bold text-[#203564]">
            Explora por categoría
          </h2>

          <p className="mt-2 text-gray-600">
            Selecciona una opción para consultar sus servicios.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {serviceCategories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                aria-pressed={isSelected}
                className={`flex min-h-36 flex-col items-center justify-center rounded-2xl border p-4 text-center transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${
                  isSelected
                    ? "border-emerald-600 bg-emerald-50 shadow-sm"
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
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>

                <span
                  className={`mt-3 text-sm font-semibold leading-5 ${
                    isSelected ? "text-emerald-800" : "text-[#203564]"
                  }`}
                >
                  {category.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Resultados de la categoría seleccionada */}
        <section aria-live="polite" className="mt-10 scroll-mt-6">
          <div className="flex flex-col gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <ActiveIcon className="h-7 w-7" aria-hidden="true" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#203564]">
                  {activeCategory.title}
                </h2>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                  {activeCategory.description}
                </p>
              </div>
            </div>

            {!loading && !error && (
              <span className="inline-flex w-fit items-center rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                {establishments.length}{" "}
                {establishments.length === 1
                  ? "establecimiento"
                  : "establecimientos"}
              </span>
            )}
          </div>

          {/* Cargando */}
          {loading && (
            <div className="mt-6 rounded-2xl border border-gray-200 bg-white px-5 py-12 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />
              <p className="mt-4 text-sm text-gray-600">
                Consultando establecimientos...
              </p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-white px-5 py-10 text-center">
              <h3 className="text-lg font-bold text-[#203564]">
                No fue posible cargar la información
              </h3>
              <p className="mt-2 text-sm text-gray-600">{error}</p>
            </div>
          )}

          {/* Categoría sin establecimientos */}
          {!loading && !error && establishments.length === 0 && (
            <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-12 text-center sm:px-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <MapPin className="h-8 w-8" aria-hidden="true" />
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#203564]">
                Todavía no hay establecimientos disponibles
              </h3>

              <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-600">
                Estamos integrando opciones para esta categoría. Próximamente
                podrás consultar establecimientos, ubicaciones y datos de
                contacto.
              </p>
            </div>
          )}

          {/* Tarjetas de establecimientos */}
          {!loading && !error && establishments.length > 0 && (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {establishments.map((establishment) => (
                <article
                  key={establishment.id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  {establishment.image ? (
                    <img
                      src={establishment.image}
                      alt={establishment.name}
                      className="h-48 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-40 items-center justify-center bg-emerald-50 text-emerald-700">
                      <ActiveIcon className="h-14 w-14" aria-hidden="true" />
                    </div>
                  )}

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-[#203564]">
                      {establishment.name}
                    </h3>

                    {establishment.description && (
                      <p className="mt-3 text-sm leading-6 text-gray-600">
                        {establishment.description}
                      </p>
                    )}

                    {(establishment.address ||
                      establishment.city ||
                      establishment.municipality ||
                      establishment.state) && (
                      <div className="mt-4 flex items-start gap-2 text-sm text-gray-600">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                        <span>
                          {[
                            establishment.address,
                            establishment.municipality,
                            establishment.city,
                            establishment.state,
                          ]
                            .filter(Boolean)
                            .join(", ")}
                        </span>
                      </div>
                    )}

                    <div className="mt-5 space-y-3 border-t border-gray-100 pt-4">
                      {establishment.phone && (
                        <a
                          href={`tel:${establishment.phone}`}
                          className="flex items-center gap-2 text-sm text-gray-700 hover:text-emerald-700"
                        >
                          <Phone className="h-4 w-4 text-emerald-700" />
                          {establishment.phone}
                        </a>
                      )}

                      {establishment.whatsapp && (
                        <a
                          href={getWhatsAppUrl(establishment.whatsapp)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-gray-700 hover:text-emerald-700"
                        >
                          <MessageCircle className="h-4 w-4 text-emerald-700" />
                          Contactar por WhatsApp
                          <ArrowRight className="h-3.5 w-3.5" />
                        </a>
                      )}

                      {establishment.email && (
                        <a
                          href={`mailto:${establishment.email}`}
                          className="flex items-center gap-2 text-sm text-gray-700 hover:text-emerald-700"
                        >
                          <Mail className="h-4 w-4 text-emerald-700" />
                          {establishment.email}
                        </a>
                      )}

                      {establishment.website && (
                        <a
                          href={getWebsiteUrl(establishment.website)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-800"
                        >
                          <Globe className="h-4 w-4" />
                          Visitar sitio web
                          <ArrowRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>

      {/* Mensaje institucional */}
      <section className="border-t border-emerald-100 bg-emerald-50">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-12">
          <div className="flex max-w-3xl items-start gap-4">
            <HeartPulse className="mt-1 h-7 w-7 shrink-0 text-emerald-600" />

            <div>
              <h2 className="text-xl font-bold text-[#203564] md:text-2xl">
                Una red de salud para nuestra comunidad
              </h2>

              <p className="mt-3 leading-7 text-gray-700">
                SAVIA busca integrar progresivamente los establecimientos y
                servicios relacionados con la salud, facilitando el acceso a
                información útil para las personas.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
