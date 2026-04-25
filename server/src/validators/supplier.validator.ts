import { z } from "zod";

export const supplierSchema = z.object({
  name: z.string().min(2, "Supplier name is required"),
  contact_person: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  address: z.string().optional()
});