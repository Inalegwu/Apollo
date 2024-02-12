import { useObserveEffect } from "@legendapp/state/react";
import { ArrowCounterClockwise, Stop } from "@phosphor-icons/react";
import {
  Box,
  Button,
  Flex,
  Tabs,
  Text,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import { trpc } from "@src/shared/config";
import { Reason } from "@src/shared/types";
import { capitalize } from "@src/shared/utils";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useCallback } from "react";
import { config } from "../state";

export enum Tab {
  Appearance = "001",
  Advance = "004",
}

export const Route = createLazyFileRoute("/settings")({
  component: Settings,
});

function Settings() {
  const { mutate: changeSaveFolder, data } =
    trpc.files.selectSaveFolder.useMutation({
      onSuccess: (r) => {
        if (r.reason === Reason.CANCELED) {
          return;
        }

        config.saveFolder.set(r.data[0]);
      },
    });

  useObserveEffect(
    () => {
      const restartInterval = setInterval(() => {
        if (config.serverStatus.get() === "stopped") {
          config.serverStatus.set("running");
        }
      }, 5000);

      return () => {
        clearInterval(restartInterval);
      };
    },
    {
      immediate: true,
    },
  );

  const stopServer = useCallback(() => {
    config.serverStatus.set("stopped");
  }, []);

  const restartServer = useCallback(() => {
    const serverStatus = config.serverStatus.get();

    if (serverStatus === "running") {
      config.serverStatus.set("stopped");
    }

    if (serverStatus === "stopped") {
      config.serverStatus.set("running");
    }
  }, []);

  return (
    <Flex className="w-full">
      <Tabs.Root className="w-full py-1" defaultValue={Tab.Advance}>
        <Tabs.List color="gray">
          <Tabs.Trigger className="px-4" value={Tab.Appearance}>
            Appearance
          </Tabs.Trigger>
          <Tabs.Trigger className="px-4" value={Tab.Advance}>
            Advanced
          </Tabs.Trigger>
        </Tabs.List>
        <Box px="3" pt="3" pb="2">
          <Tabs.Content value={Tab.Appearance}>
            <Flex grow="1" align="center" justify="between">
              <Flex direction="column">
                <Text size="2">Dark Mode</Text>
                <Text size="1" className="text-gray-500/30">
                  Stay in the dark side or choose the light side
                </Text>
              </Flex>
              {/* <Switch
                onClick={changeColorMode}
                defaultChecked
                variant="surface"
                size="1"
              /> */}
            </Flex>
          </Tabs.Content>
          <Tabs.Content value={Tab.Advance}>
            <Flex direction="column" gap="1">
              <Text size="3">Server Settings</Text>
              {/* server port */}
              <Flex align="center" justify="between" className="mt-2">
                <Text size="2">Port</Text>
                <TextField.Root>
                  <TextField.Input
                    type="number"
                    onChange={(e) =>
                      config.port.set(parseInt(e.currentTarget.value))
                    }
                    defaultValue={config.port.get()}
                  />
                </TextField.Root>
              </Flex>
              {/* save folder */}
              <Flex align="center" justify="between" className="mt-2">
                <Text size="2">Save Folder</Text>
                <Box
                  onClick={() => changeSaveFolder()}
                  className="bg-gray-200/10 p-2 border-1 border-solid cursor-pointer border-white/10 rounded-md  max-w-[40%] text-xs text-gray-200/30"
                >
                  {config.saveFolder.get()}
                </Box>
              </Flex>
              <Flex align="center" justify="between" className="mt-5">
                <Text size="2">Server Status</Text>
                <Flex direction="column" gap="1">
                  <Box className="bg-gray-200/10 rounded-md text-sm flex items-center justify-center px-4 py-[.3em] border-1 border-solid border-white/10 text-gray-200/30">
                    {capitalize(config.serverStatus.get())}
                  </Box>
                  <Flex
                    align="center"
                    justify="center"
                    className="mt-1"
                    gap="5"
                  >
                    <Tooltip content="Stop Server" side="bottom">
                      <Button
                        variant="ghost"
                        color="red"
                        className="bg-red-300/20 w-3 h-4"
                        onClick={stopServer}
                      >
                        <Stop />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Restart Server" side="bottom">
                      <Button
                        variant="ghost"
                        color="gray"
                        className="bg-gray-300/20 w-3 h-4"
                        onClick={restartServer}
                      >
                        <ArrowCounterClockwise />
                      </Button>
                    </Tooltip>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Flex>
  );
}
