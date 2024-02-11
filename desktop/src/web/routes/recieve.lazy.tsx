import { useObservable, useObserveEffect } from "@legendapp/state/react";
import { ArrowClockwise, WifiHigh } from "@phosphor-icons/react";
import { Button, Flex, Text, Tooltip } from "@radix-ui/themes";
import { generateRandomAlias } from "@src/shared/utils";
import { globalState$ } from "@src/web/state";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useCallback } from "react";

export const Route = createLazyFileRoute("/recieve")({
  component: Recieve,
});

function Recieve() {
  const discovering = useObservable<boolean>(true);
  const alias = globalState$.alias.get();

  const tip = useObservable<boolean>(true);

  useObserveEffect((e) => {
    if (alias === undefined) {
      globalState$.alias.set(generateRandomAlias());
    }

    const timeOut = setTimeout(() => {
      tip.set(false);
    }, 5000);

    e.onCleanup = () => {
      clearTimeout(timeOut);
    };
  });

  const { applicationId } = globalState$.get();

  const generateNewAlias = useCallback(() => {
    const newAlias = generateRandomAlias();

    globalState$.alias.set(newAlias);
  }, []);

  return (
    <Flex
      className="w-full"
      direction="column"
      align="center"
      justify="between"
      gap="3"
    >
      <Flex
        className="w-full"
        grow="1"
        px="2"
        py="2"
        direction="column"
        align="center"
        justify="center"
      >
        {discovering.get() && (
          <>
            <WifiHigh
              size={90}
              className="animate-pulse animate-duration-2300"
            />
            <Flex direction="column" align="center" justify="center">
              <Text size="3">Start recieving files</Text>
              <Text size="2" className="text-gray-400/30">
                {applicationId ?? "appId goes here"}
              </Text>
              <Text size="2" className="text-gray-400/30">
                {alias}
              </Text>
            </Flex>
          </>
        )}
      </Flex>
      <Flex className="w-full" align="end" justify="between" py="2" px="2">
        {tip.get() ? (
          <Text className="text-start text-gray-400/50 text-[9.4px]">
            Make sure your id matches on both devices to make sure your files
            get to their destination.
          </Text>
        ) : (
          <Flex grow="1" />
        )}
        <Flex align="center" gap="4">
          <Tooltip content="New Alias">
            <Button
              variant="ghost"
              color="gray"
              className="w-3 h-5 rounded-full"
              onClick={generateNewAlias}
            >
              A
            </Button>
          </Tooltip>
          <Tooltip content="Restart">
            <Button
              variant="ghost"
              color="gray"
              className="w-3 h-5 rounded-full mr-[0.5px]"
            >
              <ArrowClockwise />
            </Button>
          </Tooltip>
        </Flex>
      </Flex>
    </Flex>
  );
}
