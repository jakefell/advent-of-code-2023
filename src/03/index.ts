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

function partTwo() {
  const validGears = [];

  for (const [rowIdx, row] of lines.entries()) {
    for (let charIdx = 0; charIdx < row.length; charIdx++) {
      const char = row[charIdx];
      if (char === "*") {
        // We have a gear
        const gears = new Set<string>();

        for (const sRowIdx of [rowIdx - 1, rowIdx, rowIdx + 1]) {
          for (const sCharIdx of [charIdx - 1, charIdx, charIdx + 1]) {
            if (
              sRowIdx < 0 ||
              sRowIdx > lines.length - 1 ||
              sCharIdx < 0 ||
              sCharIdx > row.length - 1 ||
              lines[sRowIdx][sCharIdx] === "*" ||
              isNaN(+lines[sRowIdx][sCharIdx])
            ) {
              continue;
            }

            // We have a number. Find first index
            let firstCharIdx = sCharIdx;

            while (firstCharIdx - 1 >= 0) {
              if (isNaN(+lines[sRowIdx][firstCharIdx - 1])) {
                break;
              }
              firstCharIdx -= 1;
            }

            gears.add(`${sRowIdx}:${firstCharIdx}`);
          }
        }

        if (gears.size == 2) {
          validGears.push(
            Array.from(gears).map((x) => {
              const split = x.split(":");
              return {
                row: +split[0],
                col: +split[1],
              };
            })
          );
        }
      }
    }
  }

  let total = 0;
  for (const gears of validGears) {
    let firstGear = 0;
    let secondGear = 0;

    const first = gears[0];
    for (let i = first.col; i < lines[first.row].length; i++) {
      const char = lines[first.row].at(i + 1);
      if (!char || isNaN(+char)) {
        firstGear = +lines[first.row].substring(first.col, i + 1);
        break;
      }
    }

    const second = gears[1];
    for (let i = second.col; i < lines[second.row].length; i++) {
      const char = lines[second.row].at(i + 1);
      if (!char || isNaN(+char)) {
        secondGear = +lines[second.row].substring(second.col, i + 1);
        break;
      }
    }

    total += firstGear * secondGear;
  }

  console.log(total);
}

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
