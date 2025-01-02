import type { AppState, Node, PeerState, TransferState } from "@apollo/types";
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
        favourites: new Set<Node>(),
        addToFavourites: (node) =>
            set((state) => {
                if (state.favourites.has(node)) {
                    return state;
                }

                state.favourites.add(node);

                return state;
            }),
        removeFromFavourites: (node) =>
            set((state) => {
                if (!state.favourites.has(node)) return state;

                state.favourites.delete(node);
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
