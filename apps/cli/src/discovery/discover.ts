import { Bonjour } from "@apollo/bonjour";
import { Console, Effect, Layer } from "effect";

const make = Effect.gen(function* () {
    const bonjour = yield* Bonjour;

    yield* Effect.forever(bonjour.discover("http"));
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
