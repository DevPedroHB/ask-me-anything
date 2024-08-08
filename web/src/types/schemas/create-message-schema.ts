import { z } from "zod";

export const createMessageSchema = z.object({
  message: z.string().min(3, "A mensagem deve ter pelo menos 3 caracteres."),
});

export type CreateMessageSchema = z.infer<typeof createMessageSchema>;
