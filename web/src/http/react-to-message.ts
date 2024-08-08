import { useMutation } from "@tanstack/react-query";
import { api } from "../libs/ky";

interface IReactToMessageResponse {
  count: number;
}

export function reactToMessage(roomId: string, messageId: string) {
  const mutation = useMutation({
    mutationKey: ["react-message", roomId, messageId],
    mutationFn: async () => {
      try {
        const result = await api
          .patch(`api/rooms/${roomId}/messages/${messageId}/react`)
          .json<IReactToMessageResponse>();

        return result;
      } catch (error) {
        throw error;
      }
    },
  });

  return mutation;
}
