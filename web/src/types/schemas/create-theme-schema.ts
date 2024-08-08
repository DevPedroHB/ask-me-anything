import { z } from "zod";

export const createThemeSchema = z.object({
  theme: z.string().min(3, "O tema deve ter pelo menos 3 caracteres."),
});

export type CreateThemeSchema = z.infer<typeof createThemeSchema>;
