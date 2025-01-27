import bonjour, { type ServiceOptions } from "bonjour";
import { Console, Context, Data, Effect, Layer } from "effect";

export class BonjourError extends Data.TaggedError("bonjour-error")<{
    cause: unknown;
}> {}

const make = Effect.gen(function* () {
    const instance = yield* Effect.acquireRelease(
        Effect.succeed(bonjour()),
        (_) => Effect.succeed(() => _.destroy()),
    );

    const advertise = (
        serviceName: string,
        port: number,
        type: string,
        protocol: ServiceOptions["protocol"] = "udp",
    ) => Effect.try({
        try: () => {
            Console.log(`Publishing ad for ${serviceName}:${type}, ${port}`);
            return instance.publish({
                name: serviceName,
                type,
                protocol,
                port,
            });
        },
        catch: (cause) => new BonjourError({ cause }),
    });

    const discover = (
        type: string,
        protocol: ServiceOptions["protocol"] = "udp",
    ) => Effect.try({
        try: () =>
            instance.find({ type, protocol }, (service) => {
                Console.log(service);
            }),
        catch: (cause) => new BonjourError({ cause }),
    });

    return { instance, advertise, discover } as const;
});

export class Bonjour extends Context.Tag("@apollo/cli/bonjour")<
    Bonjour,
    Effect.Effect.Success<typeof make>
>() {
    static layer = Layer.scoped(this, make);
}
