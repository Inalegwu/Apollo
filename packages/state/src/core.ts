import type {
    AppState,
    HistoryState,
    Node,
    PeerState,
    Transfer,
    TransferState,
} from "@apollo/types";
import { create } from "zustand";
import { persist, type PersistStorage } from "zustand/middleware";

export const coreAppState = (storage?: PersistStorage<unknown>) =>
    create<AppState>()(
        persist(
            (set) => ({
                applicationId: null,
                colorMode: "light",
                destinationFolder: null,
                deviceType: null,
                deviceName: null,
                port: 42069,
                saveTransferHistory: true,
                setApplicationId: (applicationId) =>
                    set((state) => ({ ...state, applicationId })),
                setDestinationFolder: (destinationFolder) =>
                    set((state) => ({ ...state, destinationFolder })),
                setDeviceName: (deviceName) =>
                    set((state) => ({ ...state, deviceName })),
                setPort: (port) => set((state) => ({ ...state, port })),
                toggleColorMode: () =>
                    set((state) => ({
                        ...state,
                        colorMode: state.colorMode === "dark"
                            ? "light"
                            : "dark",
                    })),
                toggleSaveTransferHistory: () =>
                    set((state) => ({
                        ...state,
                        saveTransferHistory: !state.saveTransferHistory,
                    })),
                setDeviceType: (deviceType) =>
                    set((state) => ({ ...state, deviceType })),
            }),
            {
                name: "app-state",
                storage,
            },
        ),
    );

export const corePeerState = (storage?: PersistStorage<unknown>) =>
    create<PeerState>()(persist((set) => ({
        neighbors: new Map<string, Node>(),
        favourites: new Map<string, Node>(),
        addToFavourites: (node) =>
            set((state) => {
                if (state.favourites.has(node.keychainId)) {
                    return state;
                }

                state.favourites.set(node.keychainId, node);

                return state;
            }),
        removeFromFavourites: (id) =>
            set((state) => {
                if (!state.favourites.has(id)) return state;

                state.favourites.delete(id);
                return state;
            }),
        addToNeigbhors: (node) =>
            set((state) => {
                if (state.neighbors.has(node.keychainId)) {
                    return state;
                }
                state.neighbors.set(node.keychainId, node);
                return state;
            }),
        removeFromNeighbors: (id) =>
            set((state) => {
                if (!state.neighbors.has(id)) return state;
                state.neighbors.delete(id);

                return state;
            }),
    }), { name: "peer-state", storage }));

export const coreTransferState = (storage?: PersistStorage<unknown>) =>
    create<TransferState>()(persist((set) => ({
        selectedFiles: new Set<string>(),
        addToSelectedFiles: (filePath) =>
            set((state) => {
                if (state.selectedFiles.has(filePath)) {
                    return state;
                }

                state.selectedFiles.add(filePath);

                return state;
            }),
    }), {
        name: "transfer-state",
        storage,
    }));

export const coreHistoryState = (storage?: PersistStorage<unknown>) =>
    create<HistoryState>()(persist((set) => ({
        filterBy: "newest",
        history: new Set<Transfer>(),
        setFilterBy: (filterBy) => set((state) => ({ ...state, filterBy })),
        addToHistory: (transfer) =>
            set((state) => {
                if (state.history.has(transfer)) {
                    return state;
                }

                state.history.add(transfer);

                return state;
            }),
        clearHistory: () =>
            set((state) => {
                state.history.clear();
                return state;
            }),
        removeFromHistory: (transfer) =>
            set((state) => {
                if (!state.history.has(transfer)) return state;

                state.history.delete(transfer);

                return state;
            }),
    }), {
        name: "history-state",
        storage,
    }));
