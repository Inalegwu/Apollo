import { publicProcedure, router } from "@src/trpc";
import { config } from "@src/web/state";

export const serverRouter = router({
  startServer: publicProcedure.mutation(async () => {
    const appConfig = config.get();

    console.log(`Starting server with port ${appConfig.port} ...`);
  }),
});
