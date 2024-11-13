import { Match, Region } from "@prisma/client";

export type CreateMatchDTO = {
  region: Region;
  gameId: string;
  accepted?: boolean;
  screenshotUrl?: string;
  youtubeVideoUrl?: string;
};

export type UpdateMatchDTO = Pick<Match, "id"> & Partial<CreateMatchDTO>;
