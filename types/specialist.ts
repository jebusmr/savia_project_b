// types/specialist.ts

export interface Specialist {
  id: string;

  yearsExperience: number | null;
  personalInfo: PersonalInfo;
  verification: Verification;
  biography: Biography;
  consultation: Consultation;
  education: Education[];
  experience: Experience[];
  certifications: Certification[];
  awards: Award[];
  services: Service[];
  location: Location;
  gallery: GalleryImage[];
  metadata: Metadata;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  title: string;
  specialty: string;
  subspecialty?: string;
  photo: string;
}

export interface Verification {
  saviaVerified: boolean;
  verificationStatus: string;

  professionalLicense: string;
  specialtyCertificate?: string;

  lastVerified: string;

  checks: {
    identityVerified: boolean;
    professionalLicenseVerified: boolean;
    specialtyVerified: boolean;
    documentationReviewed: boolean;
    profileUpdated: boolean;
  };
}

export interface Biography {
  about: string;
  philosophy: string;
  approach: string;
}

export interface Consultation {
  modalities: string[];
  languages: string[];
  attentionAreas: string[];
  schedules: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  description?: string;
}

export interface Experience {
  position: string;
  institution: string;
  startYear: string;
  endYear?: string;
  current: boolean;
}

export interface Certification {
  name: string;
  organization: string;
  year: string;
  description?: string;
}

export interface Award {
  name: string;
  organization?: string;
  year?: string;
  description?: string;
}

export interface Location {
  officeName: string;
  officeImage: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;

  phone: string;
  email: string;

  schedule: string[];

  mapsUrl: string;
  mapEmbedUrl: string;

  parking: boolean;
  issuesInvoice: boolean;
  acceptsCash: boolean;
  acceptsCard: boolean;
  acceptsTransfer: boolean;
  wheelchairAccess: boolean;
  acceptsCards: boolean;
}

export interface GalleryImage {
  id: string;
  image: string;
  description: string;
}

export interface Metadata {
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  price?: string;
  durationMinutes?: number;
}