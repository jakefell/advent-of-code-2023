import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const textDigits = [
  { text: "one", digit: 1 },
  { text: "two", digit: 2 },
  { text: "three", digit: 3 },
  { text: "four", digit: 4 },
  { text: "five", digit: 5 },
  { text: "six", digit: 6 },
  { text: "seven", digit: 7 },
  { text: "eight", digit: 8 },
  { text: "nine", digit: 9 },
];

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const input = await fs.readFile(path.join(__dirname, "input.txt"), {
  encoding: "utf8",
});

const lines = input.split("\n");

let total = 0;

let i = 0;
for (const line of lines) {
  const value = +`${getFirstDigit(line)}${getLastDigit(line)}`;
  total += value;
}

console.log({ total });

function getFirstDigit(value: string) {
  let digitIndex = 0;

  for (let i = 0; i < value.length; i++) {
    if (!isNaN(+value[i])) {
      digitIndex = i;
      break;
    }
  }

  const valueTextDigits = getSortedTextDigits(value);

  const minTextDigit = valueTextDigits.at(0);
  if (!minTextDigit) {
    return +value[digitIndex];
  }

  if (minTextDigit.startIndex < digitIndex) {
    return minTextDigit.text.digit;
  }

  return +value[digitIndex];
}

function getLastDigit(value: string) {
  let digitIndex = 0;

  for (let i = value.length - 1; i >= 0; i--) {
    if (!isNaN(+value[i])) {
      digitIndex = i;
      break;
    }
  }

  const valueTextDigits = getSortedTextDigits(value);

  const maxTextDigit = valueTextDigits.at(valueTextDigits.length - 1);
  if (!maxTextDigit) {
    return +value[digitIndex];
  }

  if (maxTextDigit.startIndex > digitIndex) {
    return maxTextDigit.text.digit;
  }

  return +value[digitIndex];
}

function getSortedTextDigits(value: string) {
  let valueTextDigits: Array<{
    text: { text: string; digit: number };
    startIndex: number;
  }> = [];

  for (const textDigit of textDigits) {
    const textIndices = getIndicesOf(textDigit.text, value);
    if (textIndices.length === 0) {
      continue;
    }

    valueTextDigits = valueTextDigits.concat(
      textIndices.map((x) => ({
        startIndex: x,
        text: textDigit,
      }))
    );
  }

  const sortedTextDigits = valueTextDigits.toSorted(
    (a, b) => a.startIndex - b.startIndex
  );

  return sortedTextDigits;
}

function getIndicesOf(search: string, value: string) {
  var startIndex = 0,
    index = 0,
    indices = [];

  while ((index = value.indexOf(search, startIndex)) > -1) {
    indices.push(index);
    startIndex = index + search.length;
  }

  return indices;
}
