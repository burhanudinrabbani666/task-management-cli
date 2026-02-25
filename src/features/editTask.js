import fs from "node:fs";

import { getDataFromFile } from "../services/getDataFromFile.js";
import { homePage, rl } from "../../app.js";
import { redirectToHomePage } from "../utils/config.js";

export async function editTask(answerArray) {
  let id = answerArray.at(1);
  let field = answerArray.at(2);
  let task = answerArray.at(3);

  if (!id) {
    id = await rl.question("task ID: ");
  }

  if (!field) {
    field = (await rl.question("taskname/status: ")).trim();
    if (field !== "status" && field !== "taskname") {
      redirectToHomePage("Input Should be 'name' OR 'status'");
      return;
    }
  }

  if (field && field !== "status" && field !== "taskname") {
    redirectToHomePage("Command 3 Should be 'name' OR 'status'");
    return;
  }

  if (!task) {
    if (field === "status") {
      task = (await rl.question("New Status (w/l): ")).trim();
      if (task !== "w" && field !== "l") {
        redirectToHomePage("Input Should be 'w' OR 'l'");
        return;
      }
    }
    if (field === "name") {
      task = (await rl.question("New task name: ")).trim();
    }
  }

  if (task && field === "status") {
    if (task !== "w" && field !== "l") {
      redirectToHomePage("Command 4 Should be 'w' OR 'l'");
      return;
    }
  }

  // const { id, dataItem } = data;

  getDataFromFile(({ data, error }) => {
    if (
      error?.code === "ENOENT" ||
      JSON.parse(data).length === 0 ||
      !JSON.parse(data) ||
      data.toString("hex") === "0a"
    ) {
      redirectToHomePage("You dont have any task!");
    }

    let taskDataArray = JSON.parse(data);
    const taskToEdit = taskDataArray.find((taskData) => taskData.id === id);
    if (!taskToEdit) {
      redirectToHomePage("Task Not Found");
      return;
    }

    let newTask;

    if (field === "taskTitle") {
      newTask = {
        ...taskToEdit,
        taskName: task,
      };
    }

    if (field === "status") {
      let newStatus;
      if (task === "w") newStatus = true;
      if (task === "l") newStatus = false;

      newTask = {
        ...taskToEdit,
        status: newStatus,
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
