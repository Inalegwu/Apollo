import { Bonjour } from "@apollo/bonjour";
import { Effect, Layer } from "effect";

const make = Effect.gen(function* () {
    const bonjour = yield* Bonjour;

    yield* Effect.forever(
        bonjour.advertise("apollo-desktop-client", 42069, "http"),
    );
});

export const Advertise = {
    Live: Layer.scopedDiscard(make).pipe(
        Layer.provide(Bonjour.layer),
    ),
};
