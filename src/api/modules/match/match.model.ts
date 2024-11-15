import { Match } from "@prisma/client";
import { CreateTeamDTO } from "../team/team.model";

type BaseCreateMatchDTO = Pick<
  Match,
  | "region"
  | "status"
  | "screenshotUrl"
  | "streamUrl"
  | "tourneyScheduleId"
  | "creatorId"
  | "gameId"
>;

export type CreateMatchDTO = {
  teams: CreateTeamDTO[];
} & BaseCreateMatchDTO;

export type UpdateMatchDTO = Pick<Match, "id"> & Partial<BaseCreateMatchDTO>;
