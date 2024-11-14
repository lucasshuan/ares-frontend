import { Match, MatchStatus, Region } from "@prisma/client";

type BaseCreateMatchDTO = {
  region: Region;
  gameId: string;
  status?: MatchStatus;
  accepted?: boolean;
  screenshotUrl?: string;
  youtubeVideoUrl?: string;
};

type Participant = {
  playerId: string;
  score: number;
};

export type CreateMatchDTO = {
  participants: Participant[];
} & BaseCreateMatchDTO;

export type UpdateMatchDTO = Pick<Match, "id"> & Partial<BaseCreateMatchDTO>;

export interface EloRatingInput {
  rating1: number;
  rating2: number;
  score1: number;
  score2: number;
  k: number;
}

export interface TeamfightMeanInput {
  participations: {
    score: number;
    team?: {
      members: {
        player: {
          rating: number;
        };
      }[];
    };
  }[];
}
