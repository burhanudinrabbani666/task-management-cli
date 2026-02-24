import fs from "fs";

import { renderTable } from "../utils/table.js";
import { renderFeatures } from "../home.js";
import { homePage, rl } from "../../app.js";
import { getDataFromFile } from "../services/getDataFromFile.js";

export const VIEW_ALL_TASK_FEATURES = [
  { id: 1, feature: "edit [id] OR e [id]" },
  { id: 2, feature: "delete [id] OR d [id]" },
  { id: 3, feature: "back OR b" },
  { id: 4, feature: "close OR c" },
  { id: 5, feature: "help OR h" },
];

export async function handleAnswerViewAllTaskPage(answerArray) {
  if (answerArray.length > 3) {
    console.error("Input not valid");
  }

  const command = answerArray[0];
  const id = answerArray[1];

  if (command === "edit" || command === "e") {
    console.log("e");
    return;
  }

  if (command === "back" || command === "b") {
    homePage();
    return;
  }

  if (command === "close" || command === "c") {
    rl.close();
    return;
  }

  if (command === "help" || command === "h") {
    console.log("this is help");
    return;
  }

  if (command === "delete" || command === "d") {
    getDataFromFile(({ data, error }) => {
      if (error) {
        console.log(error);
        return;
      }

      const taskData = JSON.parse(data);
      const taskDeleted = taskData.find((task) => task.id === Number(id));

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

        if (!data.length) {
          homePage(`${taskDeleted.taskTitle} Succesfully deleted \n`);
          return;
        }
      });
      viewAllTask();
      return;
    });

    console.log("Input not valid");
  }
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
