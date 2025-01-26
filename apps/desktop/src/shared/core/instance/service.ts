import { Effect, Layer } from "effect";
import { Instance } from "./instance";

const make = Effect.gen(function* () {
    yield* Effect.logInfo("Starting Client Instance");

    yield* Effect.acquireRelease(
        Effect.logInfo("Client Instance Started"),
        () => Effect.logInfo("Client Instance Stopped"),
    );
});

export const InstanceService = Layer.scopedDiscard(make).pipe(
    Layer.provide(Instance.Live),
);
