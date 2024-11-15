import { Player, Region } from "@prisma/client";

export interface ListPlayersDTO {
  username?: string;
  gameName?: string;
  region?: Region;
  country?: string;
  skip?: number;
  take?: number;
  order?: "asc" | "desc";
}

export interface CreatePlayerDTO {
  username: string;
  gameId: string;
  accountId: string;
  rating?: number;
}

export type UpdatePlayerDTO = Pick<Player, "id"> & Partial<CreatePlayerDTO>;
