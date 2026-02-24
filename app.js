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
import { handleAnswer } from "./src/services/handleUserAnswer.js";

export const rl = readline.createInterface({ input, output });

const HOME_PAGE_FEATURES = [
  { id: 1, feature: "add [task name] OR a [task-name]" },
  { id: 2, feature: "view OR -v" },
  { id: 3, feature: "search [task name] OR -s [task-name]" },
  { id: 4, feature: "delete-all OR -da" },
  { id: 5, feature: "close OR -c" },
];

export async function renderHomepageFeatures() {
  renderFeatures(HOME_PAGE_FEATURES);
  const answer = await rl.question("What do you want to do? ");
  const answerArray = answer.trim().split(" ");
  answerArray;
}

export async function homePage(message) {
  console.clear();
  message && console.log(`${message} \n`);

  getDataFromFile(async ({ data, error }) => {
    if (error?.code === "ENOENT") {
      renderHomepageFeatures();
      return;
    }

    // render if data already exist
    const taskData = JSON.parse(data); // error after adding new task
    renderTable(taskData);

    renderHomepageFeatures();
    return;
  });
}

async function app() {
  homePage();
}

app();
