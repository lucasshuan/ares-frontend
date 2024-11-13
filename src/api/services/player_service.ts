import prisma from "../prisma";
import {
  CreatePlayerDTO,
  ListPlayersDTO,
  UpdatePlayerDTO,
} from "../models/player_model";

class PlayerService {
  async list({ account, game, order, skip, take }: ListPlayersDTO) {
    return prisma.player.findMany({
      where: {
        account,
        game,
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
