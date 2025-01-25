export type DeviceType = "desktop" | "mobile";

export type AppState = {
    applicationId: string | null;
    deviceType: DeviceType | null;
    colorMode: "dark" | "light";
    destinationFolder: string | null;
    deviceName: string | null;
    port: number;
    saveTransferHistory: boolean;
    setApplicationId: (id: string) => void;
    toggleColorMode: () => void;
    setDestinationFolder: (path: string) => void;
    setDeviceName: (name: string) => void;
    setPort: (port: number) => void;
    toggleSaveTransferHistory: () => void;
    setDeviceType: (type: DeviceType) => void;
};

export type Node = {
    keychainId: string;
    deviceName: string;
    address: string;
};

export type PeerState = {
    neighbors: ReadonlyArray<Node>;
    favourites: ReadonlyArray<Node>;
    addToFavourites: (node: Node) => void;
    removeFromFavourites: (id: string) => void;
    addToNeigbhors: (node: Node) => void;
    removeFromNeighbors: (id: string) => void;
};

export type TransferState = {
    selectedFiles: ReadonlyArray<string>;
    addToSelectedFiles: (filePath: string) => void;
    removeFromSelectedFiles: (path: string) => void;
};

export type Transfer = Readonly<{
    id: string;
    fileName: string;
    destinationDeviceName: string;
    destinationDeviceId: string;
}>;

export type Session = Readonly<{
    id: string;
    nodeName: string;
    nodeKeychainID: string;
}>;

export type FilterBy = "newest" | "oldest" | "search";

export type HistoryState = {
    filterBy: FilterBy;
    history: Set<Transfer>;
    setFilterBy: (filterby: FilterBy) => void;
    addToHistory: (transfer: Transfer) => void;
    removeFromHistory: (transfer: Transfer) => void;
    clearHistory: () => void;
};
