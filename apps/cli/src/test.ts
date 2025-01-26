import { Console, Effect } from "effect";
import { Bonjour } from "./bonjour/client";

const program = Effect.gen(function* () {
    yield* Effect.logInfo("starting test");
    const bon = yield* Bonjour;

    yield* Effect.logInfo("attempting to discover");

    yield* Effect.forever(bon.discover("http"));
}).pipe(
    Effect.provide(Bonjour.layer),
    Effect.catchAll((e) => Console.error(e)),
);

Effect.runSync(program);
