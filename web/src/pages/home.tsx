import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { cn } from "../functions/cn";
import { createRoom } from "../http/create-room";
import {
  createThemeSchema,
  type CreateThemeSchema,
} from "../types/schemas/create-theme-schema";

export function Home() {
  const navigate = useNavigate();
  const { mutateAsync } = createRoom();

  const { handleSubmit, register } = useForm<CreateThemeSchema>({
    resolver: zodResolver(createThemeSchema),
  });

  async function handleCreateTheme(data: CreateThemeSchema) {
    const { id } = await mutateAsync(data);

    navigate(`/room/${id}`);
  }

  return (
    <main className="flex h-screen items-center justify-center px-4">
      <div className="flex max-w-[28.125rem] flex-col gap-6">
        <img src="/svgs/logo.svg" alt="Ask me anything" className="h-10" />
        <p className="text-center leading-relaxed text-primary-700 dark:text-primary-300">
          Crie uma sala pública de AMA (Ask me anything) e priorize as perguntas
          mais importantes para a comunidade.
        </p>
        <form
          onSubmit={handleSubmit(handleCreateTheme)}
          className={cn(
            "flex items-center gap-2 rounded-xl border border-primary-200 bg-primary-100 p-2 transition-all dark:border-primary-800 dark:bg-primary-900",
            "focus-within:ring-1 focus-within:ring-secondary-600 focus-within:ring-offset-2 focus-within:ring-offset-primary-50 dark:focus-within:ring-secondary-400 dark:focus-within:ring-offset-primary-950",
          )}
        >
          <input
            type="text"
            placeholder="Nome da sala"
            autoComplete="off"
            className="mx-2 flex-1 bg-transparent text-sm text-primary-900 outline-none placeholder:text-primary-500 dark:text-primary-100"
            required
            {...register("theme")}
          />
          <Button type="submit">
            Criar sala
            <ArrowRight className="size-4" />
          </Button>
        </form>
      </div>
    </main>
  );
}
