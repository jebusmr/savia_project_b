import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

import SpecialistCard from "@/components/ui/SpecialistCard";

interface SpecialistFromApi {
  id: string;
  firstName: string;
  lastName: string;
  title: string | null;
  phone: string | null;

  specialistprofile: {
    yearsExperience: number | null;
    languages: string | null;
  } | null;

  specialistverification: {
    verificationStatus: string;
  } | null;

  specialty: {
    name: string;
    slug: string;
  }[];

  specialistattentionarea: {
    attentionarea: {
      name: string;
    };
  }[];

  specialistoffice: {
    office: {
      address: {
        city: string;
        state: string;
      };
    };
  }[];

  availability: {
    modality: string;
  }[];
}

interface EspecialistasPageProps {
  searchParams: Promise<{
    specialty?: string;
  }>;
}

export default async function EspecialistasPage({
  searchParams,
}: EspecialistasPageProps) {
  const { specialty: specialtySlug } =
    await searchParams;

  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_APP_URL ??
      "http://localhost:3000"
    }/api/specialists`,
    {
      cache: "no-store",
    }
  );

  const result = await response.json();

  const allSpecialists: SpecialistFromApi[] =
    result.success ? result.data : [];

  /*
   * Si existe ?specialty=...
   * filtramos los especialistas por el slug
   * de su especialidad.
   */

  const specialists = specialtySlug
    ? allSpecialists.filter((specialist) =>
        specialist.specialty.some(
          (item) => item.slug === specialtySlug
        )
      )
    : allSpecialists;

  /*
   * Obtenemos el nombre de la especialidad
   * seleccionada para mostrarlo en el encabezado.
   */

  const selectedSpecialtyName =
  specialtySlug
    ? allSpecialists
        .flatMap((specialist) => specialist.specialty)
        .find((item) => item.slug === specialtySlug)?.name ??
      specialtySlug
    : null;

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Encabezado */}

      <section className="border-b border-gray-200 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">

          {/* Navegación */}

          <div className="mb-8 flex flex-wrap items-center gap-4">

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-[#203564]"
            >
              <Home className="h-4 w-4" />

              Inicio
            </Link>

            <span className="text-gray-300">
              /
            </span>

            {specialtySlug ? (
              <Link
                href="/especialidades"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-[#203564]"
              >
                <ArrowLeft className="h-4 w-4" />

                Volver a especialidades
              </Link>
            ) : (
              <span className="text-sm font-medium text-[#203564]">
                Especialistas
              </span>
            )}

          </div>

          {/* Título */}

          <h1 className="text-4xl font-bold text-[#203564]">

            {selectedSpecialtyName
              ? `Especialistas en ${selectedSpecialtyName}`
              : "Especialistas SAVIA"}

          </h1>

          <p className="mt-4 max-w-2xl text-gray-600">

            {selectedSpecialtyName
              ? `Conoce a los profesionales de SAVIA especializados en ${selectedSpecialtyName}.`
              : "Encuentra profesionales de salud verificados en La Piedad y conoce su experiencia, especialidades y opciones de atención."}

          </p>

        </div>

      </section>

      {/* Catálogo */}

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">

        {specialists.length === 0 ? (

          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">

            <h2 className="text-xl font-semibold text-[#203564]">

              {specialtySlug
                ? "Aún no hay especialistas disponibles"
                : "No hay especialistas disponibles"}

            </h2>

            <p className="mt-2 text-gray-600">

              {specialtySlug
                ? "Actualmente todavía no hay profesionales registrados en esta especialidad dentro de SAVIA."
                : "Actualmente no hay especialistas publicados en SAVIA."}

            </p>

            {specialtySlug && (

              <Link
                href="/especialidades"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#203564] px-5 py-3 font-semibold text-white transition hover:opacity-90"
              >

                <ArrowLeft className="h-4 w-4" />

                Explorar otras especialidades

              </Link>

            )}

          </div>

        ) : (

          <>

            <p className="mb-8 text-sm text-gray-500">

              {specialists.length === 1
                ? "1 especialista encontrado"
                : `${specialists.length} especialistas encontrados`}

            </p>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

              {specialists.map((specialist) => {

                const specialty =
                  specialtySlug
                    ? specialist.specialty.find(
                        (item) =>
                          item.slug === specialtySlug
                      )?.name ?? "Especialista"
                    : specialist.specialty[0]?.name ??
                      "Especialista";

                const office =
                  specialist.specialistoffice[0]?.office;

                const city =
                  office?.address.city ??
                  "La Piedad";

                const modalities = Array.from(
                  new Set(
                    specialist.availability.map(
                      (item) => item.modality
                    )
                  )
                );

                const attentionAreas =
                  specialist.specialistattentionarea.map(
                    (item) =>
                      item.attentionarea.name
                  );

                return (

                  <SpecialistCard
                    key={specialist.id}
                    id={specialist.id}
                    name={`${specialist.title ?? ""} ${
                      specialist.firstName
                    } ${specialist.lastName}`.trim()}
                    specialty={specialty}
                    city={city}
                    rating={5}
                    reviews={0}
                    modalities={modalities}
                    attentionAreas={attentionAreas}
                    verificationStatus={
                      specialist.specialistverification
                        ?.verificationStatus ?? null
                    }
                    yearsExperience={
                      specialist.specialistprofile
                        ?.yearsExperience ?? null
                    }
                  />

                );
              })}

            </div>

          </>

        )}

      </section>

    </main>
  );
}