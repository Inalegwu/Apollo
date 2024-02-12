import { GithubLogo, Globe } from "@phosphor-icons/react";
import { Button, Flex, Text, Tooltip } from "@radix-ui/themes";
import { trpc } from "@src/shared/config";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/about")({
  component: About,
});

function About() {
  const { mutate: openGithub } = trpc.window.openGithub.useMutation();
  const { mutate: openWebsite } = trpc.window.openWebsite.useMutation();

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      p="2"
      className="w-full"
      grow="1"
      gap="1"
    >
      <Flex direction="column" align="center">
        <Text size="6" className="font-bold text-indigo-400/80">
          Apollo
        </Text>
        <Text size="4" className="font-bold text-indigo-400/80">
          Cross-Platform File Sharing for Everyone
        </Text>
      </Flex>
      <Text size="1" className="text-gray-200/30">
        {" "}
        &copy; 2023 Verve Development Studio{" "}
      </Text>
      {/* studio information */}
      <Text size="1" className="text-gray-200/29">
        Developed by Ikwue Inalegwu for Verve Development Studio
      </Text>
      <Flex className="mt-3" align="center" gap="5" justify="center">
        <Tooltip content="View on Github" side="bottom">
          <Button
            onClick={() => openGithub()}
            variant="ghost"
            color="gray"
            className="px-3 py-3"
          >
            <GithubLogo />
          </Button>
        </Tooltip>
        <Tooltip content="View Our Website" side="bottom">
          <Button
            onClick={() => openWebsite()}
            variant="ghost"
            color="gray"
            className="px-3 py-3"
          >
            <Globe />
          </Button>
        </Tooltip>
      </Flex>
    </Flex>
  );
}
