import { noise } from "@chainsafe/libp2p-noise";
import { mplex } from "@libp2p/mplex";
import { tcp } from "@libp2p/tcp";
import { createLibp2p } from "libp2p";

export const node = await createLibp2p({
	transports: [tcp()],
	connectionEncryption: [noise()],
	streamMuxers: [mplex()],
});
