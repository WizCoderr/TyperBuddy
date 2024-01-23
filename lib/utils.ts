export function getUniqueCharacters(sentence: string) {
  const uniqueChars = new Set<string>();

  for (let i = 0; i < sentence.length; i++) {
    const char = sentence.charAt(i).toUpperCase();
    uniqueChars.add(char);
  }

  return Array.from(uniqueChars).sort();
}

export function getKeyColor(
  minValue: number,
  maxValue: number,
  currentValue: number
) {
  // calculating color value
  const normalizedNumber = (currentValue - minValue) / (maxValue - minValue);
  const colorValue = Math.round(normalizedNumber * 255);

  if (currentValue < 0) {
    return `rgb(255, ${255 - colorValue}, ${255 - colorValue})`;
  } else if (currentValue > 0) {
    return `rgb(${255 - colorValue}, 255, ${255 - colorValue})`;
  } else {
    return "rgb(255, 255, 255)";
  }
}
export function timeToWord(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const sec = Math.floor(seconds - hours * 3600 - minutes * 60);

  let word = "";
  if (hours != 0) {
    word += hours + "h ";
  }
  if (minutes != 0) {
    word += minutes + "m ";
  }

  if (sec != 0) {
    word += sec + "s";
  }

  return word;
}

export function countCorrectWords(
  testSentence: string,
  correctSentence: string
) {
  let count = 0;
  let tempWord = "";
  let isWaiting = false;
  for (let index = 0; index < correctSentence.length; index++) {
    const testChar = testSentence[index];
    const correctChar = correctSentence[index];

    // waiting for next whitespace if error text found
    if (isWaiting) {
      if (" " == testChar) {
        tempWord = "";
        isWaiting = false;
      }
      continue;
    }

    // add count if we found success text with whitespace
    if (" " == testChar && testChar == correctChar) {
      if (tempWord != "") {
        count++;
        tempWord = "";
      }
    } else if (testChar == correctChar) {
      tempWord += testChar;
    } else {
      // set isWaiting if we found error
      isWaiting = true;
    }
  }

  // add count if anything present in temp
  if (!isWaiting && tempWord != "") {
    count++;
  }

  return count;
}

// delay
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const colors = ["#ef476fff", "#06d6a0ff", "#118ab2ff", "#073b4cff"];

export function generateAvatar(name: string) {
  var initials = name
    .split(" ")
    .filter((item, index) => item && index < 2)
    .map((str) => (str.trim() ? str.trim()[0].toUpperCase() : ""))
    .join("");

  //

  var canvas = document.createElement("canvas");
  var radius = 30;
  var margin = 5;
  canvas.width = radius * 2 + margin * 2;
  canvas.height = radius * 2 + margin * 2;

  const randColor = colors[Math.round(Math.random() * (colors.length - 1))];

  // Get the drawing context
  var ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.beginPath();
    ctx.arc(radius + margin, radius + margin, radius, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fillStyle = randColor;
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.font = "bold 28px Arial";
    ctx.textAlign = "center";
    ctx.fillText(initials, radius + 5, (radius * 4) / 3 + margin);
    return canvas.toDataURL();
  }

  return "";
}

export type RGBColor = [number, number, number];

export function getColor(
  index: number,
  totalSteps: number,
  color1: RGBColor,
  color2: RGBColor
) {
  // Ensure index is within the valid range
  index = Math.max(0, Math.min(index, totalSteps - 1));

  // Calculate the interpolation factor
  const factor: number = index / (totalSteps - 1);

  // Interpolate between the two colors
  const interpolatedColor: RGBColor = [
    Math.round(color1[0] + factor * (color2[0] - color1[0])),
    Math.round(color1[1] + factor * (color2[1] - color1[1])),
    Math.round(color1[2] + factor * (color2[2] - color1[2])),
  ];

  return `rgb(${interpolatedColor[0]}, ${interpolatedColor[1]},${interpolatedColor[2]})`;
}

export function countWords(text: string) {
  const words = text.split(" ");
  return words.filter((word) => word).length;
}

const allowedChars =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 ,.?;:'\"[]{}";
export function filterAllowedChars(text: string) {
  const result = text
    .split("")
    .filter((item) => allowedChars.includes(item))
    .join("");
  return result;
}

export function calculatePrize(totalReward: number, totalPlayer: number) {
  let totalValue = totalReward;
  let reward = Array<{ rank: number; prize: number }>();
  for (let index = 1; index <= totalPlayer; index++) {
    let prize = Math.round((totalValue * 40) / 100);
    totalValue -= prize;
    reward.push({ rank: index, prize: prize });
  }

  return reward;
}

export function getTimeLeft(dateTime: string) {
  const future = new Date(dateTime);
  const now = new Date();
  let diff = future.getTime() - now.getTime();
  if (diff < 1) return [0, 0, 0, 0];

  const oneDay = 1000 * 60 * 60 * 24;

  const days = Math.floor(diff / oneDay);
  diff -= days * oneDay;

  const hours = Math.floor(diff / (60 * 60 * 1000));
  diff -= hours * 60 * 60 * 1000;

  const minutes = Math.floor(diff / (60 * 1000));
  diff -= minutes * 60 * 1000;

  const seconds = Math.floor(diff / 1000);

  return [days, hours, minutes, seconds];
}

export function formatDateTime(date: string) {
  const inputDate = new Date(date);
  const day = inputDate.getDate();
  const month = inputDate.toLocaleString("en-US", { month: "short" });
  const year = inputDate.getFullYear();
  const hour = inputDate.getHours();
  const minute = inputDate.getMinutes();

  return `${day} ${month} ${year} at ${hour}:${minute}`;
}

export function isTodayDate(dateTime: string) {
  const future = new Date(dateTime);
  const now = new Date();
  const diff = future.getTime() - now.getTime();
  return diff < 1000 * 60 * 60 * 24;
}
