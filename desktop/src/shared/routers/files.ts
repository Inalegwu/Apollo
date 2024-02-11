import { publicProcedure, router } from "@src/trpc";
import { dialog } from "electron";
import { Reason } from "../types";
import { parseFilePath } from "../utils";

export const fileRouter = router({
  selectFiles: publicProcedure.mutation(async ({ ctx }) => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      buttonLabel: "Select Files",
      defaultPath: ctx.app.getPath("documents"),
      properties: ["multiSelections"],
    });

    if (canceled) {
      return {
        status: false,
        reason: Reason.CANCELED,
        data: [],
      };
    }

    const mappedFilePath = filePaths.map((v) => parseFilePath(v));

    return {
      status: true,
      data: mappedFilePath,
    };
  }),
  selectSaveFolder: publicProcedure.mutation(async ({ ctx }) => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      title: "Select Save Folder",
      defaultPath: ctx.app.getPath("downloads"),
      buttonLabel: "Select Folder",
      properties: ["createDirectory", "openDirectory"],
    });

    if (canceled) {
      return {
        status: false,
        reason: Reason.CANCELED,
        data: [],
      };
    }

    return {
      status: true,
      data: filePaths,
      reason: Reason.NONE,
    };
  }),
});
