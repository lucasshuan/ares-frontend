import { getRegionByCountry } from "@/lib/region";
import prisma from "../prisma";
import { CreateAccountDTO, UpdateAccountDTO } from "../models/account_model";

class AccountService {
  async list() {
    return prisma.account.findMany();
  }

  async findById(id: string) {
    return prisma.account.findUnique({
      where: { id },
      include: {
        players: true,
      },
    });
  }

  async create({ country, googleEmail }: CreateAccountDTO) {
    const region = getRegionByCountry(country);

    if (!region) throw new Error("Invalid country");

    return prisma.account.create({
      data: {
        country,
        googleEmail,
        region,
      },
    });
  }

  async update({ id, country, googleEmail }: UpdateAccountDTO) {
    const region = country ? getRegionByCountry(country) : undefined;

    return prisma.account.update({
      where: { id },
      data: {
        country,
        googleEmail,
        region,
      },
    });
  }

  async delete(id: string) {
    return prisma.account.delete({ where: { id } });
  }
}

export const accountService = new AccountService();
