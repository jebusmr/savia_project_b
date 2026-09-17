import {
  BadgeCheck,
  MapPin,
  Star,
  GraduationCap,
  Briefcase,
  ArrowRight,
} from "lucide-react";

import Link from "next/link";

type SpecialistCardProps = {
  id: string;
  name: string;
  specialty: string;
  city: string;
  rating: number;
  reviews: number;
  modalities: string[];
  attentionAreas?: string[];
  verificationStatus: string | null;
  yearsExperience: number | null;
};

export default function SpecialistCard({
  id,
  name,
  specialty,
  city,
  rating,
  reviews,
  modalities,
  attentionAreas = [],
  verificationStatus,
  yearsExperience,
}: SpecialistCardProps) {
  const verificationLabels = {
    VERIFIED: {
      label: "Perfil SAVIA Verificado",
      className: "bg-green-50 text-green-700",
      icon: "✓",
    },

    IN_REVIEW: {
      label: "Validación en proceso",
      className: "bg-amber-50 text-amber-700",
      icon: "◷",
    },

    PENDING: {
      label: "Pendiente de validación",
      className: "bg-gray-100 text-gray-600",
      icon: "○",
    },

    REJECTED: {
      label: "Validación no aprobada",
      className: "bg-red-50 text-red-700",
      icon: "!",
    },
  };

  const verification =
    verificationLabels[
      verificationStatus as keyof typeof verificationLabels
    ] ?? verificationLabels.PENDING;

  return (
    <div className="group overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[var(--color-primary)] hover:shadow-xl">
      {/* Imagen */}
      <div className="flex h-30 items-center justify-center bg-[var(--color-primary-light)]">
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-md">
          <span className="text-lg font-semibold text-[var(--color-primary)]">
            Foto
          </span>
        </div>
      </div>

      {/* Información */}
      <div className="p-6">
        {/* Estado de verificación */}
        <div
          className={`mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${verification.className}`}
        >
          {verificationStatus === "VERIFIED" ? (
            <BadgeCheck size={18} />
          ) : (
            <span className="text-base font-bold">
              {verification.icon}
            </span>
          )}

          {verification.label}
        </div>

        {/* Nombre */}
        <h3 className="text-2xl font-bold text-[var(--color-text)]">
          {name}
        </h3>

        {/* Especialidad */}
        <p className="mt-2 font-semibold text-[var(--color-primary)]">
          {specialty}
        </p>

        {/* Ciudad */}
        <div className="mt-4 flex items-center gap-2 text-[var(--color-text-light)]">
          <MapPin size={18} />
          {city}
        </div>

        {/* Experiencia */}
        <div className="mt-3 flex items-center gap-2 text-[var(--color-text-light)]">
          <Briefcase size={18} />
          {yearsExperience !== null
            ? `${yearsExperience} ${
                yearsExperience === 1
                  ? "año"
                  : "años"
              } ejerciendo`
            : "Experiencia no disponible"}
        </div>

        {/* Formación */}
        <div className="mt-3 flex items-center gap-2 text-[var(--color-text-light)]">
          <GraduationCap size={18} />
          Información verificada
        </div>

        {/* Valoración */}
        <div className="mt-3 flex items-center gap-2">
          <Star
            size={18}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="font-medium text-[var(--color-text)]">
            {rating}
          </span>

          <span className="text-[var(--color-text-light)]">
            ({reviews} opiniones)
          </span>
        </div>

        {/* Modalidades */}
        <div className="mt-4 flex flex-wrap gap-2">
          {modalities.map((item) => (
            <span
              key={item}
              className="rounded-full bg-[var(--color-primary-light)] px-3 py-1 text-sm font-medium text-[var(--color-primary)]"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Áreas de atención */}

        {attentionAreas.length > 0 && (
          <div className="mt-6">
            <p className="mb-3 font-semibold text-[var(--color-text)]">
              Áreas de atención
            </p>

            <div className="flex flex-wrap gap-2">
              {attentionAreas.map((item) => (
                <span
                  key={item}
                  className="rounded-lg bg-gray-100 px-3 py-1 text-sm text-[var(--color-text-light)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Botón */}
        <Link
          href={`/profesionales/${id}`}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] py-3 font-semibold text-white transition hover:opacity-90"
        >
          Ver perfil

          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}