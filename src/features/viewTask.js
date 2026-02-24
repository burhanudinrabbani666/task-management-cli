import fs from "fs";

import { renderTable } from "../utils/table.js";
import { renderFeatures } from "../home.js";
import { homePage, rl } from "../../app.js";

const VIEW_ALL_TASK_FEATURES = [
  { id: 1, feature: "Edit one task status" },
  { id: 2, feature: "Delete one task" },
  { id: 3, feature: "Back to home page" },
  { id: 4, feature: "Close app" },
];

function handleAnswerViewAllTaskPage(answer) {}

export async function viewAllTask() {
  const readFile = fs.readFile("taskData.json", (error, data) => {
    if (error.code === "ENOENT") {
      console.log("No Task already, add new one! \n");
      homePage();

      return;
    }

    return { error, data };
  });

  // const { error, data } = readFile;

  // if (error) {
  //   console.log(error);
  //   return;
  // }

  // const taskToRender = JSON.parse(data);
  // renderTable(taskToRender);

  // // Render features
  // console.log(""); // Spacing
  // renderFeatures(VIEW_ALL_TASK_FEATURES);

  // // Render Question
  // const answer = await rl.question("What do you want to do? ");

  // // Function
  // handleAnswerViewAllTaskPage(answer);
}
