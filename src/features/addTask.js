import fs from "fs";

import { getDataFromFile } from "../services/getDataFromFile.js";
import { homePage, rl } from "../../app.js";

function displaySuccesfullyMessage(newTaskFromUser) {
  // Display information
  console.log(newTaskFromUser, "Succesfully added 😃 \n");

  // Display homepageFeatures
  homePage();
}

export async function addNewTask() {
  const newTaskFromUser = await rl.question("add new Task: ");
  const task = newTaskFromUser.trim();

  getDataFromFile(({ data, error }) => {
    // first initial data
    if (error?.code === "ENOENT") {
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

      displaySuccesfullyMessage(newTaskFromUser);
      return;
    }

    if (error) {
      console.log(error);
      return;
    }
    const taskDataArray = JSON.parse(data);

    // Create new Task object
    const newTask = {
      id: taskDataArray.length === 0 ? 1 : data.at(-1).id + 1,
      taskTitle: task,
      status: false,
      createdAt: new Date().toLocaleString("en-Us"),
    };

    // Push
    taskDataArray.push(newTask);

    // Rewirte Task
    fs.writeFile("taskData.json", JSON.stringify(data), (error) => {
      if (error) {
        console.log(error);
        return;
      }
    });

    displaySuccesfullyMessage(newTaskFromUser);
  });
}
