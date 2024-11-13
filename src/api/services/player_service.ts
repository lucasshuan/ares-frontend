import prisma from "../prisma";
import { CreatePlayerDTO, UpdatePlayerDTO } from "../models/player_model";

class PlayerService {
  async list() {
    return prisma.player.findMany();
  }

  async findById(id: string) {
    return prisma.player.findUnique({ where: { id } });
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
