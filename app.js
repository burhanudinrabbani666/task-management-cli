import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import { renderFeatures } from "./src/home.js";
import { addNewTask } from "./src/features/addTask.js";
import { viewAllTask } from "./src/features/viewTask.js";

export const rl = readline.createInterface({ input, output });

async function usingFeatures(answer) {
  if (answer === "1") addNewTask();
  if (answer === "2") viewAllTask();
  if (answer === "3") return rl.close();
}

export async function homePageFeatures() {
  renderFeatures();
  const answer = await rl.question("What do you want to do? ");
  usingFeatures(answer);
}

async function app() {
  homePageFeatures();
}

app();
