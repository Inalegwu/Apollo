import { FileParseResponse, FileTypes } from "./types";

const alphabetList = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const nameList = [
  "Time",
  "Past",
  "Future",
  "Dev",
  "Fly",
  "Flying",
  "Soar",
  "Soaring",
  "Power",
  "Falling",
  "Fall",
  "Jump",
  "Cliff",
  "Mountain",
  "Rend",
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Gold",
  "Demon",
  "Demonic",
  "Panda",
  "Cat",
  "Kitty",
  "Kitten",
  "Zero",
  "Memory",
  "Trooper",
  "XX",
  "Bandit",
  "Fear",
  "Light",
  "Glow",
  "Tread",
  "Deep",
  "Deeper",
  "Deepest",
  "Mine",
  "Your",
  "Worst",
  "Enemy",
  "Hostile",
  "Force",
  "Video",
  "Game",
  "Donkey",
  "Mule",
  "Colt",
  "Cult",
  "Cultist",
  "Magnum",
  "Gun",
  "Assault",
  "Recon",
  "Trap",
  "Trapper",
  "Redeem",
  "Code",
  "Script",
  "Writer",
  "Near",
  "Close",
  "Open",
  "Cube",
  "Circle",
  "Geo",
  "Genome",
  "Germ",
  "Spaz",
  "Shot",
  "Echo",
  "Beta",
  "Alpha",
  "Gamma",
  "Omega",
  "Seal",
  "Squid",
  "Money",
  "Cash",
  "Lord",
  "King",
  "Duke",
  "Rest",
  "Fire",
  "Flame",
  "Morrow",
  "Break",
  "Breaker",
  "Numb",
  "Ice",
  "Cold",
  "Rotten",
  "Sick",
  "Sickly",
  "Janitor",
  "Camel",
  "Rooster",
  "Sand",
  "Desert",
  "Dessert",
  "Hurdle",
  "Racer",
  "Eraser",
  "Erase",
  "Big",
  "Small",
  "Short",
  "Tall",
  "Sith",
  "Bounty",
  "Hunter",
  "Cracked",
  "Broken",
  "Sad",
  "Happy",
  "Joy",
  "Joyful",
  "Crimson",
  "Destiny",
  "Deceit",
  "Lies",
  "Lie",
  "Honest",
  "Destined",
  "Bloxxer",
  "Hawk",
  "Eagle",
  "Hawker",
  "Walker",
  "Zombie",
  "Sarge",
  "Capt",
  "Captain",
  "Punch",
  "One",
  "Two",
  "Uno",
  "Slice",
  "Slash",
  "Melt",
  "Melted",
  "Melting",
  "Fell",
  "Wolf",
  "Hound",
  "Legacy",
  "Sharp",
  "Dead",
  "Mew",
  "Chuckle",
  "Bubba",
  "Bubble",
  "Sandwich",
  "Smasher",
  "Extreme",
  "Multi",
  "Universe",
  "Ultimate",
  "Death",
  "Ready",
  "Monkey",
  "Elevator",
  "Wrench",
  "Grease",
  "Head",
  "Theme",
  "Grand",
  "Cool",
  "Kid",
  "Boy",
  "Girl",
  "Vortex",
  "Paradox",
  "Sith",
  "Lord",
  "Potato",
  "Salad",
  "British",
  "Nigerian",
  "Prince",
  "Valuable",
  "Alpha",
  "Zulu",
  "Delta",
  "Charlie",
  "Foxtrot",
  "Tango",
];

export function parseFilePath(filePath: string): FileParseResponse {
  const result = filePath.match(/[^\\]*\.(\w+)$/);

  const fileName = result?.[0]?.split(".")[0] ?? "";
  const fileExtension = result?.[1] ?? "";

  return {
    fileName,
    fileExtension,
    fileType: matchFileExtension(fileExtension.toLocaleLowerCase()),
  };
}

export function matchFileExtension(ext: string) {
  if (ext === "pdf" || ext === "docx" || ext === "pptx" || ext === "tx") {
    return FileTypes.doc;
  }
  if (ext === "zip" || ext === "rar" || ext === "cbr" || ext === "cbz") {
    return FileTypes.archive;
  }
  if (ext === "mp4" || ext === "mkv") {
    return FileTypes.vid;
  }
  if (ext === "jpg" || ext === "jpeg" || ext === "png" || ext === "svg") {
    return FileTypes.img;
  }
  if (
    ext === "json" ||
    ext === "ts" ||
    ext === "js" ||
    ext === "java" ||
    ext === "cpp"
  ) {
    return FileTypes.code;
  }

  return FileTypes.unknown;
}

// generate a random and possibly
// funny default alias for the user
// each time they are awaiting discovery
// the alias won't matter since the application
// id stays the same
export function generateRandomAlias() {
  const alias = `${nameList[Math.floor(Math.random() * nameList.length - 1)]}-${
    nameList[Math.floor(Math.random() * nameList.length - 1)]
  }-${nameList[Math.floor(Math.random() * nameList.length - 1)]}`;

  return alias;
}

// generate a unique identifier for
// the users instance of the app
export function generateUniqueIdentifier() {
  const uniqueIdentifier = `${alphabetList.slice(
    0,
    Math.floor(Math.random() * alphabetList.length - 1),
  )}`;
  return uniqueIdentifier;
}

export function capitalize(text: string) {
  const firstLetter = text[0];
  return `${firstLetter.toUpperCase()}${text.slice(1, text.length)}`;
}
