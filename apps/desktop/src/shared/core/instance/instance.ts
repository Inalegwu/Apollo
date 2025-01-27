import { Console, Effect, Layer } from "effect";
import { Bonjour } from "@apollo/bonjour";

const make = Effect.gen(function* () {
    const bonjour = yield* Bonjour;

    yield* bonjour.discover("http");

    yield* Effect.forever(bonjour.discover("http"));

    yield* Effect.forever(
        bonjour.advertise("apollo-desktop-client", 42069, "http"),
    );
}).pipe(
    Effect.annotateLogs({
        module: "client-instance",
    }),
    Effect.catchAll((e) => Console.error(String(e))),
);

export const Instance = {
    Live: Layer.scopedDiscard(make).pipe(
        Layer.provide(Bonjour.layer),
        Layer.tapError((e) => Console.log(e)),
    ),
};
