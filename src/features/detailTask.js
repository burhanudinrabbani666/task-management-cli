import { renderCommand, rl } from "../../app.js";
import { getDataFromFile } from "../services/getDataFromFile.js";
import { DATE_OPTION, redirectToHomePage } from "../utils/config.js";

export async function detailTask(answerArray) {
  let task = answerArray.at(1)?.trim();

  if (task === "" || !task) {
    task = await rl.question("task ID: ");
  }

  console.clear();
  getDataFromFile(async ({ data, error }) => {
    if (
      error?.code === "ENOENT" ||
      JSON.parse(data).length === 0 ||
      !JSON.parse(data)
    ) {
      redirectToHomePage("You dont have task yet!");
      return;
    }

    const tasksData = JSON.parse(data);

    const taskToRender = tasksData.find(
      (taskItem) => taskItem.id === task.trim(),
    );

    if (!taskToRender) {
      redirectToHomePage("Task not found!");
      return;
    }

    const { id, taskName, status, createdAt } = taskToRender;

    console.log(`${"ID".padEnd(15, " ")}: `, id);
    console.log(`${"Task name".padEnd(15, " ")}: `, taskName);
    console.log(
      `${"status".padEnd(15, " ")}: `,
      status ? "✅ Completed" : "❌ Not Completed ",
    );
    console.log(
      `${"Created at".padEnd(15, " ")}: `,
      new Date(createdAt).toLocaleString("en-UK", DATE_OPTION),
    );

    renderCommand();
  });
}
