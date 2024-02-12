import { observable } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { Connection, Saved } from "@src/shared/types";

export const saved = observable<Saved>({
  connections: new Map<string, Connection>(),
});

persistObservable(saved, {
  local: "__saved",
  pluginLocal: ObservablePersistLocalStorage,
});
