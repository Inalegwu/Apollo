import { NodeContext, NodeRuntime } from "@effect/platform-node";
import { Layer } from "effect";
import { AdvertiseService } from "./advertise/service";
import { DiscoveryService } from "./discovery/service";

const App = Layer.mergeAll(DiscoveryService, AdvertiseService).pipe(
    Layer.provide(NodeContext.layer),
);

NodeRuntime.runMain(Layer.launch(App));
