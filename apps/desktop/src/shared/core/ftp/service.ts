import { Effect, Layer } from "effect";
import { Server } from "./server";

const make = Effect.gen(function* () {
    yield* Effect.logInfo("Starting FTP Server");

    yield* Effect.acquireRelease(
        Effect.logInfo("Started Redirect Service"),
        () => Effect.logInfo("Stopped Redirect Service"),
    );
});

export const FTPService = Layer.scopedDiscard(make).pipe(
    Layer.provide(Server.Live),
    Layer.annotateLogs({
        service: "ftp-server",
    }),
);
