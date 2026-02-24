import fs from "fs";

import { getDataFromFile } from "../services/getDataFromFile.js";
import { homePageFeatures, rl } from "../../app.js";

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
    }

    if (error) {
      console.log(error);
      return;
    }

    // Create new Task object

    const newTask = {
      id: data.length === 0 ? 1 : data.at(-1).id + 1,
      taskTitle: task,
      status: false,
      createdAt: new Date().toLocaleString("en-Us"),
    };

    // Push
    data.push(newTask);

    // Rewirte Task
    fs.writeFile("taskData.json", JSON.stringify(data), (error) => {
      if (error) {
        console.log(error);
        return;
      }
    });

    // Display information
    console.log(newTaskFromUser, "Succesfully added 😃 \n");

    // Display homepageFeatures
    homePageFeatures();
  });
}
