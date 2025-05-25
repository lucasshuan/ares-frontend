import { CreateMatchDTO, UpdateMatchDTO } from "./match.model";
import { prisma } from "@/app/api/database/prisma";
import { MatchStatus } from "@prisma/client";
import { eloService } from "../elo/elo.service";

export default class MatchService {
  public static async list() {
    return prisma.match.findMany();
  }

  public static async findById(id: string) {
    return prisma.match.findUnique({
      where: { id },
      include: {
        sides: {
          include: {
            participations: {
              include: {
                user: {
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

  public static async create({ teams, ...data }: CreateMatchDTO) {
    if (teams.length !== 2) throw new Error("Invalid number of teams");
    return prisma.$transaction(async (prisma) => {
      const match = await prisma.match.create({ data });
      await prisma.side.createMany({
        data: {
          ...teams.map((team) => ({ ...team, matchId: match.id })),
        },
      });
    });
  }

  public static async accept(id: string) {
    // const match = await this.findById(id);
    // if (!match) throw new Error("Match not found");
    // return prisma.$transaction(async (prisma) => {
    //   const teams = match.sides.map((side) => {
    //     return {
    //       ...side,
    //       averageRating: eloService.teamAverageRating(side),
    //     };
    //   });
    //   for (let idx = 0; idx < teams.length; idx++) {
    //     const team = teams[idx];
    //     const opponentTeam = teams[idx === 0 ? 1 : 0];
    //     for (const participation of team.participations) {
    //       const matchesPlayedCount = participation.player._count.participations;
    //       const teamPlayersCount = team.participations.length;
    //       const rating = eloService.rating({
    //         rating1: participation.player.rating,
    //         rating2: opponentTeam.averageRating,
    //         score1: team.score,
    //         score2: opponentTeam.score,
    //         k: eloService.kFactor(matchesPlayedCount, teamPlayersCount),
    //       });
    //       await prisma.user.update({
    //         where: { id: participation.userId },
    //         data: { rating },
    //       });
    //     }
    //   }
    //   await prisma.match.update({
    //     where: { id },
    //     data: {
    //       status: MatchStatus.FINISHED,
    //     },
    //   });
    // });
  }

  public static async update({ id, ...data }: UpdateMatchDTO) {
    return prisma.match.update({
      where: { id },
      data,
    });
  }

  public static async delete(id: string) {
    return prisma.match.delete({ where: { id } });
  }
}
