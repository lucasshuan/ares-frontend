import prisma from "@api/database/prisma";
import { CreateClanDTO, UpdateClanDTO } from "./clan.model";

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

  async list() {}

  async create(data: CreateClanDTO) {
    return prisma.clan.create({ data });
  }

  async update({ id, ...data }: UpdateClanDTO) {
    return prisma.clan.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.clan.delete({ where: { id } });
  }
}

export const clanService = new ClanService();
