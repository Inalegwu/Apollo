import { Bonjour } from "@apollo/bonjour";
import { Console, Effect } from "effect";

const program = Effect.gen(function* () {
    yield* Effect.logInfo("starting test");
    const _ = yield* Bonjour;

    yield* Effect.logInfo("attempting to discover");

    yield* Effect.forever(_.discover("http"));
}).pipe(
    Effect.provide(Bonjour.layer),
    Effect.catchAll((e) => Console.error(e)),
);

Effect.runSync(program);
