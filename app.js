import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import { renderFeatures } from "./src/home.js";
import { addNewTask } from "./src/features/addTask.js";
import { viewAllTask } from "./src/features/viewTask.js";
import { searchTask } from "./src/features/searchTask.js";
import { renderSpace } from "./src/utils/config.js";
import { deleteAllTask } from "./src/features/deleteAllTask.js";
import { getDataFromFile } from "./src/services/getDataFromFile.js";
import { renderTable } from "./src/utils/table.js";

export const rl = readline.createInterface({ input, output });

const HOME_PAGE_FEATURES = [
  { id: 1, feature: "add [task name] OR a [task-name]" },
  { id: 2, feature: "view OR v" },
  { id: 3, feature: "search [task name] OR s [task-name]" },
  { id: 4, feature: "delete-all OR da" },
  { id: 5, feature: "close OR c" },
];

async function handleAnswerHomePage(answerArray) {
  if (answerArray.length > 3) {
    console.log("Input not valid");
    return;
  }

  const command = answerArray[0];
  const taskNameRaw = answerArray[1];
  const taskName = taskNameRaw?.trim().split("-").join(" ");

  if (command === "add" || command === "a") {
    addNewTask(taskName);
    return;
  }

  if (command === "view" || command === "v") {
    console.clear();
    viewAllTask();
    return;
  }

  if (command === "search" || command === "s") {
    searchTask(taskName);
    return;
  }

  if (command === "delete-all" || command === "da") {
    deleteAllTask();
    return;
  }

  if (command === "close" || command === "c") {
    rl.close();
    return;
  }

  console.log("input not valid");
}

export async function homePage(message) {
  console.clear();
  message && console.log(`${message} \n`);

  getDataFromFile(async ({ data, error }) => {
    if (error) {
      console.error(error);
      return;
    }

    const taskData = JSON.parse(data); // error after adding new task
    renderTable(taskData);

    renderFeatures(HOME_PAGE_FEATURES);
    const answer = await rl.question("What do you want to do? ");
    const answerArray = answer.trim().split(" ");

    handleAnswerHomePage(answerArray);

    return;
  });
}

async function app() {
  homePage();
}

app();
