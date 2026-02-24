import fs from "fs";

import { renderTable } from "../utils/table.js";
import { renderFeatures } from "../home.js";
import { homePage, rl } from "../../app.js";
import { getDataFromFile } from "../services/getDataFromFile.js";
import { error } from "console";

export const VIEW_ALL_TASK_FEATURES = [
  { id: 1, feature: "-edit [id]" },
  { id: 2, feature: "-delete [id]" },
  { id: 3, feature: "back" },
  { id: 4, feature: "close" },
  { id: 5, feature: "help" },
];

export async function handleAnswerViewAllTaskPage(answerArray) {
  if (answerArray.length > 3) {
    console.error("Input not valid");
  }

  const command = answerArray[0];
  const id = answerArray[1];

  if (command === "-edit") {
  }

  if (command === "-delete") {
    getDataFromFile(({ data, error }) => {
      if (error) {
        console.log(error);
        return;
      }

      const taskData = JSON.parse(data);
      const newTasksData = taskData.filter((task) => task.id !== Number(id));

      fs.writeFile("taskData.json", JSON.stringify(newTasksData), (error) => {
        if (error) {
          console.log(error);

          return;
        }
      });

      getDataFromFile(({ data, error }) => {
        if (error) {
          console.log(error);
          return;
        }

        renderTable(JSON.parse(data));
      });
      return;
    });
  }

  // if (com === "3") {
  //   homePage();
  // }

  // if (answer === "4") rl.close();
}

export async function viewAllTask() {
  getDataFromFile(async ({ data, error }) => {
    if (
      error?.code === "ENOENT" ||
      JSON.parse(data).length === 0 ||
      !JSON.parse(data)
    ) {
      console.log("\n No Tasks! Add new task");
      homePage();
      return;
    }

    const taskToRender = JSON.parse(data);
    renderTable(taskToRender);

    renderFeatures(VIEW_ALL_TASK_FEATURES);
    const answer = await rl.question("What do you want to do? ");

    const answerArray = answer.split(" ");
    handleAnswerViewAllTaskPage(answerArray);
  });
}
