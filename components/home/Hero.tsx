import Link from "next/link";
import Image from "next/image";

interface Specialty {
  id: string;
  name: string;
  slug: string;
  order: number;
  status: string;
}

interface Specialist {
  specialty: {
    name: string;
    slug: string;
  }[];
}

export default async function Hero() {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  let popularSpecialties: Specialty[] = [];

  try {
    const [specialtiesResponse, specialistsResponse] = await Promise.all([
      fetch(`${baseUrl}/api/specialties`, {
        cache: "no-store",
      }),
      fetch(`${baseUrl}/api/specialists`, {
        cache: "no-store",
      }),
    ]);

    const specialtiesResult = await specialtiesResponse.json();
    const specialistsResult = await specialistsResponse.json();

    const specialties: Specialty[] = specialtiesResult.success
      ? specialtiesResult.data
      : [];

    const specialists: Specialist[] = specialistsResult.success
      ? specialistsResult.data
      : [];

    const specialistCounts = new Map<string, number>();

    specialists.forEach((specialist) => {
      specialist.specialty.forEach((specialty) => {
        specialistCounts.set(
          specialty.slug,
          (specialistCounts.get(specialty.slug) ?? 0) + 1
        );
      });
    });

    popularSpecialties = specialties
      .filter(
        (specialty) =>
          specialty.status === "ACTIVE" &&
          specialistCounts.has(specialty.slug)
      )
      .sort((a, b) => {
        const countA = specialistCounts.get(a.slug) ?? 0;
        const countB = specialistCounts.get(b.slug) ?? 0;

        if (countB !== countA) {
          return countB - countA;
        }

        return a.order - b.order;
      })
      .slice(0, 5);
  } catch {
    popularSpecialties = [];
  }

  return (
    <section className="bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-8 lg:grid-cols-2">

        {/* Lado izquierdo */}

        <div>
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
            🌿 Plataforma de Salud y Desarrollo Humano
          </span>

          <h1 className="mt-8 text-5xl font-bold leading-tight text-[#203564] lg:text-5xl">
            Conectamos personas con una red confiable de salud y bienestar.
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-9 text-gray-600">
            Encuentra especialistas verificados, instituciones de salud y
            programas que fortalecen el bienestar de nuestra comunidad.
          </p>

          {/* Botones */}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/especialidades"
              className="rounded-xl bg-[#203564] px-8 py-4 text-center font-semibold text-white transition hover:bg-[#16294f]"
            >
              Buscar especialista
            </Link>

            <Link
              href="/savia/quienes-somos"
              className="rounded-xl border-2 border-[#C7A76C] px-8 py-4 text-center font-semibold text-[#203564] transition hover:bg-[#C7A76C] hover:text-white"
            >
              Conoce SAVIA
            </Link>
          </div>

          {/* Especialidades populares */}

          {popularSpecialties.length > 0 && (
            <div className="mt-12">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
                Especialidades populares
              </p>

              <div className="flex flex-wrap gap-3">
                {popularSpecialties.map((specialty) => (
                  <Link
                    key={specialty.id}
                    href={`/especialistas?specialty=${encodeURIComponent(
                      specialty.slug
                    )}`}
                    className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-[#203564] shadow-sm transition hover:border-[#C7A76C] hover:shadow-md"
                  >
                    {specialty.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Lado derecho */}

        <div className="flex justify-center">
          <div className="relative w-full max-w-xl">
            <Image
              src="/images/hero_home1.png"
              alt="Ecosistema de salud SAVIA"
              width={700}
              height={700}
              className="h-auto w-[90%] drop-shadow-md"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}