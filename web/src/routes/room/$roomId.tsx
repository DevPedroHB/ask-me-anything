import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Message as MessageComponent } from "../../components/message";
import { Button } from "../../components/ui/button";
import { cn } from "../../functions/cn";
import { fetchRoomMessages } from "../../http/fetch-room-messages";

export const Route = createFileRoute("/room/$roomId")({
  component: function Room() {
    const { roomId } = Route.useParams();
    const { data } = fetchRoomMessages(roomId);

    function handleShareRoom() {
      const url = window.location.href.toString();

      if (navigator.share !== undefined && navigator.canShare()) {
        navigator.share({ url });
      } else {
        navigator.clipboard.writeText(url);

        toast.info("The room URL was copied to your clipboard.");
      }
    }

    return (
      <main className="mx-auto flex max-w-[40rem] flex-col gap-6 px-4 py-10">
        <div className="flex items-center gap-3 px-3">
          <img src="/svgs/logo.svg" alt="Ask me anything" className="h-5" />
          <span className="truncate text-sm text-primary-500">
            Código da sala:{" "}
            <span className="text-primary-700 dark:text-primary-300">
              {roomId}
            </span>
          </span>
          <Button
            type="button"
            variant="secondary"
            onClick={handleShareRoom}
            className="ml-auto"
          >
            Compartilhar
            <Share2 className="size-4" />
          </Button>
        </div>
        <div className="h-px w-full bg-primary-100 dark:bg-primary-900" />
        <form
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
          />
          <Button type="submit">
            Criar pergunta
            <ArrowRight className="size-4" />
          </Button>
        </form>
        <ol className="list-outside list-decimal space-y-8 px-3">
          {data?.map((message) => {
            return <MessageComponent key={message.id} message={message} />;
          })}
        </ol>
      </main>
    );
  },
});
