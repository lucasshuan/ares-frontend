import { User } from "@prisma/client";

export type CreateUserDTO = Pick<User, "email" | "country">;

export type UpdateUserDTO = Pick<User, "id"> & Partial<CreateUserDTO>;
