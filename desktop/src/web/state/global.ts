import { observable } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { Global } from "@shared/types";

export const globalState$ = observable<Global>({
  applicationId: undefined,
  firstLaunch: true,
  alias: undefined,
});

persistObservable(globalState$, {
  local: "global_state",
  pluginLocal: ObservablePersistLocalStorage,
});
