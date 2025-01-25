import { HttpRouter, HttpServer, HttpServerResponse } from "@effect/platform";
import { NodeHttpServer } from "@effect/platform-node";
import { Effect, Layer } from "effect";
import { createServer } from "node:http";

const router = HttpRouter.empty.pipe(
    HttpRouter.get(
        "/ping",
        HttpServerResponse.json({
            success: true,
        }),
    ),
);

const App = router.pipe(
    Effect.tapError((e) => Effect.logError(e.toString())),
    HttpServer.serve(),
);

const Live = Layer.unwrapEffect(Effect.gen(function* () {
    yield* Effect.logInfo("Starting FTP Server");

    return NodeHttpServer.layer(createServer, {
        port: 42069,
        host: "localhost",
    });
}));

export const Server = {
    Live: Layer.provide(App, Live).pipe(Layer.catchAll(Layer.die)),
};
