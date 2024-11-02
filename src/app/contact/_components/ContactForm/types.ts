import { z } from "zod";

export type ContactFormData = z.infer<typeof contactSchema>;

export const contactSchema = z.object({
  propertyId: z.string().optional(),
  name: z
    .string()
    .min(3, "el nombre debe tener al menos 3 caracteres")
    .max(60, "el nombre no puede tener mas de 60 caracteres"),
  email: z.string().email("el formato de email es incorrecto"),
  phone: z
    .string()
    .min(12, "el teléfono debe tener al menos 12 caracteres")
    .optional()
    .or(z.literal("54")),
});
