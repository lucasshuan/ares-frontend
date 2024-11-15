import { Clan, Prisma } from "@prisma/client";

export type CreateClanDTO = Pick<
  Clan,
  "name" | "region" | "description" | "gameId" | "ownerId"
>;

export type UpdateClanDTO = Pick<Clan, "id"> & Partial<CreateClanDTO>;

export interface ListClansDTO {
  gameId?: string;
  gameName?: string;
  order?: Prisma.SortOrder;
  skip?: number;
  take?: number;
}
