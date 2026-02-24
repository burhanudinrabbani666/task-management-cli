import fs from "fs";

import { renderTable } from "../utils/table.js";
import { renderFeatures } from "../home.js";
import { homePage, rl } from "../../app.js";
import { getDataFromFile } from "../services/getDataFromFile.js";

const VIEW_ALL_TASK_FEATURES = [
  { id: 1, feature: "Edit one task status" },
  { id: 2, feature: "Delete one task" },
  { id: 3, feature: "Back to home page" },
  { id: 4, feature: "Close app" },
];

function handleAnswerViewAllTaskPage(answer) {}

export async function viewAllTask() {
  getDataFromFile(({ data, error }) => {
    if (
      error?.code === "ENOENT" ||
      JSON.parse(data).length === 0 ||
      !JSON.parse(data)
    ) {
      homePage();
      return;
    }

    const taskToRender = JSON.parse(data);

    renderTable(taskToRender);
  });
}
