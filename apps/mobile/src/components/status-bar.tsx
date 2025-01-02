import {
  type BackgroundColorProps,
  backgroundColor,
  composeRestyleFunctions,
  useRestyle,
} from "@shopify/restyle";
import type { Theme } from "@theme";
import type { StatusBarStyle } from "expo-status-bar";
import { StatusBar as NativeStatusBar } from "expo-status-bar";
import { memo } from "react";

type RestyleProps = BackgroundColorProps<Theme>;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  backgroundColor,
]);

type Props = RestyleProps & {
  style?: StatusBarStyle;
};

const StatusBar = memo(({ style, ...rest }: Props) => {
  const props = useRestyle(restyleFunctions, rest);

  return <NativeStatusBar animated={true} {...props} style={style} />;
});

export default StatusBar;
