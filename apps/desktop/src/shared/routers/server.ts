import { publicProcedure, router } from "@src/trpc";
import { config } from "@src/web/state";
import { node } from "../peer";

export const serverRouter = router({
	startServer: publicProcedure.mutation(async () => {
		if (config.serverStatus.get() === "stopped") {
			await node.start();

			console.log("Node started");

			for (const addr of node.getMultiaddrs()) {
				console.log(addr.toString());
			}
			config.serverStatus.set("running");
		}

		console.log("Node already running");
	}),
	stopServer: publicProcedure.mutation(async () => {
		if (config.serverStatus.get() === "running") {
			await node.stop();
			console.log("Node Stopped stopped");
		}
		console.log("Node already stopped");
	}),
});
