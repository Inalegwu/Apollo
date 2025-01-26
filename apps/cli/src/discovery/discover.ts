import { Console, Effect, Layer } from "effect";
import { Bonjour } from "../bonjour/client";

const make = Effect.gen(function* () {
    const bonjour = yield* Bonjour;

    // yield* Effect.forkScoped(
    //     bonjour.discover("http"),
    // );
    yield* bonjour.discover("http");
}).pipe(
    Effect.catchAll((e) => Console.error(e)),
    Effect.annotateLogs({
        module: "discover",
    }),
);

export const Discover = {
    Live: Layer.scopedDiscard(make).pipe(
        Layer.provide(Bonjour.layer),
    ),
};
