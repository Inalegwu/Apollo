import { filesRouter } from "@shared/routers/files";
import { nodeRouter } from "@shared/routers/node";
import { windowRouter } from "@shared/routers/window";
import { publicProcedure, router } from "@src/trpc";
import { shell } from "electron";
import { z } from "zod";
import pkg from "../../../package.json";

export const appRouter = router({
  window: windowRouter,
  version: publicProcedure.query(async () => {
    return pkg.version;
  }),
  node: nodeRouter,
  files: filesRouter,
  openLink: publicProcedure
    .input(
      z.object({
        href: z.string().url(),
      }),
    )
    .mutation(async ({ input }) => {
      shell.openExternal(input.href);
    }),
});

export type AppRouter = typeof appRouter;
