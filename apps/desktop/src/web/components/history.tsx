import type { FilterBy } from "@apollo/types";
import { Flex, Select, Text } from "@radix-ui/themes";
import { history } from "@src/shared/state";
import { Array } from "effect";
import { capitalize } from "effect/String";
import { motion } from "motion/react";
import { memo, useMemo } from "react";
import Flatlist from "./flatlist";
import Icon from "./icon";

type Props = {
  toggleHistory: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function History({ toggleHistory }: Props) {
  const filter = history.use.filterBy();

  const transfers = Array.fromIterable(history.use.history().values());

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute z-20 w-full h-screen flex items-center justify-center shadow-xl tracking-[5px]"
    >
      <Flex
        direction="column"
        className="w-5/6 h-4/6 bg-white bg-light-1 dark:bg-moonlightBase rounded-lg overflow-hidden border-1 border-solid border-zinc-200 dark:border-moonlightSoft/30"
      >
        <Flex
          className="w-full p-2 border-b-1 border-b-solid border-neutral-200/60 dark:border-b-moonlightSlight/30"
          gap="4"
          align="center"
          justify="between"
        >
          <button
            onClick={() => toggleHistory(false)}
            className="text-red-500 border-1 border-solid border-red-100 dark:border-red-900/60 dark:text-red-900 dark:hover:bg-red-800/10 hover:bg-red-50 px-2 py-2 rounded-md flex items-center justify-center"
          >
            <Icon name="X" size={11} />
          </button>
          <Text
            size="2"
            className="text-moonlightBase dark:text-moonlightWhite"
          >
            Transfer History
          </Text>
          <Flex align="center" justify="end" gap="4">
            <Filters />
          </Flex>
        </Flex>
        <Flatlist
          data={transfers}
          listEmptyComponent={() => (
            <Flex
              align="center"
              justify="center"
              className="w-full h-full flex"
            >
              <Flex direction="column" align="center" justify="center">
                <Text size="3" weight="medium">
                  No Transfers Yet
                </Text>
                <Text size="2" color="gray">
                  send some files and check in again
                </Text>
              </Flex>
            </Flex>
          )}
          listHeaderComponent={() => (
            <div className="py-1 px-2">
              <Text size="1" color="gray">
                {capitalize(filter.toString())}
              </Text>
            </div>
          )}
          renderItem={({ data, index }) => <div key={index} />}
        />
      </Flex>
    </motion.div>
  );
}

const Filters = memo(() => {
  const setFilterBy = history.use.setFilterBy();
  const filter = history.use.filterBy();
  const filters: Array<FilterBy> = useMemo(
    () => ["newest", "oldest", "search"],
    [],
  );

  return (
    <Select.Root
      onValueChange={(value) => setFilterBy(value as FilterBy)}
      size="1"
    >
      <Select.Trigger className="dark:bg-moonlightFocusHigh">
        {capitalize(filter.toString())}
      </Select.Trigger>
      <Select.Content
        color="gray"
        className="bg-moonlightWhite dark:bg-moonlightBase"
      >
        {filters.map((value) => (
          <Select.Item key={value} value={value}>
            {capitalize(value.toString())}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
});
