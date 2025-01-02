import {
  coreAppState,
  corePeerState,
  coreTransferState,
  makeSelectors,
} from "@apollo/state";

export const appState = makeSelectors(coreAppState());
export const peers = makeSelectors(corePeerState());
export const transfers = makeSelectors(coreTransferState());
