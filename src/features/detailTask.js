import { homePage, rl } from "../../app.js";
import { renderFeatures } from "../home.js";
import { getDataFromFile } from "../services/getDataFromFile.js";
import { handleAnswer } from "../services/handleUserAnswer.js";

const DETAIL_PAGE_FEATURES = [
  { id: 1, feature: "edit-name [id] [task-name] OR -en id [task-name]" },
  { id: 2, feature: "edit-status [id] w/l  OR -es id w/l" },
  { id: 3, feature: "back OR -b" },
];

export function detailTask(task) {
  getDataFromFile(async ({ data, error }) => {
    if (error) {
      homePage(error.message);
    }

    const tasksData = JSON.parse(data);
    const taskToRender = tasksData.find(
      (taskItem) => taskItem.id === Number(task),
    );

    if (!taskToRender) {
      homePage("Task no Found!");

      return;
    }

    const { id, taskTitle, status, createdAt } = taskToRender;

    console.log(`${"ID".padEnd(15, " ")}: `, id);
    console.log(`${"Task".padEnd(15, " ")}: `, taskTitle);
    console.log(
      `${"status".padEnd(15, " ")}: `,
      status ? "✅ Completed" : "❌ Not Completed ",
    );
    console.log(`${"Created at".padEnd(15, " ")}: `, createdAt);

    renderFeatures(DETAIL_PAGE_FEATURES);
    const answer = await rl.question("What next: ");

    handleAnswer(answer);
  });
}
