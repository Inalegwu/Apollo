import type { AppState } from "@apollo/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const _ = create<AppState>()(
    persist(
        (set) => ({
            applicationId: null,
            colorMode: "dark",
            destinationFolder: null,
            deviceName: null,
            deviceType: "desktop",
            port: 42069,
            saveTransferHistory: false,
            setApplicationId: (applicationId) =>
                set((state) => ({ ...state, applicationId })),
            setDestinationFolder: (destinationFolder) =>
                set((state) => ({ ...state, destinationFolder })),
            setDeviceName: (deviceName) =>
                set((state) => ({ ...state, deviceName })),
            setPort: (port) => set((state) => ({ ...state, port })),
            setDeviceType: (deviceType) =>
                set((state) => ({ ...state, deviceType })),
            toggleColorMode: () =>
                set((state) => ({
                    ...state,
                    colorMode: state.colorMode === "dark" ? "light" : "dark",
                })),
            toggleSaveTransferHistory: () =>
                set((state) => ({
                    ...state,
                    saveTransferHistory: !state.saveTransferHistory,
                })),
        }),
        { name: "app-state" },
    ),
);

type CTransfer = {
    selectedFiles: ReadonlyArray<string>;
    addToSelectedFiles: (path: string) => void;
    removeFromSelectedFiles: (path: string) => void;
};

const m = create<CTransfer>((set) => ({
    selectedFiles: [],
    addToSelectedFiles: (path) =>
        set((state) => ({
            ...state,
            selectedFiles: state.selectedFiles.includes(path)
                ? state.selectedFiles
                : [...state.selectedFiles, path],
        })),
    removeFromSelectedFiles: (path) =>
        set((state) => ({
            ...state,
            selectedFiles: state.selectedFiles.filter((v) => v !== path),
        })),
}));
