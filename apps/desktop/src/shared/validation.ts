import { z } from "zod";

export const newNodeChannel = z.object({
    keychainId: z.string(),
    deviceName: z.string(),
    address: z.string(),
});
