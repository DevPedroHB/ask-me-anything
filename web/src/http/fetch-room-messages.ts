import { useQuery } from "@tanstack/react-query";
import { api } from "../libs/ky";
import type { Message } from "../types/message";

export function fetchRoomMessages(roomId: string) {
  const query = useQuery({
    queryKey: ["messages", roomId],
    queryFn: async () => {
      try {
        const result = await api(`api/rooms/${roomId}/messages`).json<
          Message[]
        >();

        return result;
      } catch (error) {
        throw error;
      }
    },
  });

  return query;
}
