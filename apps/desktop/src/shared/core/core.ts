import { Console, Effect } from "effect";
import { parentPort } from "node:worker_threads";
import { Bonjour } from "./bonjour";

const port = parentPort;

if (!port) throw new Error("[CORE]==> CORE ERROR::NO PORT");

const program = Effect.gen(function* () {
    yield* Effect.logInfo("Starting desktop bonjour instance");
    const bon = yield* Bonjour;

    yield* Effect.fork(Effect.gen(function* () {
        yield* bon.advertise("apollo-desktop-client", 42069, "http").pipe(
            Effect.tap((m) => Console.log(m)),
        );

        yield* bon.advertise("apollo-desktop-client", 42069, "http").pipe(
            Effect.tap((m) => Console.log(m)),
        );
    })).pipe(Effect.forever);
}).pipe(Effect.provide(Bonjour.layer));

port.on(
    "message",
    () => Effect.runSync(program),
);
