import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import { renderFeatures } from "./src/home.js";
import { getDataFromFile } from "./src/services/getDataFromFile.js";
import { renderTable } from "./src/utils/table.js";
import { handleAnswer } from "./src/services/handleUserAnswer.js";

export const rl = readline.createInterface({ input, output });

const HOME_PAGE_FEATURES = [
  { id: 1, feature: "add [task-name] OR a [task-name]" },
  { id: 2, feature: "view OR -v" },
  { id: 3, feature: "view-all-completed-task OR -vt" },
  { id: 4, feature: "view-all-not-completed-task OR -vf" },
  { id: 5, feature: "search [task-name] OR -s [task-name]" },
  { id: 6, feature: "detail [id] OR -d [id]" },
  { id: 7, feature: "delete-all OR -da" },
  { id: 8, feature: "close OR -c" },
];

export async function renderHomepageFeatures() {
  renderFeatures(HOME_PAGE_FEATURES);
  const answer = await rl.question("What do you want to do? ");
  handleAnswer(answer);
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
    const taskData = JSON.parse(data);

    renderTable(taskData);
    renderHomepageFeatures();

    return;
  });
}

async function app() {
  homePage();
}

app();
