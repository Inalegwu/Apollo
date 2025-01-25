import type { z } from "zod";
import type { newNodeChannel } from "./shared/validation";

declare global {
    export type NewNodeChannel = z.infer<typeof newNodeChannel>;
}
