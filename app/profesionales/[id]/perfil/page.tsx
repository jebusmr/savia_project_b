import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

import ProfessionalProfileForm from "@/components/professional/ProfessionalProfileForm";
import EducationManager from "@/components/professional/EducationManager";
import ExperienceManager from "@/components/professional/ExperienceManager";
import CertificationManager from "@/components/professional/CertificationManager";
import AwardManager from "@/components/professional/AwardManager";
import ServiceManager from "@/components/professional/ServiceManager";
import AttentionAreaManager from "@/components/professional/AttentionAreaManager";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditarPerfilProfesionalPage({
  params,
}: PageProps) {
  const { id } = await params;

  const user = await getCurrentUser();

  if (!user) {
    notFound();
  }

  if (
    user.role !== "PROFESSIONAL" ||
    !user.specialist ||
    user.specialist.id !== id
  ) {
    notFound();
  }

  const profile =
    await prisma.specialistprofile.findUnique({
      where: {
        specialistId: id,
      },
    });

    const specialist = await prisma.specialist.findUnique({
  where: {
    id,
  },
  include: {
    specialty: {
      where: {
        status: "ACTIVE",
      },
      orderBy: {
        order: "asc",
      },
    },
  },
});

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">

        {/* Regresar al panel */}

        <div className="mb-6">
          <a
            href="/mi-cuenta"
            className="text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
          >
            ← Volver a mi panel
          </a>
        </div>

        {/* Contenido */}

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

          <p className="text-sm font-medium text-emerald-600">
            SAVIA · Perfil profesional
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#17365D]">
            Completar mi perfil
          </h1>

          <p className="mt-3 max-w-3xl text-gray-600">
            Completa la información de tu perfil profesional.
            Esta información permitirá que los usuarios conozcan
            mejor tu experiencia y trayectoria.
          </p>

          {/* Información general del perfil */}

          <ProfessionalProfileForm
            specialistId={id}
            firstName={user.specialist.firstName}
            lastName={user.specialist.lastName}
            title={user.specialist.title ?? ""}
            profile={
              profile
                ? {
                    biography:
                      profile.biography ?? "",
                    yearsExperience:
                      profile.yearsExperience,
                    certifications:
                      profile.certifications ?? "",
                    awards:
                      profile.awards ?? "",
                    languages:
                      profile.languages ?? "",
                    approach:
                      profile.approach ?? "",
                    philosophy:
                      profile.philosophy ?? "",
                  }
                : null
            }
          />

          {/* Formación académica */}

          <EducationManager
            specialistId={id}
          />

          {/* Experiencia profesional */}

          <ExperienceManager
            specialistId={id}
          />

          {/* Certificaciones profesionales */}

          <CertificationManager
            specialistId={id}
          />

          {/* Reconocimientos y premios */}

          <AwardManager
            specialistId={id}
          />

          {/* Servicios profesionales */}

          <ServiceManager
            specialistId={id}
          />

          {/* Áreas de atención */}

          <AttentionAreaManager
            specialistId={id}
            specialtyId={specialist?.specialty?.[0]?.id}
          />

        </div>
      </div>
    </main>
  );
}