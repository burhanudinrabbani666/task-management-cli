import fs from "fs";

import { renderTable } from "../utils/table.js";

export async function viewAllTask() {
  fs.readFile("taskData.json", (error, data) => {
    if (error) {
      console.log(error);
      return;
    }

    const taskToRender = JSON.parse(data);
    renderTable(taskToRender);
  });
}
