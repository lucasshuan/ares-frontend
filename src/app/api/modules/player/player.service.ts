import { insensitiveSearch } from "@/app/api/utils/db";
import {
  CreatePlayerDTO,
  ListPlayersDTO,
  UpdatePlayerDTO,
} from "./player.model";
import { prisma } from "@/app/api/database/prisma";

class PlayerService {
  async list({
    gameName,
    country,
    username,
    order,
    skip,
    take,
  }: ListPlayersDTO = {}) {
    return prisma.player.findMany({
      where: {
        username: insensitiveSearch(username),
        user: {
          country: insensitiveSearch(country),
        },
        game: {
          name: insensitiveSearch(gameName),
        },
      },
      orderBy: {
        rating: order,
      },
      skip,
      take,
    });
  }

  async findById(id: string) {
    return prisma.player.findUnique({
      where: { id },
      include: {
        user: true,
        game: true,
        clanMemberships: true,
        ownedClans: true,
        participations: {
          include: {
            team: {
              include: {
                match: true,
              },
            },
          },
        },
        tourneyRosters: true,
      },
    });
  }

  async create(data: CreatePlayerDTO) {
    return prisma.player.create({
      data,
    });
  }

  async update({ id, ...data }: UpdatePlayerDTO) {
    return prisma.player.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.player.delete({ where: { id } });
  }
}

export const playerService = new PlayerService();
