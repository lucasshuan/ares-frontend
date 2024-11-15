import prisma from "@api/database/prisma";
import { CreateClanDTO, ListClansDTO, UpdateClanDTO } from "./clan.model";
import { insensitiveSearch } from "@lib/db";
import { playerService } from "../player/player.service";

class ClanService {
  async findById(id: string) {
    return prisma.clan.findUnique({
      where: { id },
      include: {
        members: true,
        game: true,
        owner: true,
      },
    });
  }

  async list({ gameId, gameName, order, skip, take }: ListClansDTO) {
    return prisma.clan.findMany({
      where: {
        game: {
          id: gameId,
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

  async create(data: CreateClanDTO) {
    const owner = await playerService.findById(data.ownerId);
    if (!owner) throw new Error("Owner not found");
    return prisma.clan.create({
      data: {
        rating: owner?.rating,
        ...data,
      },
    });
  }

  async update({ id, ...data }: UpdateClanDTO) {
    return prisma.clan.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.clan.delete({ where: { id } });
  }
}

export const clanService = new ClanService();
