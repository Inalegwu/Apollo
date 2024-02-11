import { observable } from "@legendapp/state";
import { FileParseResponse } from "@src/shared/types";

export const transferFiles = observable<{
  files: FileParseResponse[];
}>({
  files: [],
});
