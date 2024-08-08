import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { reactToMessage } from "../../../http/react-to-message";
import { removeReactFromMessage } from "../../../http/remove-react-from-message";
import type { Message } from "../../../types/message";
import { LikeMessageButton } from "./like-message-button";

interface IMessage {
  message: Message;
}

export function RoomMessages({ message }: IMessage) {
  const { roomId } = useParams();

  if (!roomId) {
    throw new Error("Messages components must be used within room page.");
  }

  const [hasReacted, setHasReacted] = useState(message.answered);
  const { mutateAsync: react } = reactToMessage(roomId, message.id);
  const { mutateAsync: removeReact } = removeReactFromMessage(
    roomId,
    message.id,
  );

  async function handleReactToMessage() {
    if (hasReacted) {
      await removeReact();
    } else {
      await react();
    }

    setHasReacted((prev) => !prev);
  }

  return (
    <li
      data-answered={message.answered}
      className="ml-4 leading-relaxed text-primary-900 data-[answered=true]:opacity-50 dark:text-primary-100"
    >
      {message.message}
      <LikeMessageButton
        type="button"
        variant={hasReacted ? "primary" : "secondary"}
        onClick={handleReactToMessage}
        disabled={message.answered}
      >
        <ArrowUp className="size-4" />
        Curtir pergunta ({message.reaction_count})
      </LikeMessageButton>
    </li>
  );
}
