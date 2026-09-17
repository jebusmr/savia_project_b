// data/attention-areas.ts

export interface AttentionAreaSeed {
  specialtySlug: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
}

export const attentionAreas: AttentionAreaSeed[] = [
  //
  // MEDICINA GENERAL
  //

  {
    specialtySlug: "medicina-general",
    name: "Consulta médica general",
    slug: "consulta-medica-general",
    description:
      "Atención médica integral para la valoración, diagnóstico y tratamiento de problemas de salud comunes.",
    order: 1,
  },

  {
    specialtySlug: "medicina-general",
    name: "Prevención y chequeos médicos",
    slug: "prevencion-chequeos-medicos",
    description:
      "Evaluación preventiva de la salud y detección oportuna de factores de riesgo.",
    order: 2,
  },

  {
    specialtySlug: "medicina-general",
    name: "Enfermedades respiratorias",
    slug: "enfermedades-respiratorias",
    description:
      "Valoración y atención de problemas respiratorios frecuentes.",
    order: 3,
  },

  {
    specialtySlug: "medicina-general",
    name: "Enfermedades gastrointestinales comunes",
    slug: "enfermedades-gastrointestinales-comunes",
    description:
      "Atención de molestias y enfermedades frecuentes del aparato digestivo.",
    order: 4,
  },

  {
    specialtySlug: "medicina-general",
    name: "Control de enfermedades crónicas",
    slug: "control-enfermedades-cronicas",
    description:
      "Seguimiento médico de enfermedades crónicas y factores de riesgo.",
    order: 5,
  },

  //
  // MEDICINA INTERNA
  //

  {
    specialtySlug: "medicina-interna",
    name: "Enfermedades crónicas del adulto",
    slug: "enfermedades-cronicas-adulto",
    description:
      "Diagnóstico y seguimiento integral de enfermedades crónicas en personas adultas.",
    order: 1,
  },

  {
    specialtySlug: "medicina-interna",
    name: "Diabetes",
    slug: "diabetes",
    description:
      "Valoración, diagnóstico y seguimiento integral de personas con diabetes.",
    order: 2,
  },

  {
    specialtySlug: "medicina-interna",
    name: "Hipertensión arterial",
    slug: "hipertension-arterial",
    description:
      "Diagnóstico, tratamiento y control de la presión arterial.",
    order: 3,
  },

  {
    specialtySlug: "medicina-interna",
    name: "Enfermedades metabólicas",
    slug: "enfermedades-metabolicas",
    description:
      "Atención de alteraciones metabólicas y sus factores asociados.",
    order: 4,
  },

  //
  // CARDIOLOGÍA
  //

  {
    specialtySlug: "cardiologia",
    name: "Hipertensión arterial",
    slug: "hipertension-arterial",
    description:
      "Diagnóstico, tratamiento y seguimiento de la presión arterial elevada.",
    order: 1,
  },

  {
    specialtySlug: "cardiologia",
    name: "Arritmias cardiacas",
    slug: "arritmias-cardiacas",
    description:
      "Valoración y atención de alteraciones del ritmo del corazón.",
    order: 2,
  },

  {
    specialtySlug: "cardiologia",
    name: "Insuficiencia cardiaca",
    slug: "insuficiencia-cardiaca",
    description:
      "Diagnóstico y seguimiento de enfermedades relacionadas con la función del corazón.",
    order: 3,
  },

  {
    specialtySlug: "cardiologia",
    name: "Prevención cardiovascular",
    slug: "prevencion-cardiovascular",
    description:
      "Evaluación de factores de riesgo para enfermedades cardiovasculares.",
    order: 4,
  },

  {
    specialtySlug: "cardiologia",
    name: "Dolor en el pecho",
    slug: "dolor-en-el-pecho",
    description:
      "Valoración médica especializada de molestias y dolor torácico.",
    order: 5,
  },

  //
  // DERMATOLOGÍA
  //

  {
    specialtySlug: "dermatologia",
    name: "Acné",
    slug: "acne",
    description:
      "Diagnóstico y tratamiento especializado del acné.",
    order: 1,
  },

  {
    specialtySlug: "dermatologia",
    name: "Enfermedades de la piel",
    slug: "enfermedades-piel",
    description:
      "Diagnóstico y tratamiento de enfermedades dermatológicas.",
    order: 2,
  },

  {
    specialtySlug: "dermatologia",
    name: "Problemas del cabello",
    slug: "problemas-cabello",
    description:
      "Valoración de alteraciones relacionadas con el cabello y cuero cabelludo.",
    order: 3,
  },

  {
    specialtySlug: "dermatologia",
    name: "Problemas de las uñas",
    slug: "problemas-unas",
    description:
      "Diagnóstico y atención de enfermedades y alteraciones de las uñas.",
    order: 4,
  },

  {
    specialtySlug: "dermatologia",
    name: "Revisión de lunares y lesiones",
    slug: "revision-lunares-lesiones",
    description:
      "Valoración dermatológica de lunares y otras lesiones de la piel.",
    order: 5,
  },

  //
  // GASTROENTEROLOGÍA
  //

  {
    specialtySlug: "gastroenterologia",
    name: "Reflujo gastroesofágico",
    slug: "reflujo-gastroesofagico",
    description:
      "Diagnóstico y tratamiento de síntomas relacionados con el reflujo.",
    order: 1,
  },

  {
    specialtySlug: "gastroenterologia",
    name: "Gastritis y problemas estomacales",
    slug: "gastritis-problemas-estomacales",
    description:
      "Atención de molestias y enfermedades relacionadas con el estómago.",
    order: 2,
  },

  {
    specialtySlug: "gastroenterologia",
    name: "Síndrome de intestino irritable",
    slug: "sindrome-intestino-irritable",
    description:
      "Valoración y tratamiento de trastornos funcionales intestinales.",
    order: 3,
  },

  {
    specialtySlug: "gastroenterologia",
    name: "Enfermedades del hígado",
    slug: "enfermedades-higado",
    description:
      "Diagnóstico y seguimiento de enfermedades hepáticas.",
    order: 4,
  },

  {
    specialtySlug: "gastroenterologia",
    name: "Endoscopia digestiva",
    slug: "endoscopia-digestiva",
    description:
      "Procedimientos y valoración relacionados con estudios endoscópicos del aparato digestivo.",
    order: 5,
  },
];