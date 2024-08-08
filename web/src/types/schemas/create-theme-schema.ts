import { z } from "zod";

export const createThemeSchema = z.object({
  theme: z.string().min(3, "A consulta deve ter pelo menos 3 caracteres."),
});

export type CreateThemeSchema = z.infer<typeof createThemeSchema>;
