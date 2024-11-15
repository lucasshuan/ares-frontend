import { Player, Prisma, Region } from "@prisma/client";

export interface ListPlayersDTO {
  username?: string;
  gameName?: string;
  region?: Region;
  country?: string;
  order?: Prisma.SortOrder;
  skip?: number;
  take?: number;
}

export interface CreatePlayerDTO {
  username: string;
  gameId: string;
  accountId: string;
  rating?: number;
}

export type UpdatePlayerDTO = Pick<Player, "id"> & Partial<CreatePlayerDTO>;
