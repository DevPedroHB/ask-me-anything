import { useMutation } from "@tanstack/react-query";
import { api } from "../libs/ky";

interface IRemoveReactFromMessageResponse {
  count: number;
}

export function removeReactFromMessage(roomId: string, messageId: string) {
  const mutation = useMutation({
    mutationKey: ["remove-react-message", roomId, messageId],
    mutationFn: async () => {
      try {
        const result = await api
          .delete(`api/rooms/${roomId}/messages/${messageId}/react`)
          .json<IRemoveReactFromMessageResponse>();

        return result;
      } catch (error) {
        throw error;
      }
    },
  });

  return mutation;
}
