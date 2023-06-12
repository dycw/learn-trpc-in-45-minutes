import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import cors from "cors";
import express from "express";
import { WebSocketServer } from "ws";
import { createContext } from "./context";
import { appRouter } from "./routers";

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
const server = app.listen(3000);
console.log("Express server listening to http://localhost:3000");
applyWSSHandler({
  wss: new WebSocketServer({ server }),
  router: appRouter,
  createContext,
});
