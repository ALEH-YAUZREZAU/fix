import { gql } from "apollo-server";

export const typeDefs = gql`
  type TrainingHistory {
    id: ID!
    user: User!
    workout: Workout!
    comment: String
    startDate: String!
    completionDate: String
  }

  input StartWorkoutInput {
    workoutId: ID!
    comment: String
  }

  input CompleteWorkoutInput {
    trainingHistoryId: ID!
  }

  type Query {
    currentWorkout: TrainingHistory
    trainingHistory: [TrainingHistory!]!
  }

  type Mutation {
    startWorkout(input: StartWorkoutInput!): TrainingHistory!
    completeWorkout(input: CompleteWorkoutInput!): TrainingHistory!
  }
`;
