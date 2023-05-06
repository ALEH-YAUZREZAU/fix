// @ts-nocheck

export const resolvers = {
  Query: {
    currentWorkout: async (parent, args, context) => {
      const userId = context.user.id;

      const currentWorkout = await context.prisma.trainingHistory.findFirst({
        where: {
          userId,
          completionDate: null,
        },
        orderBy: {
          startDate: "desc",
        },
      });

      return currentWorkout;
    },
    trainingHistory: async (parent, args, context) => {
      const userId = context.user.id;

      const history = await context.prisma.trainingHistory.findMany({
        where: {
          userId,
        },
        orderBy: {
          startDate: "desc",
        },
      });

      return history;
    },
  },
  Mutation: {
    startWorkout: async (parent, { input }, context) => {
      const { workoutId, comment } = input;
      const userId = context.user.id;

      const newTrainingHistory = await context.prisma.trainingHistory.create({
        data: {
          userId,
          workoutId,
          comment,
        },
      });

      return newTrainingHistory;
    },
    completeWorkout: async (parent, { input }, context) => {
      const { trainingHistoryId } = input;

      const updatedTrainingHistory = await context.prisma.trainingHistory.update({
        where: { id: trainingHistoryId },
        data: { completionDate: new Date() },
      });

      return updatedTrainingHistory;
    },
  },
};
