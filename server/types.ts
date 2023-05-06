import { PrismaClient } from "@prisma/client";
import { Role, User } from "./graphqlTypes";

export interface Context {
  prisma: PrismaClient;
  user: User;
}
