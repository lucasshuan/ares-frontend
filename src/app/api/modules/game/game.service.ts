import { prisma } from "@/app/api/database/prisma";
import { CreateGameDTO, UpdateGameDTO } from "./game.model";

class GameService {
  async list() {
    return prisma.game.findMany();
  }

  async findById(id: string) {
    return prisma.game.findUnique({ where: { id } });
  }

  async create(data: CreateGameDTO) {
    return prisma.game.create({
      data,
    });
  }

  async update({ id, ...data }: UpdateGameDTO) {
    return prisma.game.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.game.delete({ where: { id } });
  }
}

export const gameService = new GameService();
