import { Console, Effect, Layer } from "effect";
import { Bonjour } from "../bonjour/client";

const make = Effect.gen(function* () {
    const bonjour = yield* Bonjour;

    yield* Effect.forever(
        bonjour.advertise("apollo-cli-client-1", 42060, "http"),
    );
}).pipe(
    Effect.catchAll((e) => Console.error(e)),
    Effect.annotateLogs({
        module: "advertise",
    }),
);

export const Advertise = {
    Live: Layer.scopedDiscard(make).pipe(
        Layer.provide(Bonjour.layer),
    ),
};
