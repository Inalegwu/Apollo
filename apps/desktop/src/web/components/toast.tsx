import { Flex, Text } from "@radix-ui/themes";
import { useCallback } from "react";
import type { Toast } from "react-hot-toast";
import Icon from "./icon";
import Spinner from "./spinner";

export function ToastBody(props: Toast) {
  const renderIcon = useCallback((type: typeof props.type) => {
    switch (type) {
      case "success":
        return <Icon name="Check" size={12} />;
      case "blank":
        return null;
      case "error":
        return <Icon name="X" size={12} />;
      case "loading":
        return <Spinner size={10} />;
    }
  }, []);

  return (
    <Flex
      align="center"
      className="px-4 py-1 flex items-center justify-center space-x-3 rounded-md border-1 border-solid bg-moonlightWhite dark:bg-moonlightBase shadow-lg border-neutral-100 dark:border-moonlightSlight/30"
    >
      <Text className="text-moonlightIndigo dark:text-moonlightPink/70">
        {renderIcon(props.type)}
      </Text>
      <Text
        size="2"
        className="text-moonlightIndigo dark:text-moonlightPink/70"
      >
        {props.message?.toString()}
      </Text>
    </Flex>
  );
}
