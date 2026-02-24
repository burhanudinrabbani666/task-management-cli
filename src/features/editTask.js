import fs from "node:fs";

import { homePage } from "../../app.js";
import { getDataFromFile } from "../services/getDataFromFile.js";
import { detailTask } from "./detailTask.js";

export function editTask(field, data) {
  const { id, dataItem } = data;

  getDataFromFile(({ data, error }) => {
    if (error) {
      console.log(error);
      return;
    }

    let taskDataArray = JSON.parse(data);
    const taskToEdit = taskDataArray.find((task) => task.id === id);
    let newTask;

    if (field === "taskTitle") {
      newTask = {
        ...taskToEdit,
        taskTitle: dataItem,
      };
    }

    if (field === "status") {
      let newStatus;
      if (dataItem === "w") newStatus = true;
      if (dataItem === "l") newStatus = false;

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

      detailTask(id);
    });
  });
}
