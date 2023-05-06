import { Context } from "../../types";
import { checkAuth } from "../../utils";
import { MutationUpdateUserArgs, Role } from "../../graphqlTypes";

export const userResolvers = {
  Mutation: {
    async updateUser(parent: any, { input }: MutationUpdateUserArgs, context: Context) {
      if (!context.user || context.user.role !== "ADMIN") {
        throw new Error("You must be an ADMIN to update a user.");
      }

      const { id, email, name, image, role } = input;

      const updatedUser = await context.prisma.user.update({
        where: { id },
        data: {
          email: email || undefined,
          name: name || undefined,
          image: image || undefined,
          role: role || Role.User,
        },
      });

      return updatedUser;
    },
  },
  Query: {
    me: async (_: any, __: any, context: Context) => {
      checkAuth(context);

      const currentUser = await context.prisma.user.findUnique({
        where: { id: context.user.id },
        include: { accounts: true },
      });

      if (!currentUser) {
        throw new Error("User not found");
      }

      return currentUser;
    },
  },
};
