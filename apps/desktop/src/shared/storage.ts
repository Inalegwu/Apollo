import type { Session, Transfer } from "@apollo/types";
import { Collection, createLocalStorageAdapter } from "signaldb";

const store = new Collection<Transfer>({
  persistence: createLocalStorageAdapter("transfer-history"),
});

export const sessions = new Collection<Session>();

export default store;
