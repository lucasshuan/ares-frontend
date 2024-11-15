import { prisma } from "@api/database/prisma";
import { CreateTeamDTO } from "./team.model";

class TeamService {
  async createMany(data: CreateTeamDTO[]) {
    return prisma.team.createMany({
      data,
    });
  }
}

export const teamService = new TeamService();
