import { Box, Flex, Popover, Text } from "@radix-ui/themes";
import { appState, transfers } from "@shared/state";
import {
  generateGradientColors,
  generateRandomName,
  randomNumberfromInterval,
} from "@src/shared/utils";
import { memo, useEffect, useMemo, useState } from "react";
import { v4 } from "uuid";
import Icon from "./icon";

const ThisDeviceInfo = memo(() => {
  const deviceName = appState.use.deviceName();
  const deviceID = appState.use.applicationId();
  const setDeviceId = appState.use.setApplicationId();
  const setDeviceName = appState.use.setDeviceName();
  const selectedFiles = Array.from(transfers.use.selectedFiles().values());

  const [color1, color2] = useMemo(() => generateGradientColors(), []);
  const deg = useMemo(() => randomNumberfromInterval(0, 360), []);

  const [onlineStatus, _] = useState(navigator.onLine);

  console.log(selectedFiles);
  useEffect(() => {
    if (deviceID === null) {
      setDeviceId(v4());
    }

    if (deviceName === null) {
      setDeviceName(generateRandomName());
    }
  }, [deviceID, deviceName, setDeviceId, setDeviceName]);

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Box
          style={{
            background: `linear-gradient(${deg}deg,${color1},${color2})`,
          }}
          className="w-11 h-11 rounded-full overflow-hidden shadow-xl dark:shadow-neutral-800/80 cursor-pointer border-1 border-solid border-zinc-200 dark:border-zinc-800"
        />
      </Popover.Trigger>
      <Popover.Content
        size="1"
        className="bg-moonlightWhite dark:bg-moonlightFocusMedium"
      >
        <Flex direction="column" gap="2" align="start">
          <Flex
            align="start"
            direction="column"
            width="100%"
            className="pr-3 pl-1 -space-y-1"
          >
            <Text size="1" weight="regular" className="text-moonlightSlight">
              This Device
            </Text>
            <Flex align="center" justify="between" width="100%">
              <Text size="2" className="text-moonlightIndigo" weight="medium">
                {deviceName}
              </Text>
              <span className="text-moonlightSlight">
                <Icon name="Laptop" size={11} />
              </span>
            </Flex>
          </Flex>
          <Flex
            gap="1"
            direction="column"
            className="bg-neutral-100/50 dark:bg-moonlightFocusHigh border-1 border-solid border-neutral-200/50 dark:border-neutral-700/30 p-3 rounded-md"
            width="100%"
            align="start"
          >
            <Flex width="100%" align="center" justify="between" gap="4">
              <Text size="1" color="gray" weight="medium">
                {selectedFiles.length} selected files
              </Text>
              <Icon name="Folder" size={10} className="text-moonlightSlight" />
            </Flex>
            <Flex width="100%" align="center" justify="between" gap="4">
              <Text size="1" color="gray" weight="medium">
                {deviceID?.slice(0, deviceID.length)}
              </Text>
              <Icon name="Key" size={10} className="text-moonlightSlight" />
            </Flex>
            <Flex width="100%" align="center" justify="between" gap="4">
              <Text color="gray" size="1" weight="medium">
                You are{" "}
                <Text size="1" color={onlineStatus ? "grass" : "tomato"}>
                  {onlineStatus ? "Online" : "Offline"}
                </Text>
              </Text>
              <Text size="1" color={onlineStatus ? "grass" : "tomato"}>
                {onlineStatus ? (
                  <Icon name="Wifi" size={9} />
                ) : (
                  <Icon name="WifiOff" size={9} />
                )}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
});

export default ThisDeviceInfo;
