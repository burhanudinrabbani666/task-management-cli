import { homePage, rl } from "../../app.js";
import { addNewTask } from "../features/addTask.js";
import { deleteAllTask } from "../features/deleteAllTask.js";
import { searchTask } from "../features/searchTask.js";
import { viewTaskData } from "../features/viewTask.js";
import { detailTask } from "../features/detailTask.js";
import { editTask } from "../features/editTask.js";
import { deleteTaskById } from "../features/deleteTaskById.js";

export function handleAnswer(answer) {
  const answerArray = answer.split(" ");

  const command = answerArray.at(0);
  let task = answerArray.at(1)?.trim();

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
    deleteTaskById(answerArray);
    return;
  }

  // // 7. Delete all data
  // if (command === "delete-all" || command === "-da") {
  //   deleteAllTask();
  //   return;
  // }

  // // 8. Edit data name by id
  // if (command === "edit-name" || command === "-en") {
  //   console.clear();

  //   const id = Number(task);
  //   const dataItem = answerArray.at(2);

  //   editTask("taskTitle", { id, dataItem });
  //   return;
  // }

  // // 9. Edit data Status by id
  // if (command === "edit-status" || command === "-es") {
  //   console.clear();

  //   const id = Number(task);
  //   const dataItem = answerArray.at(2);

  //   editTask("status", { id, dataItem });
  //   return;
  // }

  // // Search by name
  // if (command === "search" || command === "-s") {
  //   searchTask(task);
  //   return;
  // }

  // 10. Back to home page
  if (command === "back" || command === "-b") {
    homePage();
    return;
  }

  // 11. Close app
  if (command === "close" || command === "-c") {
    rl.close();
    return;
  }

  // Input invalid
}
