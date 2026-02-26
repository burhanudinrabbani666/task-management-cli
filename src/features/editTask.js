import fs from "node:fs";

import { getDataFromFile } from "../services/getDataFromFile.js";
import { homePage, rl } from "../../app.js";
import { redirectToHomePage } from "../utils/config.js";

export async function editTask(answerArray) {
  getDataFromFile(async ({ data, error }) => {
    if (
      error?.code === "ENOENT" ||
      data?.toString("hex") === "0a" ||
      JSON.parse(data).length === 0
    ) {
      return redirectToHomePage("You dont have any task!");
    }

    let id = answerArray.at(1);
    let field = answerArray.at(2);
    let task = answerArray.slice(3).join(" ");

    if (answerArray[3] === "") {
      task = "";
    }

    if (!id || "") {
      id = await rl.question("task ID: ");
    }

    if (!field || "") {
      field = (await rl.question("tn/s: ")).trim();
      task = "";
      if (field !== "s" && field !== "tn") {
        redirectToHomePage("Input Should be 'name' OR 'status'");
        return;
      }
    }

    if (field && field !== "s" && field !== "tn") {
      redirectToHomePage("Command 3 Should be 'name' OR 'status'");
      return;
    }

    if (task === "") {
      if (field === "s") {
        task = (await rl.question("New Status (w/l): ")).trim();

        if (task !== "w" && task !== "l") {
          redirectToHomePage("Input Should be 'w' OR 'l'");
          return;
        }
      }
      if (field === "tn") {
        task = (await rl.question("New task name: ")).trim();
      }
    }

    if (task && field === "s") {
      if (task !== "w" && task !== "l") {
        redirectToHomePage("Command 4 Should be 'w' OR 'l'");
        return;
      }
    }

    let taskDataArray = JSON.parse(data);
    const taskToEdit = taskDataArray.find((taskData) => taskData.id === id);
    if (!taskToEdit) {
      redirectToHomePage("Task Not Found");
      return;
    }

    let newTask;

    if (field === "tn") {
      newTask = {
        ...taskToEdit,
        taskName: task,
        updatedAt: new Date(),
      };
    }

    if (field === "s") {
      let newStatus;
      if (task === "w") newStatus = true;
      if (task === "l") newStatus = false;

      newTask = {
        ...taskToEdit,
        status: newStatus,
        updatedAt: new Date(),
      };
    }

    taskDataArray = taskDataArray.map((task) =>
      task.id === id ? newTask : task,
    );

    fs.writeFile("taskData.json", JSON.stringify(taskDataArray), (error) => {
      if (error) {
        console.log(error);
        return;
      }

      homePage();
    });
  });
}
