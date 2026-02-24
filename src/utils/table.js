import { homePage } from "../../app.js";
import { renderSpace } from "./config.js";

function table(type = "", taskToRender) {
  if (type === "line") {
    console.log(
      `|${"".toString().padEnd(3, "-")}|${"".padEnd(25, "-")}|${"".padEnd(20, "-")}|${"".padEnd(29, "-")}|`,
    );

    return;
  }

  if (type === "header") {
    console.log(
      `|${"Id".toString().padEnd(3, " ")}|${"Tasks".padEnd(25, " ")}|${"Status".padEnd(20, " ")}|${"Created at".padEnd(29, " ")}|`,
    );

    return;
  }

  const { id, taskTitle, status, createdAt } = taskToRender;
  console.log(
    `|${id.toString().padEnd(3, " ")}|${taskTitle.padEnd(25, " ")}|${(status ? "Completed" : "Not Completed").padEnd(20, " ")}|${createdAt.padEnd(29, " ")}|`,
  );
}

export function renderTable(tasksToRender) {
  if (tasksToRender.length === 0) {
    console.log("No task");

    homePage();
    return;
  }

  renderSpace();
  table("header");
  table("line");
  tasksToRender.forEach((task) => table("", task));
}
