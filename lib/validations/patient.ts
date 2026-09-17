import { z } from "zod";

export const patientSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(50, "El nombre es demasiado largo."),

  lastName: z
    .string()
    .trim()
    .min(2, "Los apellidos deben tener al menos 2 caracteres.")
    .max(80, "Los apellidos son demasiado largos."),

  email: z
    .string()
    .trim()
    .email("Ingresa un correo electrónico válido."),

  phone: z
    .string()
    .trim()
    .regex(
      /^[0-9]{10}$/,
      "El teléfono debe contener exactamente 10 dígitos."
    ),
});

export type PatientFormData = z.infer<typeof patientSchema>;