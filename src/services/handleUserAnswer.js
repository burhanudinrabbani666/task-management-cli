import { homePage, renderCommand, rl } from "../../app.js";
import { addNewTask } from "../features/addTask.js";
import { deleteAllTask } from "../features/deleteAllTask.js";
import { searchTask } from "../features/searchTask.js";
import { viewTaskData } from "../features/viewTask.js";
import { detailTask } from "../features/detailTask.js";
import { editTask } from "../features/editTask.js";
import { deleteTaskById } from "../features/deleteTaskById.js";
import { redirectToHomePage } from "../utils/config.js";
import { helpGuide } from "../help.js";

export function handleAnswer(answer) {
  const answerArray = answer.trim().split(" ");

  const command = answerArray.at(0);

  // 1. add new task
  if (command === "add" || command === "-a") {
    addNewTask(answerArray);
    return;
  }

  // 2. view All task
  if (command === "view" || command === "-v") {
    console.clear();
    viewTaskData(answerArray);
    return;
  }

  // 3. Detail task data
  if (command === "view-task" || command === "-vt") {
    detailTask(answerArray);
    return;
  }

  // 6. Delete data by id
  if (command === "remove" || command === "-rm") {
    if (answerArray.length > 2) {
      redirectToHomePage("Input Not valid!");
      return;
    }

    deleteTaskById(answerArray);
    return;
  }

  // 7. Delete all data
  if (command === "remove-all" || command === "-rma") {
    if (answerArray.length > 1) {
      redirectToHomePage("Input Not valid!");
      return;
    }

    deleteAllTask();
    return;
  }

  // 8. Edit Task
  if (command === "edit" || command === "-e") {
    editTask(answerArray);
    return;
  }

  // 9. Search by id
  if (command === "search" || command === "-s") {
    if (answerArray.length > 2) {
      redirectToHomePage("Input Not valid!");
      return;
    }

    searchTask(answerArray);
    return;
  }

  // 10. Back to home page
  if (command === "back" || command === "-b") {
    homePage();
    return;
  }

  // 11. Close app
  if (command === "close" || command === "-c") {
    rl.close();

    console.clear();
    return;
  }

  // 12. Help
  if (command === "help" || command === "-h") {
    console.clear();

    renderGuide(helpGuide);
    renderCommand();

    return;
  }

  // Input invalid
  redirectToHomePage("Input not valid");
  return;
}

function renderGuide(helpGuide) {
  helpGuide.forEach((guide) => {
    console.log("-------------------------");
    console.log("Command: ", guide.Command);
    console.log("Example: ", guide.example);
    console.log("Description: ", guide.Description);
  });
}
