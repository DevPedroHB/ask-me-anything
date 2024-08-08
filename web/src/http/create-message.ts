import { useMutation } from "@tanstack/react-query";
import { api } from "../libs/ky";
import type { CreateMessageSchema } from "../types/schemas/create-message-schema";

interface ICreateMessageResponse {
  id: string;
}

export function createMessage(roomId: string) {
  const mutation = useMutation({
    mutationKey: ["create-message"],
    mutationFn: async (data: CreateMessageSchema) => {
      try {
        const result = await api
          .post(`api/rooms/${roomId}/messages`, {
            json: data,
          })
          .json<ICreateMessageResponse>();

        return result;
      } catch (error) {
        throw error;
      }
    },
  });

  return mutation;
}
