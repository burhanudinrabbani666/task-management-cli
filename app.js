import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import { renderFeatures } from "./src/home.js";
import { addNewTask } from "./src/features/addTask.js";
import { viewAllTask } from "./src/features/viewTask.js";

export const rl = readline.createInterface({ input, output });

const HOME_PAGE_FEATURES = [
  { id: 1, feature: "Add Task" },
  { id: 2, feature: "View all task" },
  { id: 3, feature: "Search task" },
  { id: 4, feature: "Delete all task" },
  { id: 5, feature: "Close" },
];

async function usingFeatures(answer) {
  if (answer === "1") addNewTask();
  if (answer === "2") viewAllTask();
  if (answer === "5") return rl.close();
}

export async function homePage() {
  renderFeatures(HOME_PAGE_FEATURES);
  const answer = await rl.question("What do you want to do? ");
  usingFeatures(answer);
}

async function app() {
  homePage();
}

app();
