import { Flex, Text } from "@radix-ui/themes";
import { history, saved } from "@src/web/state";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/connections/$connectionId")({
  component: Connection,
});

function Connection() {
  const { connectionId } = Route.useParams();

  const { connections } = saved.get();
  const { transfer } = history.get();

  // find the connection in the saved map
  const savedConnection = Array.from(connections.values()).find(
    (v) => v.id === connectionId,
  );

  // find the users transfer history in the saved map
  // based off whether the senderId or recieverId belongs
  // to this connection
  const savedHistory = Array.from(transfer.values()).find((history) =>
    history.find(
      (transfer) =>
        transfer.senderId === connectionId ||
        transfer.recieverId === connectionId,
    ),
  );

  return (
    <Flex p="1" direction="column" gap="3">
      <Text size="5" className="font-bold">
        {savedConnection?.alias}
      </Text>
      <Flex className="w-full" align="center" justify="between">
        <Flex direction="column" gap="1">
          <Text size="2">Transfer History</Text>
          <Text size="1" className="text-gray-400">
            View your previous transfers to and from this device
          </Text>
        </Flex>
      </Flex>
      {/* show the users transfer history with a saved connection */}
      <Flex direction="column" gap="2">
        {savedHistory?.length === 0 && <Text>No Transfers to this Device</Text>}
        {savedHistory?.map((v) => (
          <Text>{v.fileName}</Text>
        ))}
      </Flex>
    </Flex>
  );
}
