import bonjour, { type ServiceOptions } from "bonjour";
import { Console, Context, Effect, Layer } from "effect";
import { BonjourError } from "./error";

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
        try: () =>
            instance.publish({
                name: serviceName,
                type,
                protocol,
                port,
            }),
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

    const stop = () =>
        Effect.try({
            try: () => instance.destroy(),
            catch: (cause) => new BonjourError({ cause }),
        });

    return { instance, advertise, discover, stop } as const;
});

export class Bonjour extends Context.Tag("@apollo/cli/bonjour")<
    Bonjour,
    Effect.Effect.Success<typeof make>
>() {
    static layer = Layer.scoped(this, make);
}
