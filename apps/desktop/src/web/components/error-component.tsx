import { Code, Flex, Heading, ScrollArea, Text } from "@radix-ui/themes";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { Console } from "effect";
import { memo, useEffect } from "react";

export const ErrorComponent = memo((props: ErrorComponentProps) => {
  useEffect(() => {
    Console.log(props.error);
  }, [props]);

  return (
    <Flex
      direction="column"
      className="w-full h-screen bg-red-50 px-20"
      align="start"
      justify="center"
      gap="3"
    >
      <Flex
        id="drag-region"
        p="6"
        className="absolute z-10 top-0 left-0 w-full"
      />
      <Flex direction="column">
        <Heading size="8" weight="bold" className="text-red-500">
          Something went wrong
        </Heading>
        {import.meta.env.DEV && (
          <Text size="4" color="red">
            {`${props.error.message.slice(0, 25)}...`}
          </Text>
        )}
      </Flex>
      {import.meta.env.DEV && (
        <Code
          className="w-full px-3 py-3 max-h-3/6"
          size="2"
          weight="medium"
          color="red"
          variant="soft"
        >
          <ScrollArea scrollbars="both" scrollHideDelay={300}>
            {props.error.stack}
          </ScrollArea>
        </Code>
      )}
    </Flex>
  );
});
