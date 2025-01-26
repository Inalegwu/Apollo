import { Effect, Layer } from "effect";
import { Bonjour } from "../bonjour/client";

const make = Effect.gen(function* () {
    const bonjour = yield* Bonjour;

    yield* Effect.forkScoped(
        bonjour.advertise("apollo-cli-client", 42060, ""),
    );
});

export const Advertise = {
    Live: Layer.scopedDiscard(make).pipe(
        Layer.provide(Bonjour.layer),
    ),
};
