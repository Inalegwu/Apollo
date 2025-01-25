import { ContextMenu, Flex, Text } from "@radix-ui/themes";
import { appState, peers } from "@shared/state";
import t from "@src/shared/config";
import { generateRandomName } from "@src/shared/utils";
import { createFileRoute } from "@tanstack/react-router";
import * as Array from "effect/Array";
import { Lock, RefreshCw } from "lucide-react";
import { useEffect } from "react";
import { v4 } from "uuid";
import { DeviceInfo, ThisDeviceInfo } from "../components";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const destinationPath = appState.use.destinationFolder();
  const setDestinationPath = appState.use.setDestinationFolder();
  const colorMode = appState.use.colorMode();
  const neighbors = Array.fromIterable(peers.use.neighbors());
  const favourites = Array.fromIterable(peers.use.favourites());

  const { mutate: defineDestination } = t.files.defineDestination.useMutation({
    onSuccess: (d) => {
      setDestinationPath(d.path);
    },
    onError: (e) => {
      console.error(e);
    },
  });

  const addNeighbor = peers.use.addToNeigbhors();

  t.node.neighborAdded.useSubscription(undefined, {
    onData: (node) => {
      addNeighbor(node);
    },
  });

  useEffect(() => {
    if (destinationPath === null) {
      defineDestination();
    }
  }, [defineDestination, destinationPath]);

  return (
    <ContextWrapper>
      <Flex
        grow="1"
        className="items-center justify-center"
        id={colorMode === "dark" ? "workspace_dark" : "workspace"}
      >
        {neighbors.map((node) => (
          <DeviceInfo node={node} key={node.keychainId} />
        ))}
        {favourites.map((node) => (
          <DeviceInfo node={node} key={node.keychainId} />
        ))}
        <ThisDeviceInfo />
      </Flex>
    </ContextWrapper>
  );
}

const ContextWrapper = ({ children }: { children: React.ReactNode }) => {
  const changeAppName = appState.use.setDeviceName();
  const changeAppId = appState.use.setApplicationId();

  const newAppName = () => changeAppName(generateRandomName());

  const newKeychainId = () => changeAppId(v4());

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>{children}</ContextMenu.Trigger>
      <ContextMenu.Content size="1" variant="soft">
        <ContextMenu.Item onClick={newKeychainId} className="cursor-pointer">
          <Flex width="100%" align="center" justify="between" gap="2">
            <Text size="1">New Keychain ID</Text>
            <Lock size={10} />
          </Flex>
        </ContextMenu.Item>
        <ContextMenu.Item onClick={newAppName} className="cursor-pointer">
          <Flex width="100%" align="center" justify="between" gap="2">
            <Text size="1">New Device Name</Text>
            <RefreshCw size={10} />
          </Flex>
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
};
