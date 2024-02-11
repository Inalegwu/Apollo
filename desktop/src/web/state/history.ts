import { observable } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { Connection, History, TransferHistory } from "@src/shared/types";

export const history = observable<History>({
  transfer: new Map<string, TransferHistory>(),
  connection: new Map<string, Connection>(),
});

persistObservable(history, {
  local: "__history",
  pluginLocal: ObservablePersistLocalStorage,
});
