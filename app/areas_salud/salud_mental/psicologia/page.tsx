import SpecialtyHero from "@/components/common/SpecialtyHero";
import AboutSection from "@/components/specialties/AboutSection";
import WhenToVisit from "@/components/specialties/WhenToVisit";
import ConditionsSection from "@/components/specialties/ConditionsSection";
import CareTypes from "@/components/specialties/CareTypes";
import FeaturedSpecialists from "@/components/home/FeaturedSpecialists";
import SpecialtyCTA from "@/components/specialties/SpecialtyCTA";

import {
  Brain,
  MoonStar,
  HeartHandshake,
  Users,
  Briefcase,
  Baby,
  Building2,
  Laptop,
  User,
} from "lucide-react";

const psychologyReasons = [
  {
    title: "Ansiedad y preocupación",
    description:
      "Cuando el estrés, la ansiedad o la preocupación interfieren con tu vida diaria.",
    icon: Brain,
  },
  {
    title: "Dificultades para dormir",
    description:
      "Problemas para conciliar el sueño o descansar adecuadamente durante varias semanas.",
    icon: MoonStar,
  },
  {
    title: "Duelo o pérdidas",
    description:
      "Acompañamiento emocional tras la pérdida de un ser querido o un cambio importante.",
    icon: HeartHandshake,
  },
  {
    title: "Relaciones personales",
    description:
      "Conflictos familiares, de pareja o dificultades para comunicarte con los demás.",
    icon: Users,
  },
  {
    title: "Estrés laboral o académico",
    description:
      "Cuando el trabajo o los estudios afectan tu bienestar físico y emocional.",
    icon: Briefcase,
  },
  {
    title: "Desarrollo infantil",
    description:
      "Apoyo para niñas, niños y adolescentes en diferentes etapas de su desarrollo.",
    icon: Baby,
  },
];
const psychologyConditions = [
  "Ansiedad",
  "Depresión",
  "Estrés",
  "Ataques de pánico",
  "Baja autoestima",
  "Duelo",
  "Problemas de pareja",
  "Conflictos familiares",
  "Bullying",
  "Acoso laboral",
  "Adicciones",
  "Desarrollo infantil",
];
const psychologyCareTypes = [
  {
    title: "Consulta presencial",
    description:
      "Atención psicológica en consultorio para niños, adolescentes y adultos.",
    icon: Building2,
  },
  {
    title: "Consulta en línea",
    description:
      "Recibe atención desde cualquier lugar mediante videollamada.",
    icon: Laptop,
  },
  {
    title: "Terapia de pareja",
    description:
      "Espacio para fortalecer la comunicación y resolver conflictos en la relación.",
    icon: HeartHandshake,
  },
  {
    title: "Terapia familiar",
    description:
      "Acompañamiento para mejorar la convivencia y las relaciones familiares.",
    icon: Users,
  },
  {
    title: "Psicología infantil",
    description:
      "Atención especializada para niñas, niños y adolescentes.",
    icon: Baby,
  },
  {
    title: "Atención individual",
    description:
      "Sesiones personalizadas enfocadas en las necesidades de cada persona.",
    icon: User,
  },
];


export default function PsicologiaPage() {
  return (
    <main>
      <SpecialtyHero
        area="Salud Mental"
        areaHref="/areas_salud/salud_mental"
        title="Psicología"
        description="La salud emocional forma parte del bienestar integral. En SAVIA encontrarás profesionales verificados que pueden acompañarte en diferentes etapas de la vida, promoviendo el equilibrio emocional, el desarrollo personal y una mejor calidad de vida."
        location="La Piedad y la región"
      />
      <AboutSection
        badge="Conoce la especialidad"
        title="¿Qué es la Psicología?"
        description="La Psicología ayuda a comprender cómo pensamos, sentimos y actuamos. A través del acompañamiento profesional, las personas pueden desarrollar herramientas para afrontar los desafíos de la vida, fortalecer sus relaciones y cuidar su bienestar emocional."
        benefits={[
        "Favorece el bienestar emocional.",
        "Ayuda a comprender y gestionar las emociones.",
        "Fortalece las relaciones personales y familiares.",
        "Contribuye al desarrollo personal y la salud mental.",
  ]}
/>
      <WhenToVisit
        badge="Orientación"
        title="¿Cuándo puede ayudarte un psicólogo?"
        subtitle="Cada persona vive situaciones diferentes. Estas son algunas de las razones más comunes por las que muchas personas buscan apoyo psicológico."
        items={psychologyReasons}
/>
      <ConditionsSection
        badge="Áreas de atención"
        title="¿Qué problemas atiende un psicólogo?"
        subtitle="Los psicólogos pueden acompañar a personas que enfrentan diversas situaciones emocionales, conductuales y de desarrollo. Estos son algunos de los motivos más frecuentes de consulta."
        conditions={psychologyConditions}
/>
      <CareTypes
        badge="Modalidades de atención"
        title="¿Qué tipos de atención ofrece un psicólogo?"
        subtitle="Los profesionales de la Psicología pueden brindar diferentes modalidades de atención según las necesidades de cada persona."
        items={psychologyCareTypes}
/>
      <FeaturedSpecialists specialty="Psicología" />
      <SpecialtyCTA />
      
    </main>
  );
}