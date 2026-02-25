import { renderTable } from "../utils/table.js";
import { homePage, renderCommand } from "../../app.js";
import { getDataFromFile } from "../services/getDataFromFile.js";
import { redirectToHomePage } from "../utils/config.js";

export async function viewTaskData(answerArray) {
  const task = answerArray.at(1);

  if (task && task !== "w" && task !== "l") {
    console.log("Input not Valid! Redirect to Homepage in 3 seconds...");

    setTimeout(() => {
      homePage();
    }, 3000);

    return;
  }

  getDataFromFile(async ({ data, error }) => {
    if (
      error?.code === "ENOENT" ||
      JSON.parse(data).length === 0 ||
      !JSON.parse(data) ||
      data.toString("hex") === "0a"
    ) {
      return redirectToHomePage("You dont have any task yet!");
    }

    const taskData = JSON.parse(data);

    let tasksToRender = taskData;

    if (task === "w") {
      tasksToRender = taskData.filter((task) => task.status === true);
    }

    if (task === "l") {
      tasksToRender = taskData.filter((task) => task.status === false);
    }

    renderTable(tasksToRender);
    renderCommand();
  });
}
