import type { Node } from "@apollo/types";
import { newNodeBroadcastChannel } from "@shared/broadcast-channel";
import { publicProcedure, router } from "@src/trpc";
import { observable } from "@trpc/server/observable";

export const nodeRouter = router({
  // transferUpdate: publicProcedure.subscription(observable((emit) => {})),
  neighborAdded: publicProcedure.subscription(() =>
    observable<Node>((emit) => {
      const handler = (e: NewNodeChannel) => {
        emit.next(e as Node);
      };

      newNodeBroadcastChannel.addEventListener("message", handler);

      return () => {
        newNodeBroadcastChannel.removeEventListener("message", handler);
      };
    })
  ),
});
