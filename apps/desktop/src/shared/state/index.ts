import {
    coreAppState,
    coreHistoryState,
    corePeerState,
    coreTransferState,
    createJSONStorage,
    makeSelectors,
} from "@apollo/state";

const localStorage = createJSONStorage(() => window.localStorage);
const sessionStorage = createJSONStorage(() => window.sessionStorage);

export const appState = makeSelectors(coreAppState(localStorage));

export const transfers = makeSelectors(
    coreTransferState(),
);

export const peers = makeSelectors(
    corePeerState(localStorage),
);

export const history = makeSelectors(
    coreHistoryState(localStorage),
);
