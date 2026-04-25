import { z } from "zod";

export const stockTransactionSchema = z.object({
  product_id: z.string().uuid("Invalid product ID"),
  type: z.enum(["stock-in", "stock-out"]),
  quantity: z.coerce.number().min(1, "Quantity must be greater than 0"),
  remarks: z.string().optional()
});