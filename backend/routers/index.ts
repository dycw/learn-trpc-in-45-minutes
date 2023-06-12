import { t } from "../trpc";
import { userRouter } from "./users";

export const appRouter = t.router({
  sayHi: t.procedure.query(() => {
    return "hi";
  }),
  log: t.procedure
    .input((v) => {
      if (typeof v === "string") {
        return v;
      } else {
        throw new Error("Invalid input: expected a string");
      }
    })
    .mutation((req) => {
      console.log(`Client says: ${req.input}`);
      return true;
    }),
  users: userRouter,
});

export type AppRouter = typeof appRouter;
