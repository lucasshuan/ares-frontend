import { Clan } from "@prisma/client";

export type CreateClanDTO = Pick<
  Clan,
  "name" | "region" | "description" | "gameId" | "ownerId"
>;

export type UpdateClanDTO = Pick<Clan, "id"> & Partial<CreateClanDTO>;

export interface ListClansDTO {
  game: {
    id: string;
  };
  skip?: number;
  take?: number;
  order?: "asc" | "desc";
}
