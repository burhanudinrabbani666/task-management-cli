import fs from "fs";

import { renderTable } from "../utils/table.js";
import { renderFeatures } from "../home.js";

const VIEW_ALL_TASK_FEATURES = [
  { id: 1, feature: "Edit one task status" },
  { id: 2, feature: "Delete one task" },
  { id: 3, feature: "Back to home page" },
  { id: 4, feature: "Close app" },
];

export async function viewAllTask() {
  fs.readFile("taskData.json", (error, data) => {
    if (error) {
      console.log(error);
      return;
    }

    const taskToRender = JSON.parse(data);
    renderTable(taskToRender);

    console.log(""); // Spacing
    renderFeatures(VIEW_ALL_TASK_FEATURES);
  });
}
