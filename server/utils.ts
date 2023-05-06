import { Context } from "./types";

export const checkAuth = (context: Context) => {
  if (!context.user) {
    throw new Error("User Unauthorized");
  }
};
