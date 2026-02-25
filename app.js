import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import { getDataFromFile } from "./src/services/getDataFromFile.js";
import { renderTable } from "./src/utils/table.js";
import { handleAnswer } from "./src/services/handleUserAnswer.js";
import { DATE_OPTION } from "./src/utils/config.js";

export const rl = readline.createInterface({ input, output });

export async function renderCommand() {
  const answer = await rl.question("\nCommand: ");
  handleAnswer(answer);
}

export async function homePage() {
  console.clear();
  console.log(
    "Hello".padEnd(20, " "),
    new Date().toLocaleString("en-UK", DATE_OPTION),
    "\n",
  );

  getDataFromFile(async ({ data, error }) => {
    if (
      data?.toString("hex") === "0a" ||
      error?.code === "ENOENT" ||
      JSON.parse(data).length === 0
    ) {
      console.log("No tasks found. Start by creating a new task.");
      renderCommand();

      return;
    }

    // render if data already exist
    const taskData = JSON.parse(data);
    const todayTask = taskData.filter(
      (task) =>
        new Date(task.createdAt).toLocaleString("en-UK", DATE_OPTION) ===
        new Date().toLocaleString("en-UK", DATE_OPTION),
    );

    if (todayTask.length > 0) renderTable(todayTask);
    if (todayTask.length === 0)
      console.log("You dont have task today. Add new one 💪");

    renderCommand();
  });
}

async function app() {
  homePage();
}

app();
