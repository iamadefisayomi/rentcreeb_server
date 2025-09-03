import { User, Session } from "better-auth"; // adjust path if your user type is custom

declare global {
  namespace Express {
    interface Request {
      user?: User;
      session?: Session;
    }
  }
}