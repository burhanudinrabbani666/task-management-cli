import { renderCommand, rl } from "../../app.js";
import { getDataFromFile } from "../services/getDataFromFile.js";
import { redirectToHomePage } from "../utils/config.js";
import { renderTable } from "../utils/table.js";

export async function searchTask(answerArray) {
  let id = answerArray.at(1);

  if (!id) {
    id = (await rl.question("Task ID: ")).trim();
  }

  getDataFromFile(async ({ data, error }) => {
    if (
      error?.code === "ENOENT" ||
      JSON.parse(data).length === 0 ||
      !JSON.parse(data) ||
      data.toString("hex") === "0a"
    ) {
      redirectToHomePage("You dont have any task!");

      return;
    }

    if (error) {
      console.error(error);
      rl.close();
    }

    const taskData = JSON.parse(data);
    const result = taskData.filter((task) => task.id === id);

    console.clear();
    renderTable(result);
    renderCommand();
  });
}
