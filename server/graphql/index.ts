import { mergeTypeDefs } from "@graphql-tools/merge";
import { userTypeDefs } from "./User";
import { typeDefs as workoutTypeDefs } from "./Workout";

export const combinedTypeDefs = mergeTypeDefs([userTypeDefs, workoutTypeDefs]);

export default combinedTypeDefs;
