import { newNodeBroadcastChannel } from "@shared/broadcast-channel";
import { Console, Effect, Layer, Schedule } from "effect";
import { createSocket } from "node:dgram";
import { createServer } from "node:net";

const TCP_PORT = Math.floor(40067);
const UDP_PORT = Math.floor(42255);
const MULTICAST_ADDRESS = "239.255.255.250";

console.log(TCP_PORT, UDP_PORT);

const tcpServer = Effect.acquireRelease(
  Effect.sync(() => {
    const server = createServer((socket) => {
      Console.log(`Client connected ${socket.remoteAddress}`);
      socket.write("Hello from server \n");
      socket.end();
    });

    server.listen(TCP_PORT, () => {
      Console.log(`TCP Server Running on port ${TCP_PORT}`);
    });

    return server;
  }),
  (server) => Effect.sync(() => server.close()),
);

const udpBroadcast = Effect.gen(function* (_) {
  const udpSocket = yield* _(Effect.sync(() => createSocket("udp4")));

  yield* _(
    Effect.sync(() => {
      udpSocket.bind(UDP_PORT, () => {
        udpSocket.setBroadcast(true);
        udpSocket.setMulticastTTL(128);
        udpSocket.addMembership(MULTICAST_ADDRESS);
      });
    }),
  );

  yield* _(
    Effect.fork(
      Effect.repeat(
        Effect.gen(function* () {
          const message = `SERVICE_DISCOVERY:TCP_PORT=${TCP_PORT}`;

          // yield* Effect.logInfo("Attempting discovery");
          udpSocket.send(
            message,
            0,
            message.length,
            UDP_PORT,
            MULTICAST_ADDRESS,
            () => Console.log(`Broadcasted service prescence ${message}`),
          );
        }),
        Schedule.fixed(3500),
      ),
    ),
  );

  return udpSocket;
});

const connectToService = (address: string, port: number) =>
  Effect.sync(() => {
    Console.log(
      `Attempting to connect to service at address ${address} on port ${port}`,
    );

    const client = createServer(() => {
      Console.log(`Connected to TCP Service at ${address}:${port}`);
    });

    newNodeBroadcastChannel.postMessage({
      address: `${address}:${port}`,
      deviceName: "",
      keychainId: "",
    });

    client.listen(port, address);

    client.on("data", (data) => {
      Console.log(`Received from server: ${data}`);
      client.close();
    });

    client.on("end", () => {
      Console.log("Disconnected from server.");
    });

    client.on("error", (err) => {
      Console.log(`Error connecting to ${address}:${port} - ${err.message}`);
    });
  });

const udpListener = (udpSocket: ReturnType<typeof createSocket>) =>
  Effect.sync(() => {
    udpSocket.on("message", (message, rinfo) => {
      Console.log(`Received broadcast from ${rinfo.address}: ${message}`);

      const msgString = message.toString();

      if (msgString.startsWith("SERVICE_DISCOVERY:")) {
        const [_, portInfo] = msgString.split(":");
        const [key, port] = portInfo.split("=");

        if (key === "TCP_PORT") {
          const discoveredPort = Number.parseInt(port, 10);

          if (discoveredPort !== TCP_PORT) {
            connectToService(rinfo.address, discoveredPort);
          }
        }
      }
    });
  });

const make = Effect.gen(function* (_) {
  const udpSocket = yield* _(udpBroadcast);

  yield* _(udpListener(udpSocket));

  yield* _(tcpServer);
});

export const Discover = {
  Live: Layer.scopedDiscard(make),
};
