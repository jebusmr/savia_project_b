import SpecialistCard from "../ui/SpecialistCard";

interface SpecialistFromApi {
  id: string;
  firstName: string;
  lastName: string;
  title: string | null;

  specialistprofile: {
    yearsExperience: number | null;
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

interface FeaturedSpecialistsProps {
  specialty?: string;
}

export default async function FeaturedSpecialists({
  specialty,
}: FeaturedSpecialistsProps) {
    let specialists: SpecialistFromApi[] = [];

  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_APP_URL ??
        "http://localhost:3000"
      }/api/specialists`,
      {
        cache: "no-store",
      }
    );

    if (response.ok) {
      const result = await response.json();

      specialists =
        result.success && Array.isArray(result.data)
          ? result.data
          : [];
    }
  } catch (error) {
    console.error(
      "Error cargando especialistas destacados:",
      error
    );
  }

  const filteredSpecialists = specialty
    ? specialists.filter((specialist) =>
        specialist.specialty.some(
          (item) =>
            item.name.toLowerCase() === specialty.toLowerCase()
        )
      )
    : specialists;

  const featuredSpecialists = filteredSpecialists.slice(0, 3);

  const sectionTitle = specialty
    ? `Especialistas en ${specialty}`
    : "Especialistas destacados";

  const sectionDescription = specialty
    ? `Conoce profesionales verificados de ${specialty} que forman parte de la red SAVIA.`
    : "Conoce algunos de los profesionales verificados que forman parte de la red SAVIA.";

  return (
    <section
      id="especialistas"
      className="bg-white py-14 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Encabezado */}
        <div className="mb-8 text-center">

          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            Red SAVIA
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#203564] md:text-4xl">
            {sectionTitle}
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
            {sectionDescription}
          </p>

        </div>

        {/* Especialistas */}
        {featuredSpecialists.length === 0 ? (

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center">

            <h3 className="text-lg font-semibold text-[#203564]">
              {specialty
                ? `Próximamente encontrarás especialistas en ${specialty}`
                : "Próximamente conocerás a nuestros especialistas"}
            </h3>

            <p className="mt-2 text-gray-600">
              Estamos integrando profesionales verificados
              a la red SAVIA.
            </p>

          </div>

        ) : (

          <div className="grid gap-8 lg:grid-cols-3">

            {featuredSpecialists.map((specialist) => {

              const specialistSpecialty =
                specialist.specialty[0]?.name ??
                "Profesional de la salud";

              const office =
                specialist.specialistoffice[0]?.office;

              const city =
                office?.address.city ??
                "La Piedad";

              const state =
                office?.address.state ??
                "";

              const location = state
                ? `${city}, ${state}`
                : city;

              const modalities = Array.from(
                new Set(
                  specialist.availability.map(
                    (item) => item.modality
                  )
                )
              );

              const attentionAreas =
                specialist.specialistattentionarea.map(
                  (item) => item.attentionarea.name
                );

              return (
                <SpecialistCard
                  key={specialist.id}
                  id={specialist.id}
                  name={`${specialist.title ?? ""} ${
                    specialist.firstName
                  } ${specialist.lastName}`.trim()}
                  specialty={specialistSpecialty}
                  city={location}
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
        )}

      </div>
    </section>
  );
}