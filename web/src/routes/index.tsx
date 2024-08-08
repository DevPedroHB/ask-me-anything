import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { cn } from "../functions/cn";
import {
  createThemeSchema,
  type CreateThemeSchema,
} from "../types/schemas/create-theme-schema";

export const Route = createFileRoute("/")({
  component: function Home() {
    const navigate = Route.useNavigate();
    const { handleSubmit, register } = useForm<CreateThemeSchema>({
      resolver: zodResolver(createThemeSchema),
    });

    function handleCreateTheme(data: CreateThemeSchema) {
      // TODO: Make function convert string to id.

      navigate({
        to: "/room/$roomId",
        params: {
          roomId: data.theme,
        },
      });
    }

    return (
      <main className="flex h-screen items-center justify-center px-4">
        <div className="flex max-w-[28.125rem] flex-col gap-6">
          <img src="/svgs/logo.svg" alt="Ask me anything" className="h-10" />
          <p className="text-primary-700 dark:text-primary-300 text-center leading-relaxed">
            Crie uma sala pública de AMA (Ask me anything) e priorize as
            perguntas mais importantes para a comunidade.
          </p>
          <form
            onSubmit={handleSubmit(handleCreateTheme)}
            className={cn(
              "bg-primary-100 border-primary-200 dark:bg-primary-900 dark:border-primary-800 flex items-center gap-2 rounded-xl border p-2 transition-all",
              "focus-within:ring-offset-primary-50 dark:focus-within:ring-offset-primary-950 dark:focus-within:ring-secondary-400 focus-within:ring-secondary-600 focus-within:ring-1 focus-within:ring-offset-2",
            )}
          >
            <input
              type="text"
              placeholder="Nome da sala"
              autoComplete="off"
              className="dark:text-primary-100 text-primary-900 placeholder:text-primary-500 mx-2 flex-1 bg-transparent text-sm outline-none"
              {...register("theme")}
              required
            />
            <Button type="submit">
              Criar sala
              <ArrowRight className="size-4" />
            </Button>
          </form>
        </div>
      </main>
    );
  },
});
