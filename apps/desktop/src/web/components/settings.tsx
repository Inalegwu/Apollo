import {
  Button,
  Flex,
  Select,
  Switch as SwitchButton,
  Text,
} from "@radix-ui/themes";
import t from "@src/shared/config";
import { appState } from "@src/shared/state";
import { Folder, X } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useState } from "react";
import About from "./about";

type SettingsProps = {
  toggleSettings: React.Dispatch<React.SetStateAction<boolean>>;
};

type ViewTypes = "files" | "transfers";

export default function Settings({ toggleSettings }: SettingsProps) {
  const [view, setView] = useState<ViewTypes>("transfers");

  const switchView = useCallback((view: ViewTypes) => {
    switch (view) {
      case "files": {
        return <Files />;
      }
      case "transfers": {
        return <Transfers />;
      }
      default: {
        return null;
      }
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute z-20 w-full h-screen flex items-center justify-center shadow-xl tracking-[5px]"
    >
      <Flex className="w-5/6 h-4/6 bg-light-1 dark:bg-moonlightBase rounded-lg overflow-hidden border-1 border-solid border-zinc-200 dark:border-zinc-800">
        {/* sidebar */}
        <Flex
          direction="column"
          align="start"
          justify="between"
          className="w-2/6 h-full bg-white dark:bg-moonlightFocusLow border-r-1 border-r-solid border-r-zinc-200 dark:border-r-zinc-800"
        >
          <Flex direction="column" align="start" className="w-full">
            <Flex align="center" justify="start" className="px-3 py-2">
              <button
                type="button"
                onClick={() => toggleSettings(false)}
                className="w-2.5 h-4.5 rounded-full cursor-pointer"
              >
                <X
                  size={11}
                  className="text-moonlightBase dark:text-moonlightSlight"
                />
              </button>
            </Flex>
            <Flex direction="column" align="start" className="w-full" grow="1">
              <Flex
                onClick={() => setView("transfers")}
                className="w-full px-2 py-2 cursor-pointer hover:bg-zinc-100/40 dark:hover:bg-zinc-800/40"
              >
                <Text
                  size="1"
                  weight="medium"
                  className={`${view === "transfers" ? "text-moonlightIndigo" : "text-moonlightSlight"}`}
                >
                  Transfers
                </Text>
              </Flex>
              <Flex
                onClick={() => setView("files")}
                className="w-full px-2 py-2 cursor-pointer hover:bg-zinc-100/40 dark:hover:bg-zinc-800/40"
              >
                <Text
                  size="1"
                  weight="medium"
                  className={`${view === "files" ? "text-moonlightIndigo" : "text-moonlightSlight"}`}
                >
                  Files & Folders
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex className="px-3 py-2 w-full" align="center" justify="between">
            <About />
          </Flex>
        </Flex>
        <Flex className="w-4/6 h-full px-3 py-3">{switchView(view)}</Flex>
      </Flex>
    </motion.div>
  );
}

function Files() {
  const setDestinationPath = appState.use.setDestinationFolder();
  const destinationPath = appState.use.destinationFolder();

  const { mutate: changeFolder } = t.files.changeDestination.useMutation({
    onSuccess: (d) => {
      if (d.cancelled || d.path === null) return;
      setDestinationPath(d.path);
    },
  });

  return (
    <Flex className="w-full h-full" direction="column" gap="5" align="start">
      <Flex className="w-full" direction="column" gap="2">
        <Flex className="w-full" align="center" justify="between">
          <Flex direction="column" className="space-y-0.5" align="start">
            <Text
              size="1"
              className="text-moonlightBase dark:text-moonlightWhite"
              weight="medium"
            >
              Destination directory
            </Text>
            <Text size="1" className="text-moonlightSlight" weight="medium">
              Change what folder recieved files are saved to
            </Text>
          </Flex>
          <Button
            variant="soft"
            color="gray"
            size="1"
            className="cursor-pointer"
            onClick={() => changeFolder()}
          >
            <Flex align="center" justify="start" gap="1">
              <Folder size={10} />
              <Text weight="medium">Select Folder</Text>
            </Flex>
          </Button>
        </Flex>
        <Text size="1" weight="medium" className="text-moonlightSlight">
          Current Directory: {destinationPath}
        </Text>
      </Flex>
    </Flex>
  );
}

function Transfers() {
  const canSaveTransfer = appState.use.saveTransferHistory();
  const toggleSaveTransferHistory = appState.use.toggleSaveTransferHistory();

  console.log({ saveTransferHistory: canSaveTransfer });

  return (
    <Flex direction="column" align="start" gap="5" className="w-full h-full">
      <Flex className="w-full" align="center" justify="between">
        <Flex direction="column" align="start">
          <Text
            size="1"
            weight="medium"
            className="text-moonlightBase dark:text-moonlightWhite"
          >
            Transfer history
          </Text>
          <Text size="1" weight="medium" className="text-moonlightSlight">
            View transfers incoming and outgoing on this device
          </Text>
        </Flex>
        <SwitchButton
          size="1"
          variant="soft"
          color="gray"
          onClick={() => toggleSaveTransferHistory()}
          checked={canSaveTransfer}
        />
      </Flex>
      <Flex className="w-full" align="center" justify="between">
        <Flex direction="column" align="start">
          <Text
            size="1"
            weight="medium"
            className="text-moonlightBase dark:text-moonlightWhite"
          >
            Save transfer history
          </Text>
          <Text size="1" weight="medium" className="text-moonlightSlight">
            Transfer history save duration
          </Text>
        </Flex>
        <Select.Root size="1" defaultValue="3D">
          <Select.Trigger
            radius="large"
            disabled={false}
            variant="surface"
            color="gray"
            // className="bg-light-1 dark:bg-dark-8 cursor-pointer"
          />
          <Select.Content
            variant="soft"
            defaultValue="4D"
            className="flex flex-col items-start bg-light-1 dark:bg-dark-8 text-[11px]"
          >
            <Select.Item
              disabled={false}
              className="cursor-pointer"
              value="none"
            >
              <Text weight="medium" size="1">
                None
              </Text>
            </Select.Item>
            <Select.Item disabled={false} className="cursor-pointer" value="1D">
              <Text weight="medium" size="1">
                1 Days
              </Text>
            </Select.Item>
            <Select.Item disabled={false} className="cursor-pointer" value="2D">
              <Text weight="medium" size="1">
                2 Days
              </Text>
            </Select.Item>
            <Select.Item disabled={false} className="cursor-pointer" value="3D">
              <Text weight="medium" size="1">
                3 Days
              </Text>
            </Select.Item>
            <Select.Item disabled={false} className="cursor-pointer" value="4D">
              <Text weight="medium" size="1">
                4 Days
              </Text>
            </Select.Item>
          </Select.Content>
        </Select.Root>
      </Flex>
    </Flex>
  );
}
