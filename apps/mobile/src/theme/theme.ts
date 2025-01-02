import { normalize } from "@/utils/functions";
import { createTheme } from "@shopify/restyle";

const theme = createTheme({
  colors: {
    transparent: "transparent",
    current: "currentColor",
    black: "#000",
    white: "#fff",

    // Slate
    slate: "#475569", // default slate
    slate50: "#f8fafb",
    slate100: "#f1f5f9",
    slate200: "#e2e8f0",
    slate300: "#cbd5e1",
    slate400: "#94a3b8",
    slate500: "#64748b",
    slate600: "#475569",
    slate700: "#334155",
    slate800: "#1e293b",
    slate900: "#0f172a",

    // Gray
    gray: "#6b7280", // default gray
    gray50: "#f9fafb",
    gray100: "#f3f4f6",
    gray200: "#e5e7eb",
    gray300: "#d1d5db",
    gray400: "#9ca3af",
    gray500: "#6b7280",
    gray600: "#4b5563",
    gray700: "#374151",
    gray800: "#1f2937",
    gray900: "#111827",

    // Zinc
    zinc: "#4b5563", // default zinc
    zinc50: "#fafafa",
    zinc100: "#f4f4f5",
    zinc200: "#e4e4e7",
    zinc300: "#d4d4d8",
    zinc400: "#a1a1aa",
    zinc500: "#737373",
    zinc600: "#525252",
    zinc700: "#404040",
    zinc800: "#262626",
    zinc900: "#171717",

    // Neutral
    neutral: "#6b7280", // default neutral
    neutral50: "#fafafa",
    neutral100: "#f5f5f5",
    neutral200: "#e5e5e5",
    neutral300: "#d4d4d4",
    neutral400: "#a1a1aa",
    neutral500: "#737373",
    neutral600: "#525252",
    neutral700: "#404040",
    neutral800: "#262626",
    neutral900: "#171717",

    // Red
    red: "#ef4444", // default red
    red50: "#fef2f2",
    red100: "#fee2e2",
    red200: "#fecaca",
    red300: "#fca5a1",
    red400: "#f87171",
    red500: "#ef4444",
    red600: "#dc2626",
    red700: "#b91c1c",
    red800: "#991b1b",
    red900: "#7f1d1d",

    // Yellow
    yellow: "#eab308", // default yellow
    yellow50: "#fefce8",
    yellow100: "#fef9c3",
    yellow200: "#fef08a",
    yellow300: "#fde047",
    yellow400: "#facc15",
    yellow500: "#eab308",
    yellow600: "#ca8a04",
    yellow700: "#a16207",
    yellow800: "#854d0e",
    yellow900: "#7c2d12",

    // Green
    green: "#22c55e", // default green
    green50: "#f0fdf4",
    green100: "#dcfce7",
    green200: "#bbf7d0",
    green300: "#86efac",
    green400: "#4ade80",
    green500: "#22c55e",
    green600: "#16a34a",
    green700: "#15803d",
    green800: "#166534",
    green900: "#14532d",

    // Blue
    blue: "#3b82f6", // default blue
    blue50: "#eff6ff",
    blue100: "#dbeafe",
    blue200: "#bfdbfe",
    blue300: "#93c5fd",
    blue400: "#60a5fa",
    blue500: "#3b82f6",
    blue600: "#2563eb",
    blue700: "#1d4ed8",
    blue800: "#1e40af",
    blue900: "#1e3a8a",

    // Indigo
    indigo: "#6366f1", // default indigo
    indigo50: "#eef2ff",
    indigo100: "#e0e7ff",
    indigo200: "#c7d2fe",
    indigo300: "#a5b4fc",
    indigo400: "#818cf8",
    indigo500: "#6366f1",
    indigo600: "#4f46e5",
    indigo700: "#4338ca",
    indigo800: "#3730a3",
    indigo900: "#312e81",

    // Purple
    purple: "#8b5cf6", // default purple
    purple50: "#f5f3ff",
    purple100: "#ede9fe",
    purple200: "#ddd6fe",
    purple300: "#c4b5fd",
    purple400: "#a78bfa",
    purple500: "#8b5cf6",
    purple600: "#7c3aed",
    purple700: "#6d28d9",
    purple800: "#5b21b6",
    purple900: "#4c1d95",

    // Pink
    pink: "#ec4899", // default pink
    pink50: "#fdf2f8",
    pink100: "#fce7f3",
    pink200: "#fbcfe8",
    pink300: "#f9a8d4",
    pink400: "#f472b6",
    pink500: "#ec4899",
    pink600: "#db2777",
    pink700: "#be185d",
    pink800: "#9d174d",
    pink900: "#831843",

    // Stone
    stone: "#78716c", // default stone
    stone50: "#fafaf9",
    stone100: "#f5f5f4",
    stone200: "#e7e5e4",
    stone300: "#d6d3d1",
    stone400: "#a1a1aa",
    stone500: "#78716c",
    stone600: "#57534e",
    stone700: "#44403c",
    stone800: "#292524",
    stone900: "#1c1917",
  },
  spacing: {
    0: normalize(0),
    1: normalize(4),
    2: normalize(8),
    3: normalize(12),
    4: normalize(16),
    5: normalize(20),
    6: normalize(24),
    7: normalize(28),
    8: normalize(32),
    9: normalize(36),
    10: normalize(40),
    11: normalize(44),
    12: normalize(48),
    14: normalize(56),
    16: normalize(64),
    20: normalize(80),
    24: normalize(96),
    28: normalize(112),
    32: normalize(128),
    36: normalize(144),
    40: normalize(160),
    44: normalize(176),
    48: normalize(192),
    52: normalize(208),
    56: normalize(224),
    60: normalize(240),
    64: normalize(256),
    72: normalize(288),
    80: normalize(320),
    96: normalize(384),
  },
  borderRadii:{
      0: normalize(0),
    1: normalize(4),
    2: normalize(8),
    3: normalize(12),
    4: normalize(16),
    5: normalize(20),
    6: normalize(24),
    7: normalize(28),
    8: normalize(32),
    9: normalize(36),
    10: normalize(40),
    11: normalize(44),
    12: normalize(48),
    14: normalize(56),
    16: normalize(64),
    20: normalize(80),
    24: normalize(96),
    28: normalize(112),
    32: normalize(128),
    36: normalize(144),
    40: normalize(160),
    44: normalize(176),
    48: normalize(192),
    52: normalize(208),
    56: normalize(224),
    60: normalize(240),
    64: normalize(256),
    72: normalize(288),
    80: normalize(320),
    96: normalize(384),
  },
  textVariants: {
    defaults: {
      fontFamily: "SFProRoundedMedium",
      fontSize: normalize(15),
      color: "neutral100",
    },
  },
});

export type Theme = typeof theme;
export default theme;
