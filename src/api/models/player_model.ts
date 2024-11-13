import { Player } from "@prisma/client";

export interface CreatePlayerDTO {
  username: string;
  gameId: string;
  accountId: string;
  rating?: number;
}

export type UpdatePlayerDTO = Pick<Player, "id"> & Partial<CreatePlayerDTO>;
