import { renderCommand, rl } from "../../app.js";
import { getDataFromFile } from "../services/getDataFromFile.js";
import {
  DATE_OPTION,
  PADDING_DETAIL,
  redirectToHomePage,
} from "../utils/config.js";

export async function detailTask(answerArray) {
  let task = answerArray.at(1)?.trim();

  if (task === "" || !task) {
    task = await rl.question("task ID: ");
  }

  console.clear();
  getDataFromFile(async ({ data, error }) => {
    if (
      error?.code === "ENOENT" ||
      data?.toString("hex") === "0a" ||
      JSON.parse(data).length === 0
    ) {
      return redirectToHomePage("You dont have task yet!");
    }

    const tasksData = JSON.parse(data);

    const searchTaskById = tasksData.find(
      (taskItem) => taskItem.id === task.trim(),
    );

    if (!searchTaskById) {
      redirectToHomePage("Task not found!");
      return;
    }

    const { id, taskName, status, createdAt, updatedAt } = searchTaskById;

    const taskToRender = {
      Id: id,
      Task: taskName,
      status: status ? "✅ Completed" : "❌ Not Completed",
      Created_At: new Date(createdAt).toLocaleString("en-Us", DATE_OPTION),
      Updated_At: new Date(updatedAt).toLocaleString("en-Us", DATE_OPTION),
    };

    console.table(taskToRender);

    renderCommand();
  });
}
