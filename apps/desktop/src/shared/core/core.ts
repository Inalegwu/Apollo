import { parentPort } from "node:worker_threads";
import { Effect } from "effect";
import { Bonjour } from "./bonjour";
// import { InstanceService } from "./instance/service";

const port = parentPort;

if (!port) throw new Error("[CORE]==> CORE ERROR::NO PORT");

const program = Effect.gen(function* () {
    yield* Effect.logInfo("Starting desktop bonjour instance");
    const bon = yield* Bonjour;

    yield* 
        bon.advertise("apollo-desktop-client", 42069, "http");
    

    yield* bon.discover("http");
}).pipe(Effect.provide(Bonjour.layer));

// const App = Layer.mergeAll(InstanceService).pipe(
//     Layer.provide(NodeContext.layer),
// );

port.on(
    "message",
    () => Effect.runSync(program),
);

// NodeRuntime.runMain(
//     Layer.launch(InstanceService),
// ),
