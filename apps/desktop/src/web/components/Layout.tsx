import { Button, Flex } from "@radix-ui/themes";
import { appState, transfers } from "@shared/state";
import t from "@src/shared/config";
import { AnimatePresence } from "motion/react";
import type React from "react";
import { useEffect, useState } from "react";
import { Icon, Settings } from ".";
import History from "./history";
import Spinner from "./spinner";

type LayoutProps = {
  children?: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { mutate: minimizeWindow } = t.window.minimize.useMutation();
  const { mutate: closeWindow } = t.window.closeWindow.useMutation();

  const [settings, setSettings] = useState(false);
  const [history, setHistory] = useState(false);

  const canSaveHistory = appState.use.saveTransferHistory();
  const colorMode = appState.use.colorMode();
  const toggleColorMode = appState.use.toggleColorMode();
  const addToSelectedFiles = transfers.use.addToSelectedFiles();
  const setDeviceType = appState.use.setDeviceType();

  useEffect(() => {
    if (colorMode === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    setDeviceType("desktop");
  }, [colorMode, setDeviceType]);

  const { mutate: selectFiles, isLoading: selecting } =
    t.files.selectFiles.useMutation({
      onSuccess: (data) => {
        if (data.cancelled) return;
        console.log(data);

        if (data.data === null) return;

        for (const path of data.data) {
          console.log(path);
          addToSelectedFiles(path);
        }
      },
    });

  return (
    <AnimatePresence>
      <Flex
        width="100%"
        grow="1"
        direction="column"
        className="transition h-screen"
      >
        <Flex
          align="center"
          justify="between"
          gap="2"
          className="absolute z-10 w-full px-4 py-3 top-0 left-0"
        >
          <Flex align="center" gap="5">
            <button
              className="w-2.5 h-4.5 rounded-full cursor-pointer text-moonlightFocusHigh dark:text-moonlightWhite"
              onClick={() => setSettings(true)}
            >
              <Icon size={10} name="Settings" />
            </button>
            <button
              onClick={toggleColorMode}
              className="w-2.5 h-4.5 rounded-full cursor-pointer outline-none text-moonlightFocusHigh dark:text-moonlightWhite"
            >
              {colorMode ? (
                <Icon size={10} name="Sun" />
              ) : (
                <Icon size={10} name="Moon" />
              )}
            </button>
            <Button
              disabled={!canSaveHistory}
              onClick={() => setHistory(true)}
              variant="ghost"
              color="gray"
              size="1"
              className="w-2.5 h-4.5 rounded-full text-moonlightFocusHigh dark:text-moonlightWhite cursor-pointer outline-none"
            >
              <Icon size={10} name="History" />
            </Button>
          </Flex>
          <Flex grow="1" id="drag-region" className="p-2" />
          <Flex align="center" justify="end" gap="5">
            <button
              onClick={() => minimizeWindow()}
              className="w-2.5 h-4.5 rounded-full cursor-pointer outline-none text-moonlightFocusHigh dark:text-moonlightWhite"
            >
              <Icon size={10} name="Minus" />
            </button>
            <button
              onClick={() => closeWindow()}
              className="w-2.5 h-4.5 rounded-full cursor-pointer outline-none text-red-500"
            >
              <Icon size={10} name="X" />
            </button>
          </Flex>
        </Flex>
        {children}
        <Flex className="absolute bottom-1 right-1 space-x-3  rounded-lg p-3">
          <Button
            variant="soft"
            onClick={() => selectFiles()}
            radius="full"
            color="gray"
            className="w-9 h-9 cursor-pointer outline-none text-moonlightIndigo bg-moonlightIndigo/20"
          >
            {selecting ? <Spinner /> : <Icon name="Plus" size={13} />}
          </Button>
        </Flex>
        <AnimatePresence>
          {settings && <Settings toggleSettings={setSettings} />}
          {history && <History toggleHistory={setHistory} />}
        </AnimatePresence>
      </Flex>
    </AnimatePresence>
  );
}
