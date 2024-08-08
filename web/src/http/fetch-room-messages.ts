import { useQuery } from "@tanstack/react-query";
import { sortBy } from "../functions/sort-by";
import { api } from "../libs/ky";
import type { Message } from "../types/message";

export interface IFetchRoomMessagesResponse {
  messages: Message[];
}

export function fetchRoomMessages(roomId: string) {
  const query = useQuery({
    queryKey: ["room-messages", roomId],
    queryFn: async () => {
      try {
        const result = await api
          .get(`api/rooms/${roomId}/messages`)
          .json<Message[]>();

        return {
          messages: sortBy(result, "reaction_count", "desc"),
        };
      } catch (error) {
        throw error;
      }
    },
  });

  return query;
}
