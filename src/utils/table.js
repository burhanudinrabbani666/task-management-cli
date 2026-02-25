import { homePage } from "../../app.js";

function table(type = "", taskToRender) {
  if (type === "line") {
    console.log(
      `|${"".padEnd(8, "-")}|${"".padEnd(100, "-")}|${"".padEnd(6, "-")}|`,
    );

    return;
  }

  if (type === "header") {
    console.log(
      `|${"ID".padEnd(8, " ")}|${"Tasks".padEnd(100, " ")}|${"Status".padEnd(6, " ")}|`,
    );

    return;
  }

  const { id, taskName, status } = taskToRender;
  console.log(
    `|${id.padEnd(8, " ")}|${taskName.padEnd(100, " ")}|${(status ? "✅" : "❌").padStart(3, " ").padEnd(5, " ")}|`,
  );
}

export function renderTable(tasksToRender) {
  if (tasksToRender.length === 0) {
    console.log("No task");

    homePage();
    return;
  }

  table("header");
  table("line");
  tasksToRender.forEach((task) => table("", task));
}
