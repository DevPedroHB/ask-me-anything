import { useMutation } from "@tanstack/react-query";
import { api } from "../libs/ky";
import type { CreateThemeSchema } from "../types/schemas/create-theme-schema";

interface ICreateRoomResponse {
  id: string;
}

export function createRoom() {
  const mutation = useMutation({
    mutationKey: ["create-room"],
    mutationFn: async (data: CreateThemeSchema) => {
      try {
        const result = await api
          .post("api/rooms", {
            json: data,
          })
          .json<ICreateRoomResponse>();

        return result;
      } catch (error) {
        throw error;
      }
    },
  });

  return mutation;
}
