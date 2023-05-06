import { mergeTypeDefs } from "@graphql-tools/merge";
import { userTypeDefs } from "./User";
import { typeDefs as workoutTypeDefs } from "./Workout";
import { typeDefs as trainingTypeDefs } from "./TrainingHistory";

export const combinedTypeDefs = mergeTypeDefs([userTypeDefs, workoutTypeDefs, trainingTypeDefs]);

export default combinedTypeDefs;
