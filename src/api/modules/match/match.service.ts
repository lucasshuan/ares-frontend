import { CreateMatchDTO, UpdateMatchDTO } from "./match.model";
import prisma from "@api/database/prisma";
import { eloService } from "../elo/elo.service";
import { MatchStatus } from "@prisma/client";

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
                player: {
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

  async create({ teams, ...data }: CreateMatchDTO) {
    return prisma.$transaction(async (prisma) => {
      const match = await prisma.match.create({ data });
      await prisma.team.createMany({
        data: {
          ...teams.map((team) => ({ ...team, matchId: match.id })),
        },
      });
    });
  }

  async accept(id: string) {
    const match = await this.findById(id);
    if (!match) throw new Error("Match not found");

    return prisma.$transaction(async (prisma) => {
      const teams = match.teams.map((team) => {
        return {
          ...team,
          averageRating: eloService.teamAverageRating({ team }),
        };
      });

      for (let idx = 0; idx < teams.length; idx++) {
        const team = teams[idx];
        const opponentTeam = teams[idx === 0 ? 1 : 0];

        for (const participation of team.participations) {
          const numMatchesPlayed = participation.player._count.participations;
          const numTeamPlayers = team.participations.length;

          const rating = eloService.rating({
            rating1: participation.player.rating,
            rating2: opponentTeam.averageRating,
            score1: team.score,
            score2: opponentTeam.score,
            k: eloService.kFactor(numMatchesPlayed, numTeamPlayers),
          });

          await prisma.player.update({
            where: { id: participation.playerId },
            data: { rating },
          });
        }
      }
      await prisma.match.update({
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
}

export const matchService = new MatchService();
