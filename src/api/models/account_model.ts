import { Account } from "@prisma/client";

export type CreateAccountDTO = Pick<Account, "googleEmail" | "country">;

export type UpdateAccountDTO = Pick<Account, "id"> & Partial<CreateAccountDTO>;
