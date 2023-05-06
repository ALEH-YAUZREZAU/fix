import jwt from "jsonwebtoken";

export const authMiddleware = async (context: any) => {
  let token = context.req.headers.authorization || "";
  token = token.replace("Bearer ", "");

  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET as string);
      context.user = decoded;
    } else {
      context.user = null;
    }
  } catch (err) {
    throw new Error("Invalid token");
  }

  return context;
};
