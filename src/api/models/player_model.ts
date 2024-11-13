import { Player, Region } from "@prisma/client";

export interface ListPlayersDTO {
  username?: string;
  game?: {
    name?: string;
  };
  account?: {
    region?: Region;
    country?: string;
  };
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
