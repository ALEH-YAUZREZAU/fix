import { gql } from "apollo-server";

export const typeDefs = gql`
  type Workout {
    id: ID!
    title: String!
    description: String!
    isPublic: Boolean!
    user: User!
    tags: [Tag!]!
  }

  type Tag {
    id: ID!
    name: String!
    workouts: [Workout!]!
  }

  input CreateWorkoutInput {
    title: String!
    description: String!
    isPublic: Boolean
    tags: [ID!]!
  }

  input UpdateWorkoutInput {
    id: ID!
    title: String
    description: String
    isPublic: Boolean
    tags: [ID!]
  }

  type Query {
    allWorkouts: [Workout!]!
    myWorkouts: [Workout!]!
    workoutsByTags(tags: [ID!]!): [Workout!]!
    availableTags: [Tag!]!
  }

  type Mutation {
    createWorkout(input: CreateWorkoutInput!): Workout!
    updateWorkout(input: UpdateWorkoutInput!): Workout!
    deleteWorkout(id: ID!): Workout!
  }
`;
