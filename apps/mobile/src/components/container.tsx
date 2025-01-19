import type { BoxProps } from "@shopify/restyle";
import type { Theme } from "@theme";
import React, { type ReactNode } from "react";
import type { ViewStyle } from "react-native";
import { Box } from "./atoms";

type Props = BoxProps<Theme> & {
  children: ReactNode;
  style?: ViewStyle;
};

export default function Container(props: Props) {
  return (
    <Box
      backgroundColor="black"
      alignItems="center"
      justifyContent="center"
      flex={1}
      {...props}
    >
      {props.children}
    </Box>
  );
}
