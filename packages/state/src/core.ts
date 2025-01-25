import type {
    AppState,
    HistoryState,
    PeerState,
    Transfer,
    TransferState,
} from "@apollo/types";
import { create } from "zustand";
import type { PersistStorage } from "zustand/middleware";
import { persist } from "zustand/middleware";

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
        neighbors: [],
        favourites: [],
        addToFavourites: (node) =>
            set((state) => ({
                ...state,
                neighbors: state.neighbors.filter((ex) =>
                    ex.keychainId === node.keychainId
                ),
                favourites: state.favourites.includes(node)
                    ? state.favourites
                    : [...state.favourites, node],
            })),
        removeFromFavourites: (id) =>
            set((state) => ({
                ...state,
                favourites: state.favourites.filter((node) =>
                    node.keychainId !== id
                ),
            })),
        addToNeigbhors: (node) =>
            set((state) => ({
                ...state,
                neighbors: state.neighbors.includes(node)
                    ? state.neighbors
                    : [...state.neighbors, node],
            })),
        removeFromNeighbors: (id) =>
            set((state) => ({
                ...state,
                neighbors: state.neighbors.filter((node) =>
                    node.keychainId !== id
                ),
            })),
    }), { name: "peer-state", storage }));

export const coreTransferState = (storage?: PersistStorage<unknown>) =>
    create<TransferState>()(persist((set) => ({
        selectedFiles: [],
        addToSelectedFiles: (filePath) =>
            set((state) => ({
                ...state,
                selectedFiles: state.selectedFiles.includes(filePath)
                    ? state.selectedFiles
                    : [...state.selectedFiles, filePath],
            })),
        removeFromSelectedFiles: (filePath) =>
            set((state) => ({
                ...state,
                selectedFiles: state.selectedFiles.filter((path) =>
                    path !== filePath
                ),
            })),
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
