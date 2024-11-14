import { MatchStatus } from "@prisma/client";
import {
  CreateMatchDTO,
  EloRatingInput,
  TeamfightMeanInput,
  UpdateMatchDTO,
} from "../models/match_model";
import { playerService } from "./player_service";
import prisma from "../database/prisma";

class MatchService {
  async list() {
    return prisma.match.findMany();
  }

  async findById(id: string) {
    return prisma.match.findUnique({
      where: { id },
      include: {
        teams: {
          include: {
            participations: {
              include: {
                players: {
                  include: {
                    _count: {
                      select: {
                        participations: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async create({ participants, ...data }: CreateMatchDTO) {
    return prisma.match.create({
      data: {
        participations: {
          createMany: {
            data: participants.map(({ playerId, score }) => ({
              playerId,
              score,
            })),
          },
        },
        ...data,
      },
    });
  }

  async accept(id: string) {
    const match = await this.findById(id);
    if (!match) throw new Error("Match not found");

    return prisma.$transaction(async (prisma) => {
      const teams = this.teamAverageRatings({
        participations: match.participations,
      });
      for (const participation of match.participations) {
        const rating = this.eloRating({
          rating1: participation.player.rating,
          rating2: teams[1].avgRating,
          score1: teams[0].score,
          score2: teams[1].score,
          k: this.kFactor(participation.player._count.participations, true),
        });
        await playerService.update({
          id: participation.playerId,
          rating,
        });
      }
      await Promise.all(playerUpdatePromises);
      return prisma.match.update({
        where: { id },
        data: {
          status: MatchStatus.ACCEPTED,
        },
      });
    });
  }

  async update({ id, ...data }: UpdateMatchDTO) {
    return prisma.match.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.match.delete({ where: { id } });
  }

  private probability(rating1: number, rating2: number) {
    return 1 / (1 + Math.pow(10, (rating1 - rating2) / 400));
  }

  private eloRating({ rating1, rating2, score1, score2, k }: EloRatingInput) {
    const maxScore = Math.max(score1, score2);
    const outcome = (score1 - score2) / (2 * maxScore) + 0.5;

    const probabilityA = this.probability(rating1, rating2);

    return rating1 + k * (outcome - probabilityA);
  }

  private teamAverageRatings({ participations }: TeamfightMeanInput) {
    const teams = participations.map((participation) => participation.team!);
    const minTeamSize = Math.min(...teams.map((team) => team.members.length));
    return participations.map((participation) => {
      let avgRating = 0;
      participation.team!.members.forEach((member) => {
        avgRating += member.player.rating;
      });
      avgRating /= minTeamSize;
      return {
        avgRating,
        score: participation.score,
        numMembers: participation.team!.members.length,
      };
    });
  }

  private kFactor(numMatches: number, mode?: MatchMode) {
    const mult = mode === MatchMode.TEAM ? 0.5 : 1;
    return (800 / numMatches) * mult;
  }
}

export const matchService = new MatchService();
