
"use client";

import { useState } from "react";
import Image from "next/image";

import { Specialist } from "@/types/specialist";
import AppointmentModal from "@/components/appointment/AppointmentModal";

import {
  BadgeCheck,
  CalendarDays,
  MapPin,
  Monitor,
  Building2,
  Share2,
} from "lucide-react";

interface SpecialistHeroProps {
  specialist: Specialist;
}

export default function SpecialistHero({
  specialist,
}: SpecialistHeroProps) {
  const [appointmentOpen, setAppointmentOpen] = useState(false);

  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">

            {/* Fotografía */}

            <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-emerald-100 shadow-lg md:h-40 md:w-40">
              <Image
                src={specialist.personalInfo.photo}
                alt={`${specialist.personalInfo.firstName} ${specialist.personalInfo.lastName}`}
                fill
                className="object-cover"
              />
            </div>

            {/* Nombre */}

            <h1 className="mt-6 text-3xl font-bold tracking-tight text-[#203564] md:text-4xl">
              {specialist.personalInfo.firstName}{" "}
              {specialist.personalInfo.lastName}
            </h1>

            {/* Título profesional */}

            {specialist.personalInfo.title && (
              <p className="mt-2 text-lg font-medium text-[#203564] md:text-xl">
                {specialist.personalInfo.title}
              </p>
            )}

            {/* Especialidad */}

            <p className="mt-2 text-lg font-medium text-emerald-600 md:text-xl">
              {specialist.personalInfo.specialty}
            </p>

            {specialist.personalInfo.subspecialty && (
              <p className="mt-1 text-gray-500">
                {specialist.personalInfo.subspecialty}
              </p>
            )}

            {/* Verificación */}

            {specialist.verification.verificationStatus === "VERIFIED" ? (
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
                <BadgeCheck className="h-5 w-5" />
                Perfil verificado por SAVIA
              </div>
            ) : (
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700">
                <BadgeCheck className="h-5 w-5" />
                Pendiente de validación
              </div>
            )}

            {/* Modalidades */}

            <div className="mt-8 flex flex-col gap-3 text-gray-600 md:flex-row md:gap-8">

              <div className="flex items-center justify-center gap-2">
                <MapPin className="h-5 w-5 text-emerald-600" />
                {specialist.location.city}, {specialist.location.state}
              </div>

              {specialist.consultation.modalities.includes("En línea") && (
                <div className="flex items-center justify-center gap-2">
                  <Monitor className="h-5 w-5 text-emerald-600" />
                  Consulta en línea
                </div>
              )}

              {specialist.consultation.modalities.includes("Presencial") && (
                <div className="flex items-center justify-center gap-2">
                  <Building2 className="h-5 w-5 text-emerald-600" />
                  Consulta presencial
                </div>
              )}

            </div>

            {/* Botones */}

            <div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">

              <button
                onClick={() => setAppointmentOpen(true)}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-emerald-600
                  px-6
                  py-3
                  font-semibold
                  text-white
                  transition
                  hover:bg-emerald-700
                "
              >
                <CalendarDays className="h-5 w-5" />
                Agendar cita
              </button>

              <button
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-emerald-600
                  px-6
                  py-3
                  font-semibold
                  text-emerald-600
                  transition
                  hover:bg-emerald-50
                "
              >
                <Share2 className="h-5 w-5" />
                Compartir perfil
              </button>

            </div>

          </div>
        </div>
      </section>

      <AppointmentModal
        open={appointmentOpen}
        onClose={() => setAppointmentOpen(false)}
        specialist={specialist}
      />
    </>
  );
}