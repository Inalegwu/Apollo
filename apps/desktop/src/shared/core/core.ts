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
        Effect.timed,
    );

    yield* Effect.all([advertise, discover], {
        concurrency: "unbounded",
    }).pipe(
        Effect.orDie,
    );
}).pipe(
    Effect.provide(Bonjour.layer),
    Effect.annotateLogs({
        instance: "apollo-desktop",
    }),
);

port.on(
    "message",
    () => Effect.runFork(program),
);
