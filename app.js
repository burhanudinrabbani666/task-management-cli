import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import { renderFeatures } from "./src/home.js";
import { addNewTask } from "./src/features/addTask.js";
import { viewAllTask } from "./src/features/viewTask.js";

export const rl = readline.createInterface({ input, output });

const HOME_PAGE_FEATURES = [
  { id: 1, feature: "add [task name] OR a [task name]" },
  { id: 2, feature: "view OR v" },
  { id: 3, feature: "search [task name] OR s [task name]" },
  { id: 4, feature: "delete-all OR da" },
  { id: 5, feature: "close OR c" },
];

async function handleAnswerHomePage(answerArray) {
  if (answerArray.length > 3) {
    console.log("Input not valid");
    return;
  }

  const command = answerArray[0];
  const taskName = answerArray[1];

  console.log(command);

  if (command === "add" || command === "a") {
    addNewTask(taskName);
    return;
  }

  if (command === "view" || command === "v") {
    viewAllTask();
    return;
  }

  if (command === "search" || command === "s") {
    viewAllTask();
    return;
  }

  if (command === "delete-all" || command === "da") {
    viewAllTask();
    return;
  }

  if (command === "close" || command === "c") {
    rl.close();
  } else {
    console.log("input not valid");
  }
}

export async function homePage() {
  renderFeatures(HOME_PAGE_FEATURES);
  const answer = await rl.question("What do you want to do? ");
  const answerArray = answer.trim().split(" ");

  handleAnswerHomePage(answerArray);

  return;
}

async function app() {
  homePage();
}

app();
