import fs from "fs";

import { getDataFromFile } from "../services/getDataFromFile.js";
import { homePage } from "../../app.js";
import { renderSpace } from "../utils/config.js";

function displaySuccesfullyMessage(newTaskFromUser) {
  // Display information
  console.log(newTaskFromUser, "Succesfully added 😃 \n");

  // Display homepageFeatures
  homePage();
}

export async function addNewTask(taskName) {
  const task = taskName.trim();

  getDataFromFile(({ data, error }) => {
    // first initial data
    if (
      error?.code === "ENOENT" ||
      data.toString("hex") === "0a" ||
      data.toString("hex") === ""
    ) {
      const newTask = {
        id: 1,
        taskTitle: task,
        status: false,
        createdAt: new Date().toLocaleString("en-Us"),
      };

      fs.writeFile("taskData.json", JSON.stringify([newTask]), (error) => {
        if (error) {
          console.log(error);
          return;
        }
      });

      renderSpace();
      displaySuccesfullyMessage(task);
      return;
    }

    if (error) {
      console.log(error);
      return;
    }

    const taskDataArray = JSON.parse(data);

    // Create new Task object
    const newTask = {
      id: taskDataArray.length === 0 ? 1 : taskDataArray.at(-1).id + 1,
      taskTitle: task,
      status: false,
      createdAt: new Date().toLocaleString("en-Us"),
    };

    // Push
    taskDataArray.push(newTask);

    // Rewirte Task
    fs.writeFile("taskData.json", JSON.stringify(taskDataArray), (error) => {
      if (error) {
        console.log(error);
        return;
      }
    });

    renderSpace();
    displaySuccesfullyMessage(task);
    return;
  });
}
