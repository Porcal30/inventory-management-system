import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  description: z.string().optional(),
  category_id: z.string().uuid("Invalid category ID"),
  supplier_id: z.string().uuid("Invalid supplier ID"),
  quantity: z.coerce.number().min(0, "Quantity cannot be negative"),
  price: z.coerce.number().min(0, "Price cannot be negative"),
  status: z.enum(["active", "inactive"]).optional()
});