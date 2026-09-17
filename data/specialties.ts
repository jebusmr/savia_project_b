/**
 * SAVIA
 * Catálogo maestro inicial de especialidades.
 *
 * Este archivo centraliza las especialidades oficiales utilizadas
 * por la plataforma.
 *
 * IMPORTANTE:
 * - Evitar crear especialidades directamente con nombres diferentes.
 * - Los nombres aquí definidos funcionan como referencia oficial.
 * - Las áreas de atención se relacionan posteriormente con cada especialidad.
 *
 * Ejemplo:
 *
 * Cardiología
 * └── Hipertensión arterial
 * └── Arritmias cardíacas
 * └── Insuficiencia cardíaca
 */

export interface SpecialtyCatalogItem {
  name: string;
  slug: string;
  shortName: string;
  description: string;
  icon: string;
  color: string;
  order: number;
}

export const specialtiesCatalog: SpecialtyCatalogItem[] = [
  {
    name: "Medicina General",
    slug: "medicina-general",
    shortName: "Medicina General",
    description:
      "Atención médica integral enfocada en la prevención, diagnóstico y tratamiento de problemas de salud comunes.",
    icon: "Stethoscope",
    color: "emerald",
    order: 1,
  },

  {
    name: "Medicina Interna",
    slug: "medicina-interna",
    shortName: "Medicina Interna",
    description:
      "Especialidad médica dedicada a la prevención, diagnóstico y tratamiento integral de enfermedades en personas adultas.",
    icon: "HeartHandshake",
    color: "blue",
    order: 2,
  },

  {
    name: "Cardiología",
    slug: "cardiologia",
    shortName: "Cardiología",
    description:
      "Especialidad médica dedicada a la prevención, diagnóstico y tratamiento de enfermedades del corazón y del sistema cardiovascular.",
    icon: "HeartPulse",
    color: "emerald",
    order: 3,
  },

  {
    name: "Dermatología",
    slug: "dermatologia",
    shortName: "Dermatología",
    description:
      "Especialidad médica dedicada al diagnóstico y tratamiento de enfermedades de la piel, cabello y uñas.",
    icon: "ScanFace",
    color: "rose",
    order: 4,
  },

  {
    name: "Gastroenterología",
    slug: "gastroenterologia",
    shortName: "Gastroenterología",
    description:
      "Especialidad médica enfocada en el diagnóstico y tratamiento de enfermedades del aparato digestivo.",
    icon: "Pill",
    color: "orange",
    order: 5,
  },

  {
    name: "Ginecología y Obstetricia",
    slug: "ginecologia-obstetricia",
    shortName: "Ginecología",
    description:
      "Especialidad médica enfocada en la salud reproductiva y la atención integral de la mujer.",
    icon: "Baby",
    color: "pink",
    order: 6,
  },

  {
    name: "Nefrología",
    slug: "nefrologia",
    shortName: "Nefrología",
    description:
      "Especialidad médica dedicada a la prevención, diagnóstico y tratamiento de enfermedades renales.",
    icon: "Activity",
    color: "cyan",
    order: 7,
  },

  {
    name: "Oftalmología",
    slug: "oftalmologia",
    shortName: "Oftalmología",
    description:
      "Especialidad médica dedicada al cuidado, diagnóstico y tratamiento de enfermedades de los ojos y la visión.",
    icon: "Eye",
    color: "sky",
    order: 8,
  },

  {
    name: "Otorrinolaringología",
    slug: "otorrinolaringologia",
    shortName: "Otorrino",
    description:
      "Especialidad médica dedicada al diagnóstico y tratamiento de enfermedades del oído, nariz y garganta.",
    icon: "Ear",
    color: "violet",
    order: 9,
  },

  {
    name: "Pediatría",
    slug: "pediatria",
    shortName: "Pediatría",
    description:
      "Especialidad médica dedicada a la atención integral de la salud de niñas, niños y adolescentes.",
    icon: "Baby",
    color: "yellow",
    order: 10,
  },

  {
    name: "Psiquiatría",
    slug: "psiquiatria",
    shortName: "Psiquiatría",
    description:
      "Especialidad médica enfocada en la prevención, diagnóstico y tratamiento de trastornos de la salud mental.",
    icon: "Brain",
    color: "purple",
    order: 11,
  },

  {
    name: "Traumatología y Ortopedia",
    slug: "traumatologia-ortopedia",
    shortName: "Traumatología",
    description:
      "Especialidad médica dedicada al diagnóstico y tratamiento de lesiones y enfermedades del sistema musculoesquelético.",
    icon: "Bone",
    color: "amber",
    order: 12,
  },

  {
    name: "Urología",
    slug: "urologia",
    shortName: "Urología",
    description:
      "Especialidad médica dedicada al diagnóstico y tratamiento de enfermedades del aparato urinario y reproductor masculino.",
    icon: "CircleDot",
    color: "indigo",
    order: 13,
  },

  {
    name: "Anestesiología",
    slug: "anestesiologia",
    shortName: "Anestesiología",
    description:
      "Especialidad médica encargada de la valoración y atención anestésica durante procedimientos quirúrgicos.",
    icon: "Syringe",
    color: "slate",
    order: 14,
  },

  {
    name: "Cirugía General",
    slug: "cirugia-general",
    shortName: "Cirugía General",
    description:
      "Especialidad médica dedicada al diagnóstico y tratamiento quirúrgico de diversas enfermedades.",
    icon: "Scissors",
    color: "red",
    order: 15,
  },

  {
    name: "Cirugía Maxilofacial",
    slug: "cirugia-maxilofacial",
    shortName: "Maxilofacial",
    description:
      "Especialidad enfocada en el diagnóstico y tratamiento quirúrgico de enfermedades y lesiones de la región facial y maxilar.",
    icon: "SmilePlus",
    color: "orange",
    order: 16,
  },

  {
    name: "Radiología e Imagen",
    slug: "radiologia-imagen",
    shortName: "Radiología",
    description:
      "Especialidad médica dedicada al diagnóstico mediante estudios de imagen.",
    icon: "Scan",
    color: "blue",
    order: 17,
  },

  {
    name: "Nutrición",
    slug: "nutricion",
    shortName: "Nutrición",
    description:
      "Profesión de la salud enfocada en la alimentación, nutrición y promoción de hábitos saludables.",
    icon: "Apple",
    color: "green",
    order: 18,
  },

  {
    name: "Odontología",
    slug: "odontologia",
    shortName: "Odontología",
    description:
      "Profesión de la salud dedicada a la prevención, diagnóstico y tratamiento de problemas relacionados con la salud bucal.",
    icon: "Tooth",
    color: "cyan",
    order: 19,
  },

  {
    name: "Química Farmacéutica Biológica",
    slug: "quimica-farmaceutica-biologica",
    shortName: "QFB",
    description:
      "Profesión relacionada con el laboratorio clínico, análisis, control de calidad y servicios farmacéuticos.",
    icon: "FlaskConical",
    color: "teal",
    order: 20,
  },
];