import { Effect, Layer } from "effect";
import { Advertise } from "./advertise";

const make = Effect.gen(function* () {
    yield* Effect.logInfo("Starting Advertise Service");

    yield* Effect.acquireRelease(
        Effect.logInfo("Started Advertise Service"),
        () => Effect.logInfo("Stopped Advertise Service"),
    );
});

export const AdvertiseService = Layer.scopedDiscard(make).pipe(
    Layer.provide(Advertise.Live),
);
