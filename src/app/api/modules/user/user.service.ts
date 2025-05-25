import { getRegionByCountry } from "@lib/region";
import { UpdateUserDTO } from "./user.model";
import { prisma } from "@/app/api/database/prisma";

class UserService {
  async list() {
    return prisma.user.findMany();
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        players: true,
      },
    });
  }

  async update({ id, country, role }: UpdateUserDTO) {
    const region = country ? getRegionByCountry(country) : undefined;

    return prisma.user.update({
      where: { id },
      data: {
        country,
        role,
        region,
      },
    });
  }

  async delete(id: string) {
    return prisma.user.delete({ where: { id } });
  }
}

export const userService = new UserService();
