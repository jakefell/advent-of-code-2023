import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const input = await fs.readFile(path.join(__dirname, "input.txt"), {
  encoding: "utf8",
});

const lines = input.split("\n");

function partOne() {
  let total = 0;

  let partNumber = "";
  let hasSymbol = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let x = 0; x < line.length; x++) {
      const c = line[x];

      const isNumber = !isNaN(+c);
      if (isNumber) {
        partNumber += c;

        if (isNumNextToSymbol(i, x, lines)) {
          hasSymbol = true;
        }
      }

      if (!isNumber || x === line.length - 1) {
        if (hasSymbol && partNumber.length > 0) {
          total += +partNumber;
        }
        partNumber = "";
        hasSymbol = false;
      }
    }
  }

  console.log(total);
}

function partTwo() {}

function isNumNextToSymbol(rowIdx: number, numIdx: number, lines: string[]) {
  if (numIdx > 0) {
    if (isSymbol(lines[rowIdx][numIdx - 1])) {
      return true;
    }
  }
  if (numIdx < lines[rowIdx].length - 1) {
    if (isSymbol(lines[rowIdx][numIdx + 1])) {
      return true;
    }
  }

  if (rowIdx > 0) {
    const prevLine = lines[rowIdx - 1];

    if (numIdx > 0) {
      if (isSymbol(prevLine[numIdx - 1])) {
        return true;
      }
    }

    if (isSymbol(prevLine[numIdx])) {
      return true;
    }

    if (numIdx < prevLine.length - 1) {
      if (isSymbol(prevLine[numIdx + 1])) {
        return true;
      }
    }
  }

  if (rowIdx < lines.length - 1) {
    const nextLine = lines[rowIdx + 1];

    if (numIdx > 0) {
      if (isSymbol(nextLine[numIdx - 1])) {
        return true;
      }
    }

    if (isSymbol(nextLine[numIdx])) {
      return true;
    }

    if (numIdx < nextLine.length - 1) {
      if (isSymbol(nextLine[numIdx + 1])) {
        return true;
      }
    }
  }

  return false;
}

function isSymbol(c: string) {
  return isNaN(+c) && c !== ".";
}

partOne();
partTwo();
