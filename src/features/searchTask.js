import { rl } from "../../app.js";
import { renderFeatures } from "../home.js";
import { getDataFromFile } from "../services/getDataFromFile.js";
import { renderTable } from "../utils/table.js";
import {
  handleAnswerViewAllTaskPage,
  VIEW_ALL_TASK_FEATURES,
} from "./viewTask.js";

export function searchTask(taskName) {
  getDataFromFile(async ({ data, error }) => {
    if (error) {
      console.error(error);
    }

    const taskData = JSON.parse(data);
    const result = taskData.filter((task) =>
      task.taskTitle.toLowerCase().includes(taskName.toLowerCase()),
    );

    renderTable(result);

    renderFeatures(VIEW_ALL_TASK_FEATURES);
    const answer = await rl.question("What do you want to do? ");

    handleAnswerViewAllTaskPage(answer);
  });
}
