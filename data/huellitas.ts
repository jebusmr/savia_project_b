export type HuellitasBusinessType =
  | "veterinario"
  | "laboratorio"
  | "servicio"
  | "atencion";

export interface HuellitasBusiness {
  slug: string;
  type: HuellitasBusinessType;
  name: string;
  address: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  website: string;
  image?: string;
}

export const huellitasBusinesses: HuellitasBusiness[] = [
  {
    slug: "espacio-disponible",
    type: "veterinario",
    name: "Espacio disponible",
    address: "Tu negocio puede aparecer aquí",
    phone: "Contacto disponible próximamente",
    website: "Sitio web",
    image: "",
  },
  {
    slug: "laboratorio-prueba",
    type: "laboratorio",
    name: "Laboratorio de prueba",
    address: "Domicilio de prueba",
    phone: "352 000 0000",
    whatsapp: "352 000 0000",
    email: "contacto@ejemplo.com",
    website: "https://ejemplo.com",
    image: "",
  },
];