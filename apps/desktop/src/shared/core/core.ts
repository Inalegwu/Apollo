import { Console, Effect } from "effect";
import { parentPort } from "node:worker_threads";
import { Bonjour } from "./bonjour";

const port = parentPort;

if (!port) throw new Error("[CORE]==> CORE ERROR::NO PORT");

const program = Effect.gen(function* () {
    yield* Effect.logInfo("Starting desktop bonjour instance");
    const bon = yield* Bonjour;

    yield* bon.advertise("apollo-desktop-client", 42069, "http").pipe(
        Effect.tap((m) =>
            Console.info(`Advertising ${m.name}:${m.port} on ${m.host}`)
        ),
        Effect.andThen((_) => _.start()),
    );

    yield* bon.discover("http").pipe(
        Effect.andThen((_) => _.start()),
        Effect.forever,
    );
}).pipe(Effect.provide(Bonjour.layer));

port.on(
    "message",
    () => Effect.runFork(program),
);
