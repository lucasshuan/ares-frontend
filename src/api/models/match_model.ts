import { Match, MatchMode, MatchStatus, Region } from "@prisma/client";

type BaseCreateMatchDTO = {
  region: Region;
  gameId: string;
  status?: MatchStatus;
  mode?: MatchMode;
  accepted?: boolean;
  screenshotUrl?: string;
  youtubeVideoUrl?: string;
};

type Participation = {
  score: number;
};

export type CreateDuelMatchDTO = {
  participations: ({ playerId: string } & Participation)[];
} & BaseCreateMatchDTO;

export type CreateTeamMatchDTO = {
  participations: ({ teamId: string } & Participation)[];
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
