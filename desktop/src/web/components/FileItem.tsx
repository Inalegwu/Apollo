import {
  Archive,
  Code,
  File,
  Image,
  TrashSimple,
  Video,
} from "@phosphor-icons/react";
import { Button, Flex, Text } from "@radix-ui/themes";
import { FileParseResponse, FileTypes } from "@src/shared/types";
import { useCallback } from "react";
import { transferFiles } from "../state";

type Props = {
  file: FileParseResponse;
};

function switchFileIcon(ext: FileTypes) {
  switch (ext) {
    case FileTypes.archive:
      return <Archive size={16} className="text-[#32FFE775]" />;
    case FileTypes.img:
      return <Image size={16} className="text-[#32FFE775]" />;
    case FileTypes.doc:
      return <File size={16} className="text-[#32FFE775]" />;

    case FileTypes.vid:
      return <Video size={16} className="text-[#32FFE775]" />;

    case FileTypes.unknown:
      return <File size={16} className="text-[#32FFE775]" />;

    case FileTypes.code:
      return <Code size={16} className="text-[#32FFE775]" />;

    default:
      return <File size={16} className="text-[#32FFE775]" />;
  }
}

export default function FileItem(props: Props) {
  const removeFileFromTransferList = useCallback(() => {
    transferFiles.files.set([
      ...transferFiles.files
        .get()
        .filter((v) => v.fileName !== props.file.fileName),
    ]);
  }, [props.file]);

  return (
    <Flex
      align="center"
      justify="between"
      className="bg-gray-200/10 px-2 py-2 rounded-md border-1 border-solid border-white/10"
    >
      <Flex direction="column" align="start" className="space-y-[0.5px]">
        <Text className="text-white/70 text-xs">{props.file.fileName}</Text>
        <Text className="text-gray-200/30 text-xs">{props.file.fileType}</Text>
      </Flex>
      <Flex align="center" gap="1" className="px-2">
        <Button
          onClick={removeFileFromTransferList}
          variant="ghost"
          color="red"
          className="w-4 h-6 rounded-md"
        >
          <TrashSimple />
        </Button>
      </Flex>
    </Flex>
  );
}
