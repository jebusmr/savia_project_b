import Link from "next/link";
import {
  HeartPulse,
  Brain,
  Baby,
  VenusAndMars,
  Apple,
  Smile,
  Bone,
  Stethoscope,
  Ear,
  Eye,
  Scissors,
  Droplets,
  Utensils,
  Sparkles,
  Activity,
  Syringe,
} from "lucide-react";

const healthAreas = [
  {
    title: "Salud cardiovascular",
    description:
      "Prevención, cuidado y atención de enfermedades relacionadas con el corazón y la circulación.",
    icon: HeartPulse,
    href: "/areas_salud/salud_cardiovascular",
  },
  {
    title: "Salud mental",
    description:
      "Bienestar emocional, psicológico y atención profesional para diferentes etapas de la vida.",
    icon: Brain,
    href: "/areas_salud/salud_mental",
  },
  {
    title: "Salud infantil",
    description:
      "Cuidado y atención de niñas, niños y adolescentes durante sus diferentes etapas de desarrollo.",
    icon: Baby,
    href: "/areas_salud/salud_infantil",
  },
  {
    title: "Salud de la mujer",
    description:
      "Atención integral de la salud de la mujer en las diferentes etapas de la vida.",
    icon: VenusAndMars,
    href: "/areas_salud/salud_mujer",
  },
  {
    title: "Salud nutricional",
    description:
      "Alimentación, nutrición y orientación profesional para favorecer el bienestar y la salud.",
    icon: Apple,
    href: "/areas_salud/salud_nutricional",
  },
  {
    title: "Salud bucal",
    description:
      "Prevención, cuidado y atención de la boca, dientes y estructuras relacionadas.",
    icon: Smile,
    href: "/areas_salud/salud_bucal",
  },
  {
    title: "Salud musculoesquelética",
    description:
      "Cuidado de huesos, músculos, articulaciones y movimiento corporal.",
    icon: Bone,
    href: "/areas_salud/salud_musculoesqueletica",
  },
  {
    title: "Salud digestiva",
    description:
      "Prevención y atención de problemas relacionados con el sistema digestivo.",
    icon: Utensils,
    href: "/areas_salud/salud_digestiva",
  },
  {
    title: "Salud renal",
    description:
      "Prevención, cuidado y atención de las enfermedades relacionadas con los riñones.",
    icon: Droplets,
    href: "/areas_salud/salud_renal",
  },
  {
    title: "Salud de la piel",
    description:
      "Cuidado, prevención y atención de enfermedades y condiciones de la piel.",
    icon: Sparkles,
    href: "/areas_salud/salud_piel",
  },
  {
    title: "Salud visual",
    description:
      "Prevención y atención de la visión y de las diferentes condiciones oculares.",
    icon: Eye,
    href: "/areas_salud/salud_visual",
  },
  {
    title: "Salud auditiva",
    description:
      "Cuidado y atención de la audición, el oído y estructuras relacionadas.",
    icon: Ear,
    href: "/areas_salud/salud_auditiva",
  },
  {
    title: "Medicina general",
    description:
      "Atención integral, orientación y seguimiento de las necesidades generales de salud.",
    icon: Stethoscope,
    href: "/areas_salud/medicina_general",
  },
  {
    title: "Cirugía",
    description:
      "Información y acceso a profesionales relacionados con diferentes procedimientos quirúrgicos.",
    icon: Scissors,
    href: "/areas_salud/cirugia",
  },
  {
    title: "Anestesiología",
    description:
      "Atención especializada relacionada con anestesia, procedimientos y cuidados perioperatorios.",
    icon: Syringe,
    href: "/areas_salud/anestesiologia",
  },
  {
    title: "Especialidades clínicas",
    description:
      "Explora diferentes especialidades médicas para necesidades específicas de atención.",
    icon: Activity,
    href: "/areas_salud/especialidades_clinicas",
  },
];

export default function AreasSaludPage() {
  return (
    <main className="bg-white">
      <section className="bg-gradient-to-br from-[#203564] via-[#27467c] to-[#2f6f62]">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center md:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">
            Salud
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Áreas de salud
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-blue-50 md:text-lg">
            Explora las diferentes áreas de salud que forman parte de SAVIA.
            Encuentra información, profesionales y recursos relacionados con
            tus necesidades de atención y bienestar.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-[#203564] md:text-4xl">
            Explora un área de salud
          </h2>

          <p className="mt-4 text-gray-600">
            Cada área reúne diferentes especialidades, servicios y recursos
            relacionados con la atención y el cuidado de la salud.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {healthAreas.map((area) => {
            const Icon = area.icon;

            return (
              <Link
                key={area.title}
                href={area.href}
                className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-100">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-[#203564]">
                  {area.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {area.description}
                </p>

                <span className="mt-6 inline-flex items-center text-sm font-semibold text-emerald-700">
                  Explorar área
                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-t border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-[#203564] md:text-3xl">
            Una visión integral de la salud
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
            En SAVIA entendemos la salud como un proceso integral que incluye
            prevención, atención profesional, bienestar y participación de la
            comunidad.
          </p>

          <div className="mt-8">
            <Link
              href="/especialidades"
              className="inline-flex items-center rounded-xl bg-[#203564] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#16284d]"
            >
              Explorar especialistas
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}