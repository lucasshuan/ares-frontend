import { CreateMatchDTO, UpdateMatchDTO } from "../models/match_model";
import prisma from "../prisma";

class MatchService {
  async list() {
    return prisma.match.findMany();
  }

  async findById(id: string) {
    return prisma.match.findUnique({ where: { id } });
  }

  async create(data: CreateMatchDTO) {
    return prisma.match.create({
      data,
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
