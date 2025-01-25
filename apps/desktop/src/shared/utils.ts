import * as String from "effect/String";
import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";
import { v4 } from "uuid";
import { FileTypes } from "./types";

export const generateRandomName = () =>
  uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    length: 3,
    separator: "-",
  });

export const generateAppId = () => v4();

export const capitalize = (value: string) => String.capitalize(value);

export const randomNumber = () =>
  Math.floor((Math.random() * window.innerWidth) / 2);

export const randomNumberfromInterval = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const matchFileType = (ext: string) => {
  if (ext === FileTypes.MD) {
    return FileTypes.MD;
  }

  if (ext === FileTypes.DOCX) {
    return FileTypes.DOCX;
  }

  if (ext === FileTypes.TXT) {
    return FileTypes.TXT;
  }

  return null;
};

export const generateGradientColors = () => {
  // Generate random RGB values for each color
  const color1 = `rgb(${Math.floor(Math.random() * 256)}, ${
    Math.floor(
      Math.random() * 256,
    )
  }, ${Math.floor(Math.random() * 256)})`;
  const color2 = `rgb(${Math.floor(Math.random() * 256)}, ${
    Math.floor(
      Math.random() * 256,
    )
  }, ${Math.floor(Math.random() * 256)})`;

  // Convert RGB colors to HEX format
  const rgbTohex = (rgb: string): string =>
    `#${
      rgb
        .match(/\d+/g)
        ?.map((x) => Number.parseInt(x).toString(16).padStart(2, "0"))
        .join("") ?? ""
    }`;
  const hexColor1 = rgbTohex(color1);
  const hexColor2 = rgbTohex(color2);

  return [hexColor1, hexColor2];
};

export const parseFileNameFromPath = (filePath: string) =>
  filePath
    .replace(/^.*[\\\/]/, "")
    .replace(/\.[^/.]+$/, "")
    .replace(/(\d+)$/, "")
    .replace("-", "");

export const getFileExtensionFromPath = (filePath: string) =>
  filePath.split(".")[1];
