
"use client";

import { useState } from "react";
import {
  Ambulance,
  ArrowRight,
  Building2,
  Clock3,
  FlaskConical,
  HeartPulse,
  Leaf,
  MapPin,
  Package,
  Pill,
} from "lucide-react";

const serviceCategories = [
  {
    id: "laboratorios",
    title: "Laboratorios y estudios",
    description:
      "Análisis clínicos, estudios de laboratorio y servicios de diagnóstico.",
    icon: FlaskConical,
  },
  {
    id: "farmacias",
    title: "Farmacias",
    description:
      "Farmacias y establecimientos dedicados al acceso a medicamentos y productos para la salud.",
    icon: Pill,
  },
  {
    id: "hospitales",
    title: "Hospitales y clínicas",
    description:
      "Instituciones de salud, clínicas y establecimientos de atención médica.",
    icon: Building2,
  },
  {
    id: "equipamiento",
    title: "Equipamiento y suministros",
    description:
      "Equipos médicos, materiales e insumos para el cuidado de la salud.",
    icon: Package,
  },
  {
    id: "alternativa",
    title: "Medicina alternativa",
    description:
      "Establecimientos y servicios complementarios relacionados con el bienestar.",
    icon: Leaf,
  },
  {
    id: "urgencias",
    title: "Atención urgente",
    description:
      "Servicios de atención inmediata y opciones de asistencia urgente.",
    icon: Ambulance,
  },
];

export default function ServiciosPage() {
  const [selectedCategory, setSelectedCategory] = useState(
    serviceCategories[0].id
  );

  const activeCategory = serviceCategories.find(
    (category) => category.id === selectedCategory
  )!;

  const ActiveIcon = activeCategory.icon;

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
            Explora establecimientos y servicios de salud en
            La Piedad y la región. Selecciona una categoría
            para conocer las opciones disponibles.
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
        <section
          aria-live="polite"
          className="mt-10 scroll-mt-6"
        >
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

            <span className="inline-flex w-fit items-center rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600">
              En preparación
            </span>
          </div>

          {/* Estado vacío */}
          <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-12 text-center sm:px-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              <MapPin className="h-8 w-8" aria-hidden="true" />
            </div>

            <h3 className="mt-5 text-xl font-bold text-[#203564]">
              Estamos preparando esta categoría
            </h3>

            <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-600">
              Próximamente podrás consultar establecimientos,
              ubicaciones, horarios y datos de contacto
              relacionados con esta categoría.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-sm font-medium text-gray-600">
              <Clock3 className="h-4 w-4" aria-hidden="true" />
              Próximamente en SAVIA
            </div>
          </div>
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
                SAVIA busca integrar progresivamente los
                establecimientos y servicios relacionados
                con la salud en La Piedad y la región,
                facilitando el acceso a información útil
                para las personas.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
