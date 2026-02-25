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

    const taskToRender = tasksData.find(
      (taskItem) => taskItem.id === task.trim(),
    );

    if (!taskToRender) {
      redirectToHomePage("Task not found!");
      return;
    }

    const { id, taskName, status, createdAt, updatedAt } = taskToRender;

    console.log(`${"ID".padEnd(PADDING_DETAIL, " ")}: `, id);
    console.log(`${"Task name".padEnd(PADDING_DETAIL, " ")}: `, taskName);
    console.log(
      `${"status".padEnd(PADDING_DETAIL, " ")}: `,
      status ? "✅ Completed" : "❌ Not Completed ",
    );
    console.log(
      `${"Created at".padEnd(PADDING_DETAIL, " ")}: `,
      new Date(createdAt).toLocaleString("en-UK", DATE_OPTION),
    );
    console.log(
      `${"Updated at".padEnd(PADDING_DETAIL, " ")}: `,
      new Date(updatedAt).toLocaleString("en-UK", DATE_OPTION),
    );

    renderCommand();
  });
}
