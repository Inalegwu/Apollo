import { Bonjour } from "@apollo/bonjour";
import { Console, Effect } from "effect";

const make = Effect.gen(function* () {
    yield* Effect.logInfo("Starting CLI Apollo Instance");
    const bonjour = yield* Bonjour;

    const advertise = bonjour.advertise("apollo-cli-client", 42069, "http")
        .pipe(
            Effect.tap((_) =>
                Console.info(`Advertising ${_.name}:${_.port} on ${_.host}`)
            ),
            Effect.andThen((_) => _.start()),
        );

    const discover = bonjour.discover("http").pipe(
        Effect.tap((_) =>
            Console.info(`Discovered Services: ${_.services}`, {})
        ),
        Effect.andThen((_) => _.start()),
    );

    // yield* bonjour.discover("http").pipe(
    //     Effect.andThen((_) => _.start()),
    //     Effect.forever,
    // );
    yield* Effect.all([advertise, discover]).pipe();
}).pipe(
    Effect.catchAll((e) => Console.error(e)),
    Effect.provide(Bonjour.layer),
    Effect.annotateLogs({
        instance: "apollo-cli",
    }),
);

Effect.runFork(make);
