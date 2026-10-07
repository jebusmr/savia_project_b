// data/specialists.ts

import { Specialist } from "@/types/specialist";

export const specialists: Specialist[] = [
  {
    id: "psych-001",
    yearsExperience: null,

    personalInfo: {
      firstName: "María",
      lastName: "González López",
      title: "Dra.",
      specialty: "Psicología Clínica",
      subspecialty: "Terapia Cognitivo-Conductual",
      photo: "/images/specialists/maria-gonzalez.jpg",
    },

verification: {
  saviaVerified: true,
  verificationStatus: "VERIFIED",
  
  professionalLicense: "12345678",
  specialtyCertificate: "ESP-PSI-2024",
  lastVerified: "2026-07-28",

  checks: {
    identityVerified: true,
    professionalLicenseVerified: true,
    specialtyVerified: true,
    documentationReviewed: true,
    profileUpdated: true,
  },
},

    biography: {
      about:
        "Psicóloga clínica con más de 12 años de experiencia en el acompañamiento de adolescentes y adultos. Mi objetivo es brindar un espacio seguro y profesional para favorecer el bienestar emocional y el crecimiento personal.",

      philosophy:
        "Creo en una atención cercana, basada en evidencia científica y centrada en las necesidades individuales de cada persona.",
    
      approach:
          "Trabajo desde un enfoque integral y personalizado, adaptando las estrategias de intervención a las necesidades y objetivos de cada persona.",
    
    },

    consultation: {
      modalities: ["Presencial", "En línea"],

      languages: ["Español", "Inglés"],

      attentionAreas: [
        "Ansiedad",
        "Depresión",
        "Estrés",
        "Duelo",
        "Terapia Familiar",
      ],

      schedules: [
        "Lunes a Viernes · 9:00–18:00",
        "Sábado · 9:00–13:00",
      ],
    },

    education: [
      {
        degree: "Licenciatura en Psicología",
        institution: "Universidad de Guadalajara",
        year: "2010",
      },
      {
        degree: "Maestría en Psicología Clínica",
        institution: "Universidad Nacional Autónoma de México",
        year: "2013",
      },
    ],

    experience: [
      {
        position: "Psicóloga Clínica",
        institution: "Consulta Privada",
        startYear: "2014",
        current: true,
      },
      {
        position: "Psicóloga",
        institution: "Hospital Regional",
        startYear: "2011",
        endYear: "2014",
        current: false,
      },
    ],

    certifications: [
      {
        name: "Terapia Cognitivo-Conductual",
        organization: "Asociación Mexicana de Psicoterapia",
        year: "2018",
      },
      {
        name: "Intervención en Crisis",
        organization: "Colegio de Psicólogos",
        year: "2022",
      },
    ],

    awards: [],

    services: [],

    location: {
  officeName: "Consultorio Psicológico Integral",

  officeImage: "/images/offices/consultorio-01.jpg",

  address: "Av. Hidalgo 145",

  neighborhood: "Centro",

  city: "La Piedad",

  state: "Michoacán",

  zipCode: "59300",

  phone: "+52 352 123 4567",

  email: "contacto@ejemplo.com",

  schedule: [
    "Lunes a Viernes · 09:00–18:00",
    "Sábado · 09:00–13:00",
  ],

  mapsUrl:
    "https://maps.google.com",

  mapEmbedUrl:
    "https://www.google.com/maps/embed?...",

  parking: true,
  issuesInvoice: true,
  acceptsCash: true,
  acceptsCard: true,
  acceptsTransfer: true,
  wheelchairAccess: true,
  acceptsCards: true,
},

    gallery: [
      {
        id: "1",
        image: "/images/specialists/consultorio-1.jpg",
        description: "Consultorio principal",
      },
      {
        id: "2",
        image: "/images/specialists/consultorio-2.jpg",
        description: "Sala de espera",
      },
    ],

    metadata: {
      createdAt: "2026-07-28",
      updatedAt: "2026-07-28",
    },
  },
];