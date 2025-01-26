import { Effect, Layer, Schedule } from "effect";
import { Bonjour } from "../bonjour/client";

const make = Effect.gen(function* () {
    const bonjour = yield* Bonjour;

    yield* Effect.forkScoped(
        Effect.schedule(
            bonjour.discover("http"),
            Schedule.fixed(500),
        ),
    );
});

export const Discover = {
    Live: Layer.scopedDiscard(make).pipe(
        Layer.provide(Bonjour.layer),
    ),
};
