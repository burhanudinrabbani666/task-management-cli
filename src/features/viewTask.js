import { renderCommand } from "../../app.js";
import { getDataFromFile } from "../services/getDataFromFile.js";
import { DATE_OPTION, redirectToHomePage } from "../utils/config.js";

export async function viewTaskData(answerArray) {
  const task = answerArray.at(1);

  if (task && task !== "w" && task !== "l") {
    return redirectToHomePage("Input not valid!");
  }

  getDataFromFile(async ({ data, error }) => {
    if (
      error?.code === "ENOENT" ||
      JSON.parse(data).length === 0 ||
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

    tasksToRender = tasksToRender.map((task) => {
      const taskItem = {
        Id: task.id,
        Task: task.taskName,
        Status: task.status ? "✅" : "❌",
        Created_At: new Date(task.createdAt).toLocaleString(
          "en-US",
          DATE_OPTION,
        ),
        Ureated_At: task.updatedAt
          ? new Date(task.updatedAt).toLocaleString("en-US", DATE_OPTION)
          : "---",
      };

      return taskItem;
    });

    console.table(tasksToRender);
    renderCommand();
  });
}
