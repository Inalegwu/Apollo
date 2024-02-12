import {
  CaretDoubleDown,
  ClockCounterClockwise,
  Gear,
  Info,
  Laptop,
  Minus,
  ShareNetwork,
  X,
} from "@phosphor-icons/react";
import { Phone } from "@phosphor-icons/react/dist/ssr";
import { Button, Flex, Text, Tooltip } from "@radix-ui/themes";
import { trpc } from "@shared/config";
import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { saved } from "../state";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const router = useNavigate();
  // TODO use this to determine which screen the user is
  // on for conditional styling on layout
  const routerState = useRouter();

  const { mutate: minimize } = trpc.window.minimize.useMutation();
  const { mutate: close } = trpc.window.closeWindow.useMutation();

  // saved connections
  const { connections } = saved.get();

  return (
    <Flex className="w-full h-screen" direction="column">
      <Flex align="center" justify="between" px="3" py="3" gap="1">
        <Text size="1">Apollo</Text>
        <Flex p="2" grow="1" id="drag-region" />
        <Flex align="center" justify="end" gap="3" px="1">
          <Button onClick={() => minimize()} variant="ghost" color="gray">
            <Minus />
          </Button>
          <Button onClick={() => close()} variant="ghost" color="red">
            <X />
          </Button>
        </Flex>
      </Flex>
      <Flex grow="1">
        {/* sidebar */}
        <Flex
          className="w-[7%]"
          p="1"
          direction="column"
          align="center"
          justify="between"
        >
          {/* list content */}
          <Flex
            direction="column"
            gap="2"
            pt="1"
            p="1"
            className="overflow-y-scroll"
          >
            <Tooltip content="Send Files" side="left">
              <Link
                to="/"
                className="w-8 h-8 rounded-full text-gray-100/80 text-[13.5px] flex items-center justify-center hover:bg-gray-200/10"
              >
                <ShareNetwork />
              </Link>
            </Tooltip>
            <Tooltip content="Recieve Files" side="left">
              <Link
                to="/recieve"
                className="w-8 h-8 rounded-full text-gray-200/80 text-[13.5px] flex items-center justify-center hover:bg-gray-200/10"
              >
                <CaretDoubleDown />
              </Link>
            </Tooltip>
            <Tooltip content="Connection History" side="left">
              <Link
                to="/history"
                className="w-8 h-8 rounded-full text-gray-200/80 text-[13.5px] flex items-center justify-center hover:bg-gray-200/10"
              >
                <ClockCounterClockwise />
              </Link>
            </Tooltip>
            {/* list out users saved connections
                this allows a user to continuously
                send and recieve files with a particular device without
                having to rediscover the device
                and also allows the user to keep track of
                the transfers they've had with a file
            */}
            {Array.from(connections.values()).map((v) => {
              return (
                <Tooltip content={v.alias} key={v.id} side="left">
                  <Link
                    className="w-8 h-8 rounded-full text-gray-200/80 text-[13.5px] flex items-center justify-center hover:bg-gray-200/10"
                    to="/connections/$connectionId"
                    params={{
                      connectionId: v.id,
                    }}
                  >
                    {v.deviceType === "PC" ? <Laptop /> : <Phone />}
                  </Link>
                </Tooltip>
              );
            })}
          </Flex>
          {/* actions */}
          <Flex direction="column" className="space-y-1" mb="2">
            <Tooltip content="Settings" side="left">
              <Link
                to="/settings"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] text-gray-200/80 hover:text-indigo-400 hover:bg-indigo-400/10"
              >
                <Gear />
              </Link>
            </Tooltip>
            <Tooltip content="About Apollo" side="left">
              <Link
                to="/about"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] text-gray-200/80 hover:text-indigo-400 hover:bg-indigo-400/10"
              >
                <Info />
              </Link>
            </Tooltip>
          </Flex>
        </Flex>
        {/* actual body content */}
        <Flex
          grow="1"
          className="h-full border-1 border-solid border-slate-400/10 rounded-tl-md"
        >
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
}
