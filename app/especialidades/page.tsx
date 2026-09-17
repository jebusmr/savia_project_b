"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  Activity,
  Apple,
  Baby,
  Brain,
  HeartPulse,
  Smile,
  Stethoscope,
  UserRound,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

interface Specialty {
  id: string;
  name: string;
  slug: string;
  shortName: string | null;
  description: string | null;
  icon: string | null;
  color: string | null;
  order: number;
}

const iconMap: Record<string, LucideIcon> = {
  Activity,
  Apple,
  Baby,
  Brain,
  HeartPulse,
  Smile,
  Stethoscope,
  UserRound,
};

export default function EspecialidadesPage() {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSpecialties = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/specialties");

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.error ||
              "No fue posible obtener las especialidades."
          );
        }

        setSpecialties(result.data ?? []);
      } catch (error) {
        console.error(
          "Error cargando especialidades:",
          error
        );

        setError(
          "No fue posible cargar las especialidades."
        );
      } finally {
        setLoading(false);
      }
    };

    loadSpecialties();
  }, []);

  return (
    <main className="min-h-screen bg-[var(--color-background)]">

      {/* HERO */}

      <section className="border-b border-[var(--color-border)]">

        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">

          <div className="max-w-3xl">

            <p className="font-semibold text-[var(--color-secondary)]">
              ATENCIÓN EN SALUD
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-[var(--color-primary)] md:text-6xl">
              Encuentra la atención que necesitas
            </h1>

            <p className="mt-6 text-lg leading-8 text-[var(--color-text-muted)]">
              Explora las especialidades disponibles en SAVIA y
              encuentra profesionales de la salud que pueden ayudarte
              de acuerdo con tus necesidades.
            </p>

          </div>

        </div>

      </section>

      {/* CONTENIDO */}

      <section className="mx-auto max-w-7xl px-6 py-16">

        <div className="mb-10">

          <h2 className="text-3xl font-bold text-[var(--color-primary)]">
            Especialidades disponibles
          </h2>

          <p className="mt-3 text-[var(--color-text-muted)]">
            Conoce las áreas de atención disponibles dentro de SAVIA.
          </p>

        </div>

        {/* CARGANDO */}

        {loading && (
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center">

            <p className="text-[var(--color-text-muted)]">
              Cargando especialidades...
            </p>

          </div>
        )}

        {/* ERROR */}

        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">

            <p className="font-medium text-red-700">
              {error}
            </p>

          </div>
        )}

        {/* SIN ESPECIALIDADES */}

        {!loading &&
          !error &&
          specialties.length === 0 && (
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center">

              <p className="font-medium text-[var(--color-primary)]">
                Aún no hay especialidades disponibles.
              </p>

              <p className="mt-2 text-[var(--color-text-muted)]">
                Próximamente podrás consultar las especialidades
                disponibles en SAVIA.
              </p>

            </div>
          )}

        {/* GRID */}

        {!loading &&
          !error &&
          specialties.length > 0 && (

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {specialties.map((specialty) => {

                const Icon =
                  specialty.icon &&
                  iconMap[specialty.icon]
                    ? iconMap[specialty.icon]
                    : Stethoscope;

                return (

                  <Link
                    key={specialty.id}
                    href={`/especialistas?specialty=${specialty.slug}`}
                    className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-secondary)] hover:shadow-lg"
                  >

                    <div className="flex items-start justify-between">

                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50">

                        <Icon className="h-7 w-7 text-[var(--color-secondary)]" />

                      </div>

                      <ArrowRight className="h-5 w-5 text-[var(--color-text-muted)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--color-secondary)]" />

                    </div>

                    <h3 className="mt-6 text-xl font-bold text-[var(--color-primary)]">

                      {specialty.shortName ||
                        specialty.name}

                    </h3>

                    {specialty.description && (

                      <p className="mt-3 leading-7 text-[var(--color-text-muted)]">

                        {specialty.description}

                      </p>

                    )}

                    <div className="mt-6 flex items-center gap-2 font-semibold text-[var(--color-secondary)]">

                      Ver especialistas

                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

                    </div>

                  </Link>

                );
              })}

            </div>

          )}

      </section>

    </main>
  );
}