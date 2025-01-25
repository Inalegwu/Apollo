export enum FileTypes {
  MD = "md",
  TXT = "txt",
  DOCX = "docx",
}

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
