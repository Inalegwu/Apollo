import { BroadcastChannel } from "broadcast-channel";

export const newNodeBroadcastChannel = new BroadcastChannel<NewNodeChannel>(
    "new-node-channel",
);
