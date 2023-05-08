// @ts-nocheck
import { Context } from "../../types";

export const resolvers = {
  Query: {
    availableTags: async (parent, args, context: Context) => {
      return context.prisma.tag.findMany();
    },
    searchTags: async (_: any, args: { query: string }, context) => {
      const { query } = args;
      const tags = await context.prisma.tag.findMany({
        where: {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
      });

      return tags;
    },
    allWorkouts: async (parent, args, context: Context) => {
      return context.prisma.workout.findMany({ where: { isPublic: true } });
    },
    myWorkouts: async (parent, args, context: Context) => {
      // Get the current user from the context
      const userId = context.user.id;
      return context.prisma.workout.findMany({ where: { userId } });
    },
    workoutsByTags: async (parent, { tags }, context: Context) => {
      return context.prisma.workout.findMany({
        where: {
          isPublic: true,
          tags: { every: { tag: { name: { in: tags } } } },
        },
      });
    },
  },
  Mutation: {
    createWorkout: async (parent, { input }, context: Context) => {
      // Get the current user from the context
      const userId = context.user.id;
      // Create the workout
      const workout = await context.prisma.workout.create({
        data: {
          title: input.title,
          description: input.description,
          user: {
            connect: {
              id: userId,
            },
          },
          tags: {
            create: input.tags.map((id) => {
              return {
                tag: {
                  connect: { id },
                },
              };
            }),
          },
        },
      });
      return workout;
    },
    updateWorkout: async (parent, { input }, context: Context) => {
      const { id, title, description, isPublic, tags } = input;
      const userId = context.user.id;

      // Update the workout
      const workout = await context.prisma.workout.update({
        where: { id },
        data: {
          title,
          description,
          isPublic,
          tags: tags && {
            set: [],
            create: tags.map((tagName) => ({ tag: { connectOrCreate: { where: { name: tagName }, create: { name: tagName } } } })),
          },
        },
      });

      return workout;
    },
    deleteWorkout: async (parent, { id }, context: Context) => {
      const userId = context.user.id;

      // Delete the workout
      const deletedWorkout = await context.prisma.workout.delete({
        where: { id },
      });

      return deletedWorkout;
    },
  },
  User: {
    workouts: async (parent, args, context: Context) => {
      return context.prisma.workout.findMany({ where: { userId: parent.id } });
    },
  },
  Workout: {
    user: async (parent, args, context: Context) => {
      return context.prisma.user.findUnique({ where: { id: parent.userId } });
    },
    tags: async (parent, args, context: Context) => {
      return context.prisma.workoutTag.findMany({ where: { workoutId: parent.id } });
    },
  },
  Tag: {
    workouts: async (parent, args, context: Context) => {
      return context.prisma.workoutTag.findMany({ where: { tagId: parent.id } });
    },
  },
};
