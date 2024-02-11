import { router } from "@src/trpc";
import { fileRouter } from "./files";
import { serverRouter } from "./server";
import { windowRouter } from "./window";

export const appRouter = router({
  window: windowRouter,
  files: fileRouter,
  server: serverRouter,
});

export type AppRouter = typeof appRouter;
