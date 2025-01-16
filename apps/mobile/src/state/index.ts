import {
  coreAppState,
  coreHistoryState,
  corePeerState,
  coreTransferState,
  createJSONStorage,
  makeSelectors,
} from "@apollo/state";
import { AsyncStorage } from "@react-native-async-storage/async-storage";

const storage = createJSONStorage(() => AsyncStorage);

export const appState = makeSelectors(coreAppState(storage));
export const peers = makeSelectors(corePeerState(storage));
export const transfers = makeSelectors(coreTransferState(storage));
export const history = makeSelectors(coreHistoryState(storage));
