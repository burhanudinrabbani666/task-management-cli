import { renderCommand, rl } from "../../app.js";
import { getDataFromFile } from "../services/getDataFromFile.js";
import { DATE_OPTION, redirectToHomePage } from "../utils/config.js";

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
    let result = taskData.filter((task) =>
      task.taskName.toLowerCase().includes(taskName.toLowerCase()),
    );

    if (result.length === 0) {
      return redirectToHomePage("Task not found!");
    }

    result = result.map((task) => {
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

    console.clear();
    console.table(result);

    renderCommand();
  });
}
