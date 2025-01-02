import { PixelRatio, Platform } from "react-native";
import { ANDROID_SCALE_LIMIT, SCALE } from "./constants";

export const normalize = (size: number) =>
  Platform.OS === "ios"
    ? Math.round(PixelRatio.roundToNearestPixel(size * SCALE))
    : Math.round(PixelRatio.roundToNearestPixel(size * SCALE)) -
      ANDROID_SCALE_LIMIT;
