import { Console, Duration, Effect } from "effect";
import { parentPort } from "node:worker_threads";
import { Bonjour } from "./bonjour";

const port = parentPort;

if (!port) throw new Error("[CORE]==> CORE ERROR::NO PORT");

const program = Effect.gen(function* () {
    yield* Effect.logInfo("Starting desktop bonjour instance");
    const bon = yield* Bonjour;

    const advertise = bon.advertise("apollo-desktop-client", 42069, "http")
        .pipe(
            Effect.tap((_) =>
                Console.info(`Advertising ${_.name}:${_.port} on ${_.host}`)
            ),
            Effect.andThen((service) => service.start()),
        );

    const discover = bon.discover("http").pipe(
        Effect.tap((_) => Console.log(`Discovered ${_.services}`)),
        Effect.andThen((service) => service.start()),
    );

    yield* Effect.all([advertise, discover], {
        concurrency: "unbounded",
    }).pipe(
        Effect.orDie,
    );
}).pipe(
    Effect.timed,
    Effect.tap(([duration]) =>
        Console.info(`~ Total Time ${Duration.format(duration)}`)
    ),
    Effect.catchAll(Effect.die),
    Effect.provide(Bonjour.layer),
    Effect.annotateLogs({
        instance: "apollo-desktop",
    }),
);

port.on(
    "message",
    () => Effect.runFork(program),
);
