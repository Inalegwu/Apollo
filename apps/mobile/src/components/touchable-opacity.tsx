import {
  type BackgroundColorProps,
  type BorderProps,
  type LayoutProps,
  type PositionProps,
  type ShadowProps,
  type SpacingProps,
  type SpacingShorthandProps,
  backgroundColor,
  border,
  composeRestyleFunctions,
  layout,
  position,
  shadow,
  spacing,
  useRestyle,
} from "@shopify/restyle";
import type { Theme } from "@theme";
import type React from "react";
import {
  type Insets,
  type LayoutChangeEvent,
  TouchableOpacity as NativeTouchable,
  type ViewStyle,
} from "react-native";

type RestyleProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  LayoutProps<Theme> &
  BackgroundColorProps<Theme> &
  PositionProps<Theme> &
  SpacingShorthandProps<Theme> &
  ShadowProps<Theme>;

const restyleFunction = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  layout,
  backgroundColor,
  shadow,
  border,
  position,
]);

type Props = RestyleProps & {
  children: React.ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
  activeOpacity?: number;
  disabled?: boolean;
  hitSlop?: number | Insets | null;
  onLayout?: (event: LayoutChangeEvent) => void;
  style?: ViewStyle;
};

export default function TouchableOpacity({
  children,
  onPress,
  activeOpacity,
  onLongPress,
  disabled,
  onLayout,
  hitSlop,
  // style,
  ...rest
}: Props) {
  const props = useRestyle(restyleFunction, rest);
  return (
    <NativeTouchable
      activeOpacity={activeOpacity}
      onLongPress={onLongPress}
      onPress={onPress}
      disabled={disabled}
      {...props}
      hitSlop={hitSlop}
      onLayout={onLayout}
      // style={style}
    >
      {children}
    </NativeTouchable>
  );
}
