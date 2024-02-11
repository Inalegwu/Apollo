import { Flex, Text } from "@radix-ui/themes";
import { createLazyFileRoute } from "@tanstack/react-router";
import { history } from "../state";

export const Route = createLazyFileRoute("/history")({
  component: History,
});

function History() {
  const { connection } = history.get();

  const connectionHistory = Array.from(connection.values());

  return (
    <Flex className="w-full" direction="column" align="center" justify="center">
      {connectionHistory.length === 0 && (
        <Text className="font-medium text-xl">No Connection History</Text>
      )}
      {connectionHistory.map((v) => {
        return (
          <Flex align="center" justify="between" className="w-full">
            <Flex align="start" justify="center" direction="column">
              <Text>{v.alias}</Text>
              {/* TODO moment timestamp */}
              <Text>{v.connectedAt}</Text>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
}
