import SpecialtyHero from "@/components/common/SpecialtyHero";
import AboutSection from "@/components/specialties/AboutSection";
import WhenToVisit from "@/components/specialties/WhenToVisit";
import ConditionsSection from "@/components/specialties/ConditionsSection";
import CareTypes from "@/components/specialties/CareTypes";
import FeaturedSpecialists from "@/components/home/FeaturedSpecialists";
import SpecialtyCTA from "@/components/specialties/SpecialtyCTA";

import {
  HeartPulse,
  Activity,
  ShieldCheck,
  HeartHandshake,
  Stethoscope,
  Building2,
  Laptop,
  User,
} from "lucide-react";

const cardiologyReasons = [
  {
    title: "Presión arterial elevada",
    description:
      "La hipertensión puede requerir seguimiento profesional para identificar riesgos y favorecer un adecuado control.",
    icon: Activity,
  },
  {
    title: "Palpitaciones",
    description:
      "Sensaciones de latidos rápidos, fuertes o irregulares pueden ser motivo de valoración profesional.",
    icon: HeartPulse,
  },
  {
    title: "Dolor o molestias en el pecho",
    description:
      "Las molestias en el pecho pueden tener diferentes causas y deben ser valoradas por un profesional de salud.",
    icon: HeartPulse,
  },
  {
    title: "Antecedentes familiares",
    description:
      "Los antecedentes de enfermedades cardiovasculares pueden ser un motivo para realizar una valoración preventiva.",
    icon: ShieldCheck,
  },
  {
    title: "Colesterol elevado",
    description:
      "Los niveles elevados de colesterol pueden incrementar el riesgo cardiovascular y requieren seguimiento.",
    icon: Activity,
  },
  {
    title: "Prevención cardiovascular",
    description:
      "Una valoración profesional puede ayudar a identificar factores de riesgo y establecer medidas preventivas.",
    icon: HeartHandshake,
  },
];

const cardiologyConditions = [
  "Hipertensión arterial",
  "Arritmias cardíacas",
  "Enfermedad coronaria",
  "Insuficiencia cardíaca",
  "Colesterol elevado",
  "Enfermedades de las válvulas cardíacas",
  "Factores de riesgo cardiovascular",
  "Prevención cardiovascular",
];

const cardiologyCareTypes = [
  {
    title: "Consulta cardiológica",
    description:
      "Valoración médica especializada del corazón y del sistema cardiovascular.",
    icon: Stethoscope,
  },
  {
    title: "Evaluación preventiva",
    description:
      "Identificación y seguimiento de factores que pueden aumentar el riesgo cardiovascular.",
    icon: ShieldCheck,
  },
  {
    title: "Seguimiento",
    description:
      "Acompañamiento profesional para el control y seguimiento de condiciones cardiovasculares.",
    icon: HeartPulse,
  },
  {
    title: "Atención presencial",
    description:
      "Consulta con profesionales de Cardiología en los espacios de atención disponibles.",
    icon: Building2,
  },
  {
    title: "Atención en línea",
    description:
      "Cuando el profesional lo ofrece, algunas consultas y seguimientos pueden realizarse a distancia.",
    icon: Laptop,
  },
  {
    title: "Orientación individual",
    description:
      "Atención adaptada a las necesidades y antecedentes de cada persona.",
    icon: User,
  },
];

export default function CardiologiaPage() {
  return (
    <main>
      <SpecialtyHero
        area="Salud cardiovascular"
        areaHref="/areas_salud/salud_cardiovascular"
        title="Cardiología"
        description="La Cardiología se ocupa de la valoración, prevención, diagnóstico y seguimiento de las enfermedades del corazón y del sistema cardiovascular. En SAVIA puedes conocer profesionales verificados y sus opciones de atención."
        location="La Piedad y la región"
      />

      <AboutSection
        badge="Conoce esta especialidad"
        title="¿Qué es la Cardiología?"
        description="La Cardiología es la especialidad médica dedicada al estudio y atención del corazón y del sistema cardiovascular. Su trabajo incluye la prevención, valoración y seguimiento de diferentes condiciones que pueden afectar la salud cardiovascular."
        benefits={[
          "Prevención y evaluación de factores de riesgo cardiovascular",
          "Valoración especializada del corazón y sistema circulatorio",
          "Seguimiento de condiciones cardiovasculares",
        ]}
      />

      <WhenToVisit
        badge="Atención oportuna"
        title="¿Cuándo acudir con un cardiólogo?"
        subtitle="Una valoración cardiológica puede ser recomendable ante determinados síntomas, antecedentes o factores de riesgo. La necesidad de atención depende de la situación particular de cada persona."
        items={cardiologyReasons}
      />

      <ConditionsSection
        badge="Información"
        title="Condiciones cardiovasculares"
        subtitle="Estas son algunas de las condiciones y situaciones relacionadas con la atención cardiológica."
        conditions={cardiologyConditions}
      />

      <CareTypes
        badge="Atención"
        title="Tipos de atención en Cardiología"
        subtitle="La atención puede variar de acuerdo con las necesidades de cada persona y los servicios que ofrece cada profesional."
        items={cardiologyCareTypes}
      />

      <FeaturedSpecialists specialty="Cardiología" />

      <SpecialtyCTA
        specialty="Cardiología"
        specialtySlug="cardiologia"
        />
    </main>
  );
}