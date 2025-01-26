import { Bonjour } from "@apollo/bonjour";
import { Effect, Layer } from "effect";

const make = Effect.gen(function* (_) {
  const bonjour = yield* Bonjour;

  yield* Effect.forever(bonjour.discover("http"));
});

export const Discover = {
  Live: Layer.scopedDiscard(make).pipe(
    Layer.provide(Bonjour.layer),
  ),
};
