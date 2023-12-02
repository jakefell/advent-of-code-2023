import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const input = await fs.readFile(path.join(__dirname, "input.txt"), {
  encoding: "utf8",
});

const lines = input.split("\n");

const map: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

function partOne() {
  let total = 0;
  for (const line of lines) {
    const split = line.split(":");
    const id = +split[0].substring(split[0].indexOf(" "));

    const games = split[1].split(";").map((x) => x.trim());

    let isValidGame = true;
    for (const round of games) {
      const colors = round.split(",").map((x) => x.trim());
      for (const color of colors) {
        const cubes = color.split(" ");
        const matched = map[cubes[1]];
        if (+cubes[0] > matched) {
          isValidGame = false;
        }
      }
    }
    if (isValidGame) {
      total += id;
    }
  }

  console.log(total);
}

function partTwo() {
  let total = 0;
  for (const line of lines) {
    const split = line.split(":");
    const games = split[1].split(";").map((x) => x.trim());

    const res: Record<string, number> = {
      red: 0,
      green: 0,
      blue: 0,
    };

    for (const round of games) {
      const colors = round.split(",").map((x) => x.trim());
      for (const c of colors) {
        const cubes = c.split(" ");
        const count = +cubes[0];
        const color = cubes[1];

        if (res[color] < count) {
          res[color] = count;
        }
      }
    }

    total += res["red"] * res["green"] * res["blue"];
  }

  console.log(total);
}

partOne();
partTwo();
