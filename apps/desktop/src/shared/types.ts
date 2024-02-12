export type ColorMode = "dark" | "light";

// Server state
export type ServerStatus = "running" | "idle" | "stopped";

export type Global = {
  // identifies this users application instance
  // and will be used to identify this instance
  // over the network
  // is not changeable , the id assigned on first
  // launch will remain permanently
  applicationId: string | undefined;
  // determines whether or not this is the users
  // first time launching the app
  // to assign them a unique identifier or not
  firstLaunch: boolean;
  // device alias
  // a name that can be used to identify
  // the users device , not necessarily unique
  // but is used to identify the device on another
  // client
  alias: string | undefined;
};

export type Config = {
  // port the share server will exist on
  // this , this might not be the route I'll
  // take but it exists
  port: number;
  // destination folder for recieved
  // files
  saveFolder: string;
  // the state of the server
  serverStatus: ServerStatus;
};

// Reasons for a mutation/query cancellation
export enum Reason {
  // operation was cancelled by users
  CANCELED = "001",
  // reason unavailable
  // operation most likely
  // completed
  NONE = "000",
}

// specifies what device type the reciever
// is on the protocol
export type DeviceType = "PC" | "Phone";

// file type definitions for the ui
export enum FileTypes {
  unknown = "Unknown",
  doc = "Document",
  img = "Image",
  vid = "Video",
  archive = "Archive",
  code = "Code",
}

// used to parse files that have been selected
// into an app friendly format
export type FileParseResponse = {
  fileName: string;
  fileExtension: string;
  fileType: FileTypes;
};

// metadata for a transfer object
// this is the information that will be
// saved
export type Transfer = {
  id: string;
  senderId: string;
  recieverId: string;
  fileName: string;
  fileType: FileTypes;
  deviceType: string;
};

// maintain a record of the transfers a user
// has made
export type TransferHistory = Transfer[];

// the various types of history
// within the applications
export type History = {
  // History of all transfers carried
  // out within apollo
  transfer: Map<string, TransferHistory>;
  // History of all connected devices
  // to this apollo instance
  connection: Map<string, Connection>;
};

// Metadata of a potential connection
export type Connection = {
  id: string;
  alias: string;
  deviceType: DeviceType;
  connectedAt: number;
};

export type Saved = {
  // Connections the user has saved
  // within their instance for easy
  // retransfers and to prevent frequent
  // rediscovery
  // In an event the saved connections identification
  // is changed , the save will be useless and transfers won't work
  connections: Map<string, Connection>;
};
