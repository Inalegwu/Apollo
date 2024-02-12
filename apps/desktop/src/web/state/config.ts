import { observable } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { Config } from "@src/shared/types";

export const config = observable<Config>({
  port: 42069,
  saveFolder: "",
  serverStatus: "running",
});

persistObservable(config, {
  local: "__config",
  pluginLocal: ObservablePersistLocalStorage,
});
