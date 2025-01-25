import type { Node } from "@apollo/types";
import { Button, Dialog, Flex, Popover, Text, Tooltip } from "@radix-ui/themes";
import { peers, transfers } from "@src/shared/state";
import {
  generateGradientColors,
  getFileExtensionFromPath,
  parseFileNameFromPath,
  randomNumber,
  randomNumberfromInterval,
} from "@src/shared/utils";
import * as Array from "effect/Array";
import { Key } from "lucide-react";
import { motion } from "motion/react";
import { memo, useCallback, useMemo, useState } from "react";
import { FileIcon } from "react-file-icon";
import Flatlist from "./flatlist";
import Icon from "./icon";

type Props = {
  node: Node;
};

const DeviceInfo = ({ node }: Props) => {
  const sendFiles = () => {};

  const top = useMemo(() => randomNumber(), []);
  const left = useMemo(() => randomNumber(), []);
  const [color1, color2] = useMemo(() => generateGradientColors(), []);
  const deg = useMemo(() => randomNumberfromInterval(0, 360), []);

  const selectedFiles = Array.fromIterable(
    transfers.use.selectedFiles().values(),
  );
  const isFavourited = !!peers.use
    .favourites()
    .find((ex) => ex.keychainId === node.keychainId);
  const insertInFavourites = peers.use.addToFavourites();
  const removeFromFavourites = peers.use.removeFromFavourites();

  console.log({ keychainID: node.keychainId, isFavourited });

  const [isOnline, _] = useState(navigator.onLine);

  const send = useCallback(() => sendFiles(), []);

  const addToFavourites = () => {
    console.log(isFavourited);
    if (isFavourited) {
      removeFromFavourites(node.keychainId);
    }
    insertInFavourites(node);
  };

  return (
    <motion.div
      animate={{ opacity: 1, display: "block" }}
      exit={{ opacity: 0, display: "none" }}
    >
      <Popover.Root>
        <Popover.Trigger>
          <div
            style={{
              left: `${left}px`,
              top: `${top}px`,
              background: `linear-gradient(${deg}deg,${color1},${color2})`,
            }}
            className="absolute shadow-xl dark:shadow-neutral-800/80 w-11 h-11 rounded-full cursor-pointer border-1 border-solid border-zinc-200 dark:border-zinc-800 dark:shadow-zinc-300/3"
          />
        </Popover.Trigger>
        <Popover.Content
          size="1"
          className="bg-moonlightWhite dark:bg-moonlightFocusMedium"
        >
          <Flex direction="column" gap="1" className="space-y-2">
            <Flex
              align="center"
              className="px-1 -space-y-1"
              justify="between"
              gap="3"
            >
              <Flex
                direction="column"
                align="start"
                width="100%"
                className="-space-y-1"
                justify="between"
              >
                <Text size="1" color="gray">
                  Device Name
                </Text>
                <Text size="2" weight="medium">
                  {node.deviceName}
                </Text>
              </Flex>
              <Flex align="center" justify="end">
                <Button
                  variant="soft"
                  onClick={addToFavourites}
                  className="w-7 h-7 rounded-full cursor-pointer transition outline-none"
                  color={isFavourited ? "tomato" : "gray"}
                  size="1"
                  radius="full"
                >
                  {isFavourited ? (
                    <Icon name="Heart" size={10} />
                  ) : (
                    <Icon name="HeartCrack" size={10} />
                  )}
                </Button>
              </Flex>
            </Flex>
            <Flex
              className="bg-neutral-100/50 space-y-1 dark:bg-moonlightFocusHigh border-1 border-solid border-neutral-200/50 dark:border-neutral-700/30 p-3 rounded-md"
              direction="column"
              align="start"
            >
              <Tooltip content="Neighbors Keychain ID">
                <Flex width="100%" align="center" justify="between" gap="4">
                  <Text size="1" weight="medium">
                    {node.keychainId}
                  </Text>
                  <Key size={9} className="text-zinc-400" />
                </Flex>
              </Tooltip>
            </Flex>
            {Array.isNonEmptyArray(selectedFiles) && (
              <Flex gap="1">
                <Button
                  onClick={send}
                  variant="soft"
                  className="cursor-pointer grow-1"
                  size="1"
                  color="indigo"
                >
                  <Flex align="center" justify="start" gap="3">
                    <Text size="1">Send {selectedFiles.length} Files</Text>
                  </Flex>
                </Button>
                <Tooltip content="See Files">
                  <ViewFiles />
                </Tooltip>
              </Flex>
            )}
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </motion.div>
  );
};

export default DeviceInfo;

const ViewFiles = memo(() => {
  const selectedFiles = Array.fromIterable(transfers.use.selectedFiles())
    .map((value) => ({ path: value }))
    .sort((a, b) => (a.path >= b.path ? 1 : -1));

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button
          variant="soft"
          color="gray"
          className="cursor-pointer bg-moonlightStone/20 dark:bg-moonlightFocusHigh border-1 border-moonlightSlight/30 border-solid"
          size="1"
        >
          <Icon name="ChevronUp" size={11} />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content
        aria-describedby="Send List"
        className="bg-moonlightWhite dark:bg-moonlightFocusLow overflow-hidden"
      >
        <Flatlist
          data={selectedFiles}
          scrollbars="vertical"
          listHeaderComponent={() => (
            <>
              <Flex align="center" justify="between">
                <Dialog.Title>
                  <Text
                    size="5"
                    weight="medium"
                    className="text-moonlightIndigo dark:text-moonlightWhite"
                  >
                    Send List
                  </Text>
                </Dialog.Title>
                <Dialog.Close className="text-red-500 cursor-pointer">
                  <button type="button">
                    <Icon name="X" size={13} />
                  </button>
                </Dialog.Close>
              </Flex>
            </>
          )}
          renderItem={({ item, index }) => (
            <>
              <Flex
                align="center"
                justify="between"
                gap="3"
                className="py-3"
                key={index}
              >
                <Flex direction="column" className="space-y-[1px]">
                  <Text
                    size="2"
                    weight="medium"
                    className="text-moonlightBase dark:text-moonlightWhite"
                  >
                    {parseFileNameFromPath(item.path)}
                  </Text>
                  <Text size="1" className="text-moonlightSlight">
                    {item.path.slice(0, item.path.length * 0.6)}...
                  </Text>
                </Flex>
                <div
                  style={{
                    WebkitFontSmoothing: "antialiased",
                    width: 42,
                    height: 42,
                  }}
                >
                  <FileIcon
                    labelUppercase
                    color="#1A1B1F"
                    glyphColor="#C58FFF"
                    radius={5}
                    labelColor="#0F1014"
                    labelTextColor="#C58FFF"
                    gradientColor="#575861"
                    type="document"
                    extension={getFileExtensionFromPath(item.path)}
                  />
                </div>
              </Flex>
            </>
          )}
        />
      </Dialog.Content>
    </Dialog.Root>
  );
});

// {
//   selectedFiles.map((item) => (
//     <Flex align="center" key={item} justify="between">
//       <Text>{parseFileNameFromPath(item)}</Text>
//       {/* <Text>{getFileExtensionFromPath(item.get() || "")}</Text> */}
//       <FileIcon extension={getFileExtensionFromPath(item)} />
//     </Flex>
//   ));
// }
