import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../functions/cn";
import { createMessage } from "../../../http/create-message";
import {
  createMessageSchema,
  type CreateMessageSchema,
} from "../../../types/schemas/create-message-schema";

export function CreateMessageForm() {
  const { roomId } = useParams();

  if (!roomId) {
    throw new Error("Messages components must be used within room page.");
  }

  const { handleSubmit, register, reset } = useForm<CreateMessageSchema>({
    resolver: zodResolver(createMessageSchema),
  });

  const { mutateAsync } = createMessage(roomId);

  async function handleCreateMessage(data: CreateMessageSchema) {
    await mutateAsync(data);

    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateMessage)}
      className={cn(
        "flex items-center gap-2 rounded-xl border border-primary-200 bg-primary-100 p-2 transition-all dark:border-primary-800 dark:bg-primary-900",
        "focus-within:ring-1 focus-within:ring-secondary-600 focus-within:ring-offset-2 focus-within:ring-offset-primary-50 dark:focus-within:ring-secondary-400 dark:focus-within:ring-offset-primary-950",
      )}
    >
      <input
        type="text"
        placeholder="Qual a sua pergunta?"
        autoComplete="off"
        className="mx-2 flex-1 bg-transparent text-sm text-primary-900 outline-none placeholder:text-primary-500 dark:text-primary-100"
        required
        {...register("message")}
      />
      <Button type="submit">
        Criar pergunta
        <ArrowRight className="size-4" />
      </Button>
    </form>
  );
}
