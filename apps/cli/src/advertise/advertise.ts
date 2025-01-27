import { Bonjour } from "@apollo/bonjour";
import { Console, Effect, Layer } from "effect";

const make = Effect.gen(function* () {
    yield* Effect.logInfo("advertise");
    const bonjour = yield* Bonjour;

    yield* Effect.forever(
        bonjour.advertise("apollo-cli-client", 42060, "http"),
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
