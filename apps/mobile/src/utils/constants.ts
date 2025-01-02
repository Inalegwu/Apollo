import { Dimensions } from "react-native";

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

export const SCALE = SCREEN_WIDTH / 350;
export const ANDROID_SCALE_LIMIT = 2;
export const MAX_RETRIES = 4;
