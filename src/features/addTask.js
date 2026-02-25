import fs from "fs";

import { getDataFromFile } from "../services/getDataFromFile.js";
import { homePage, rl } from "../../app.js";

export async function addNewTask(answerArray) {
  let taskName = answerArray.slice(1).join(" ").trim();

  if (!taskName || taskName === "") {
    taskName = await rl.question("Enter task name: ");
  }

  const newTask = {
    id: (Math.random() * 9999999).toFixed().toString(),
    taskName,
    status: false,
    createdAt: new Date(),
    updatedAt: null,
  };

  addNewTaskToData(newTask);
}

function addNewTaskToData(newTask) {
  getDataFromFile(({ data, error }) => {
    // first initial data
    if (
      error?.code === "ENOENT" ||
      data.toString("hex") === "0a" ||
      data.toString("hex") === ""
    ) {
      fs.writeFile("taskData.json", JSON.stringify([newTask]), (error) => {
        if (error) {
          console.log(error);
          return;
        }
      });
      homePage(`Successfully add ${newTask.taskName}`);
      return;
    }
    if (error) {
      console.log(error);
      return;
    }
    const taskDataArray = JSON.parse(data);
    // Push
    taskDataArray.unshift(newTask);
    // Rewirte Task
    fs.writeFile("taskData.json", JSON.stringify(taskDataArray), (error) => {
      if (error) {
        console.log(error);
        return;
      }
      homePage(`Successfully add ${newTask.taskName}`);
    });
  });
}
