import { NodeContext, NodeRuntime } from "@effect/platform-node";
import { Layer } from "effect";
import { parentPort } from "node:worker_threads";
import { DiscoveryService } from "./discovery/service";
import { FTPService } from "./ftp/service";

const port = parentPort;

if (!port) throw new Error("[CORE]==> CORE ERROR::NO PORT");

const App = Layer.mergeAll(DiscoveryService, FTPService).pipe(
    Layer.provide(NodeContext.layer),
);

port.on("message", () => NodeRuntime.runMain(Layer.launch(App)));
