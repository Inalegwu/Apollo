import { Button, Dialog, Flex, Heading, Text } from "@radix-ui/themes";
import t from "@src/shared/config";
import { Info, X } from "lucide-react";
import type React from "react";
import { memo } from "react";

export default function About() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button
          variant="ghost"
          className="w-2.5 h-4.5 rounded-full cursor-pointer text-moonlightviolet"
        >
          <Info />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content
        size="2"
        aria-description="About Apollo"
        aria-describedby="dialog"
        className="bg-moonlightFocusLow"
      >
        <Flex direction="column" align="start" gap="2">
          <Flex align="center" className="w-full" justify="end">
            <Dialog.Close>
              <Button
                variant="ghost"
                color="gray"
                className="w-3 h-5 rounded-full cursor-pointer"
              >
                <X />
              </Button>
            </Dialog.Close>
          </Flex>
          <Flex direction="column" gap="2" align="start">
            <Dialog.Title>
              <Heading className="text-moonlightWhite" weight="bold" size="5">
                About
              </Heading>
            </Dialog.Title>
            <Text size="2" className="text-moonlightWhite" weight="medium">
              Apollo is a product of{" "}
              <Text size="2" weight="medium" className="text-moonlightIndigo">
                DisgruntledDevs
              </Text>{" "}
              as a part of the upcoming{" "}
              <Text className="text-moonlightIndigo" weight="medium">
                "apps from the future"
              </Text>
              , designed to provide productivity and lifestyle tools for all
              users, <span className="font-bold">Securely</span> and{" "}
              <span className="font-bold">Locally</span> on all devices.
            </Text>
            <Text size="2" className="text-moonlightWhite" weight="medium">
              Apollo is a completely private and local-first application. None
              of your information ever leaves your device and user accounts
              aren't necessary.
            </Text>
            <Flex align="start" direction="column">
              <Text className="text-moonlightWhite" size="2" weight="medium">
                For more information, visit us{" "}
                <Link href="https://google.com">
                  <Text
                    weight="medium"
                    className="text-moonlightIndigo"
                    size="2"
                  >
                    @apollo.share
                  </Text>
                </Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

const Link = memo(
  ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => {
    const { mutate, isLoading } = t.openLink.useMutation();

    return (
      <button
        disabled={isLoading}
        className={className}
        onClick={() => mutate({ href })}
      >
        {children}
      </button>
    );
  },
);
