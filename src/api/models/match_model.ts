import { Match, MatchStatus, Region } from "@prisma/client";

export type CreateMatchDTO = {
  region: Region;
  gameId: string;
  status?: MatchStatus;
  accepted?: boolean;
  screenshotUrl?: string;
  youtubeVideoUrl?: string;
};

export type UpdateMatchDTO = Pick<Match, "id"> & Partial<CreateMatchDTO>;

export interface EloRatingInput {
  rating1: number;
  rating2: number;
  score1: number;
  score2: number;
  k: number;
}

export interface TeamfightMeanInput {
  participations: {
    player: {
      rating: number;
    };
    team: number;
  }[];
}
