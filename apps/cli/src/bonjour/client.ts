import bonjour, { type ServiceOptions } from "bonjour";
import { Console, Context, Effect, Layer } from "effect";
import { BonjourError } from "./error";

const make = Effect.gen(function* () {
    const bonjourInstance = yield* Effect.succeed(
        bonjour(),
    );

    const advertise = (
        serviceName: string,
        port: number,
        type: string,
        protocol: ServiceOptions["protocol"] = "tcp",
    ) => Effect.try({
        try: () => {
            Console.log(`Advertising ${serviceName}:${type} on port ${port}`);

            return bonjourInstance.publish({
                name: serviceName,
                type,
                protocol,
                port,
            });
        },
        catch: (cause) => new BonjourError({ cause }),
    });

    const discover = (type: string, protocol = "tcp") =>
        Effect.try({
            try: () =>
                bonjourInstance.find({ type, protocol }, (service) => {
                    Console.log(service);
                }),
            catch: (cause) => new BonjourError({ cause }),
        });

    const stop = () =>
        Effect.try({
            try: () => bonjourInstance.destroy(),
            catch: (cause) => new BonjourError({ cause }),
        });

    return { advertise, discover, stop } as const;
});

export class Bonjour extends Context.Tag("@apollo/cli/bonjour")<
    Bonjour,
    Effect.Effect.Success<typeof make>
>() {
    static layer = Layer.effect(this, make);
}
