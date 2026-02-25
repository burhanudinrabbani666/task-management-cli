import fs from "node:fs";

import { homePage, rl } from "../../app.js";
import { getDataFromFile } from "../services/getDataFromFile.js";
import { redirectToHomePage } from "../utils/config.js";

export async function deleteTaskById(answerArray) {
  let task = answerArray.at(1)?.trim();

  if (task === "" || !task) {
    task = await rl.question("task ID: ");
  }

  getDataFromFile(({ data, error }) => {
    if (
      data?.toString("hex") === "0a" ||
      error?.code === "ENOENT" ||
      JSON.parse(data).length === 0 ||
      !JSON.parse(data)
    ) {
      return redirectToHomePage("You dont have task yet!");
    }

    const taskDataArray = JSON.parse(data);
    const taskData = taskDataArray.find((taskItem) => taskItem.id === task);

    if (!taskData) {
      redirectToHomePage("Task not Found!");
      return;
    }

    const newTaskData = taskDataArray.filter(
      (taskItem) => taskItem.id !== task,
    );

    fs.writeFile("taskData.json", JSON.stringify(newTaskData), (error) => {
      if (error) {
        console.log(error);
        return;
      }

      homePage();
    });
  });
}
