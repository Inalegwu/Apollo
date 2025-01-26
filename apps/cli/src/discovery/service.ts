import { Effect, Layer } from "effect";
import { Discover } from "./discover";

const make = Effect.gen(function* () {
    yield* Effect.logInfo("Starting Discovery Service");

    yield* Effect.acquireRelease(
        Effect.logInfo("Started Discovery Service"),
        () => Effect.logInfo("Stopped Discovery Service"),
    );
});

export const DiscoveryService = Layer.scopedDiscard(make).pipe(
    Layer.provide(Discover.Live),
);
