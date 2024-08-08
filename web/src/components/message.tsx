import { ArrowUp } from "lucide-react";
import { useState } from "react";
import type { Message } from "../types/message";
import { LikeQuestionButton } from "./ui/like-question-button";

interface IMessage {
  message: Message;
}

export function Message({ message }: IMessage) {
  const [hasReacted, setHasReacted] = useState(message.answered);

  function handleReactToMessage() {
    setHasReacted((prev) => !prev);
  }

  return (
    <li
      data-answered={message.answered}
      className="ml-4 leading-relaxed text-primary-900 data-[answered=true]:opacity-50 dark:text-primary-100"
    >
      {message.message}
      <LikeQuestionButton
        type="button"
        variant={hasReacted ? "primary" : "secondary"}
        onClick={handleReactToMessage}
        disabled={message.answered}
      >
        <ArrowUp className="size-4" />
        Curtir pergunta ({message.reaction_count})
      </LikeQuestionButton>
    </li>
  );
}
