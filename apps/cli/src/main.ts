import { Bonjour } from "@apollo/bonjour";
import { Console, Effect } from "effect";

const make = Effect.gen(function* () {
    yield* Effect.logInfo("Starting CLI Apollo Instance");
    const bonjour = yield* Bonjour;

    yield* bonjour.advertise("apollo-cli-client", 42069, "http").pipe(
        Effect.tap((m) =>
            Console.info(`Advertising ${m.name}:${m.port} on ${m.host}`)
        ),
        Effect.andThen((_) => _.start()),
    );

    yield* bonjour.discover("http").pipe(
        Effect.andThen((_) => _.start()),
        Effect.forever,
    );
}).pipe(
    Effect.catchAll((e) => Console.error(e)),
    Effect.provide(Bonjour.layer),
);

Effect.runFork(make);
