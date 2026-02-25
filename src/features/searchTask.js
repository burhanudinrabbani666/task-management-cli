import { renderCommand, rl } from "../../app.js";
import { getDataFromFile } from "../services/getDataFromFile.js";
import { redirectToHomePage } from "../utils/config.js";
import { renderTable } from "../utils/table.js";

export async function searchTask(answerArray) {
  let taskName = answerArray.at(1);

  if (!taskName) {
    taskName = (await rl.question("Task name: ")).trim();
  }

  getDataFromFile(async ({ data, error }) => {
    if (
      error?.code === "ENOENT" ||
      data?.toString("hex") === "0a" ||
      JSON.parse(data).length === 0
    ) {
      return redirectToHomePage("You dont have any task!");
    }

    if (error) {
      console.error(error);
      rl.close();
    }

    const taskData = JSON.parse(data);
    const result = taskData.filter((task) =>
      task.taskName.toLowerCase().includes(taskName.toLowerCase()),
    );

    if (result.length === 0) {
      return redirectToHomePage("Task not found!");
    }

    console.clear();
    renderTable(result);
    renderCommand();
  });
}
