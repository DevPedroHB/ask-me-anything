import { Share2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { useMessagesWebSockets } from "../../hooks/use-messages-web-sockets";
import { fetchRoomMessages } from "../../http/fetch-room-messages";
import { CreateMessageForm } from "./components/create-message-form";
import { RoomMessages } from "./components/room-messages";

export function Room() {
  const { roomId } = useParams();

  if (!roomId) {
    throw new Error("Messages components must be used within room page.");
  }

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

  useMessagesWebSockets({ roomId });

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
      <CreateMessageForm />
      <ol className="list-outside list-decimal space-y-8 px-3">
        {data?.messages.map((message) => {
          return <RoomMessages key={message.id} message={message} />;
        })}
      </ol>
    </main>
  );
}
