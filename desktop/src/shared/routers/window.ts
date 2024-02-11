import { publicProcedure, router } from "@src/trpc";
import { shell } from "electron";

// router for custom window controls ,
// see src/shared/context.ts to see definition of
// window
export const windowRouter = router({
  closeWindow: publicProcedure.mutation(async ({ ctx }) => {
    if (!ctx.window) return;

    ctx.window.close();
  }),
  minimize: publicProcedure.mutation(async ({ ctx }) => {
    if (!ctx.window) return;
    ctx.window.minimize();
  }),
  openGithub: publicProcedure.mutation(async () => {
    shell.openExternal("https://github.com/Inalegwu/Apollo");
  }),
  openWebsite: publicProcedure.mutation(async () => {
    // TODO change to actual URL in the future
    shell.openExternal("https://apollo.verve");
  }),
});
