import type { Specialist } from "@/types/specialist";

interface DatabaseSpecialist {
  id: string;
  firstName: string;
  lastName: string;
  title: string | null;
  email: string;
  phone: string | null;
  status: string;
  createdAt: Date | string;
  updatedAt: Date | string;

  specialistprofile?: {
    biography: string | null;
    yearsExperience: number | null;
    university: string | null;
    specialtySchool: string | null;
    certifications: string | null;
    awards: string | null;
    languages: string | null;
    approach: string | null;
    philosophy: string | null;
  } | null;

  specialisteducation: Array<{
    degree: string;
    institution: string;
    year: string | null;
    description: string | null;
  }>;

  specialistexperience: Array<{
    position: string;
    institution: string;
    startYear: string;
    endYear: string | null;
    current: boolean;
    description: string | null;
  }>;

  specialistcertification: Array<{
    name: string;
    organization: string;
    year: string;
    description: string | null;
  }>;

  specialistaward: Array<{
    name: string;
    organization: string | null;
    year: string | null;
    description: string | null;
  }>;

  specialistverification?: {
    professionalLicense: string | null;
    specialtyLicense: string | null;
    identityVerified: boolean;
    licenseVerified: boolean;
    specialtyVerified: boolean;
    documentsVerified: boolean;
    verificationStatus: string;
    verifiedAt: Date | string | null;
  } | null;

  specialty: Array<{
    name: string;
    shortName: string | null;
  }>;

  sociallink: Array<{
    platform: string;
    url: string;
  }>;

  specialistoffice: Array<{
    isPrimary: boolean;
    office: {
      name: string;
      phone: string | null;
      email: string | null;
      hasParking: boolean;
      issuesInvoice: boolean;
      acceptsCash: boolean;
      acceptsCard: boolean;
      acceptsTransfer: boolean;
      address: {
        street: string;
        exteriorNumber: string | null;
        interiorNumber: string | null;
        neighborhood: string | null;
        postalCode: string;
        city: string;
        state: string;
      };
    };
  }>;

  specialistservice: Array<{
    price: unknown;
    durationMinutes: number | null;
    service: {
      id: string;
      name: string;
      description: string | null;
      durationMinutes: number | null;
    };
  }>;

  specialistattentionarea: Array<{
  attentionarea: {
    id: string;
    name: string;
    slug: string;
    description: string | null;

    specialty: {
      id: string;
      name: string;
      slug: string;
    };
  };
}>;

  availability: Array<{
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    modality: string;
  }>;
}

function formatDate(
  value: Date | string | null | undefined
): string {
  if (!value) return "";

  return new Date(value).toISOString();
}

function formatAddress(
  address: DatabaseSpecialist["specialistoffice"][number]["office"]["address"]
): string {
  return [
    address.street,
    address.exteriorNumber,
    address.interiorNumber
      ? `Int. ${address.interiorNumber}`
      : null,
  ]
    .filter(Boolean)
    .join(" ");
}

function dayName(dayOfWeek: number): string {
  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  return days[dayOfWeek] ?? "";
}

export function transformSpecialist(
  specialist: DatabaseSpecialist
): Specialist {
  const primaryOffice =
    specialist.specialistoffice.find(
      (office) => office.isPrimary
    ) ?? specialist.specialistoffice[0];

  const primarySpecialty =
    specialist.specialty[0];

  const profile =
    specialist.specialistprofile;

  const verification =
    specialist.specialistverification;

  return {
    id: specialist.id,

    yearsExperience:
    profile?.yearsExperience ?? null,

    personalInfo: {
      firstName: specialist.firstName,
      lastName: specialist.lastName,
      title: specialist.title ?? "",
      specialty:
        primarySpecialty?.name ?? "",
      photo: "",
    },

    verification: {
      saviaVerified:
        verification?.verificationStatus ===
        "VERIFIED",

      verificationStatus:
        verification?.verificationStatus ?? "",

      professionalLicense:
        verification?.professionalLicense ?? "",

      specialtyCertificate:
        verification?.specialtyLicense ??
        undefined,

      lastVerified:
        verification?.verifiedAt
          ? formatDate(
              verification.verifiedAt
            )
          : "",

      checks: {
        identityVerified:
          verification?.identityVerified ??
          false,

        professionalLicenseVerified:
          verification?.licenseVerified ??
          false,

        specialtyVerified:
          verification?.specialtyVerified ??
          false,

        documentationReviewed:
          verification?.documentsVerified ??
          false,

        profileUpdated: true,
      },
    },

    biography: {
      about:
        profile?.biography ?? "",

      philosophy:
        profile?.philosophy ?? "",

      approach:
        profile?.approach ?? "",
    },

    consultation: {
      modalities: Array.from(
        new Set(
          specialist.availability.map(
            (item) => item.modality
          )
        )
      ),

      languages: profile?.languages
        ? profile.languages
            .split(",")
            .map(
              (language) =>
                language.trim()
            )
            .filter(Boolean)
        : [],

      attentionAreas:
        specialist.specialistattentionarea.map(
          (item) => item.attentionarea.name
        ),

      schedules:
        specialist.availability.map(
          (item) =>
            `${dayName(
              item.dayOfWeek
            )} ${item.startTime}–${item.endTime}`
        ),
    },

    education:
      specialist.specialisteducation.map(
        (education) => ({
          degree: education.degree,
          institution:
            education.institution,
          year: education.year ?? "",
          description:
            education.description ?? "",
        })
      ),

    experience:
      specialist.specialistexperience.map(
        (experience) => ({
          position: experience.position,
          institution:
            experience.institution,
          startYear:
            experience.startYear,
          endYear:
            experience.endYear ?? "",
          current:
            experience.current,
        })
      ),

    certifications:
      specialist.specialistcertification.map(
        (certification) => ({
          name: certification.name,
          organization:
            certification.organization,
          year: certification.year,
        })
      ),

    awards:
      specialist.specialistaward.map(
        (award) => ({
          name: award.name,
          organization:
            award.organization ?? "",
          year: award.year ?? "",
          description:
            award.description ?? "",
        })
      ),

    services:
      specialist.specialistservice.map(
        (item) => ({
          id: item.service.id,
          name: item.service.name,
          description:
            item.service.description ??
            "",

          price:
            item.price !== null &&
            item.price !== undefined
              ? String(item.price)
              : undefined,

          durationMinutes:
            item.durationMinutes ??
            item.service
              .durationMinutes ??
            undefined,
        })
      ),

    location: {
      officeName:
        primaryOffice?.office.name ??
        "",

      officeImage: "",

      address: primaryOffice
        ? formatAddress(
            primaryOffice.office.address
          )
        : "",

      neighborhood:
        primaryOffice?.office.address
          .neighborhood ?? "",

      city:
        primaryOffice?.office.address
          .city ?? "",

      state:
        primaryOffice?.office.address
          .state ?? "",

      zipCode:
        primaryOffice?.office.address
          .postalCode ?? "",

      phone:
        primaryOffice?.office.phone ??
        specialist.phone ??
        "",

      email:
        primaryOffice?.office.email ??
        specialist.email,

      schedule:
        specialist.availability.map(
          (item) =>
            `${dayName(
              item.dayOfWeek
            )} ${item.startTime}–${item.endTime}`
        ),

      mapsUrl: "",

      mapEmbedUrl: "",

      parking:
        primaryOffice?.office.hasParking ??
        false,

      issuesInvoice:
        primaryOffice?.office.issuesInvoice ??
        false,

      acceptsCash:
        primaryOffice?.office.acceptsCash ??
        false,

      acceptsCard:
        primaryOffice?.office.acceptsCard ??
        false,

      acceptsTransfer:
        primaryOffice?.office.acceptsTransfer ??
        false,

      wheelchairAccess: false,

      acceptsCards:
        primaryOffice?.office.acceptsCard ??
        false,
    },

    gallery: [],

    metadata: {
      createdAt:
        formatDate(
          specialist.createdAt
        ),

      updatedAt:
        formatDate(
          specialist.updatedAt
        ),
    },
  };
}