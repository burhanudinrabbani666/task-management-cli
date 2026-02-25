import fs from "node:fs";

import { homePage, rl } from "../../app.js";
import { addNewTask } from "../features/addTask.js";
import { deleteAllTask } from "../features/deleteAllTask.js";
import { searchTask } from "../features/searchTask.js";
import { viewAllTask } from "../features/viewTask.js";
import { getDataFromFile } from "./getDataFromFile.js";
import { detailTask } from "../features/detailTask.js";
import { editTask } from "../features/editTask.js";

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
    viewAllTask();
    return;
  }

  // 3. view all completed task
  if (command === "view-all-completed-task" || command === "-vt") {
    console.clear();
    viewAllTask("-vt");
    return;
  }

  // 4. view all not completed task
  if (command === "view-all-completed-task" || command === "-vf") {
    console.clear();
    viewAllTask("-vf");
    return;
  }

  // 5. Detail task data
  if (command === "detail" || command === "-d") {
    console.clear();
    detailTask(task);
    return;
  }

  // 6. Delete data by id
  // 7. Delete all data
  if (command === "delete-all" || command === "-da") {
    deleteAllTask();
    return;
  }

  // 8. Edit data name by id
  if (command === "edit-name" || command === "-en") {
    console.clear();

    const id = Number(task);
    const dataItem = answerArray.at(2);

    editTask("taskTitle", { id, dataItem });
    return;
  }

  // 9. Edit data Status by id
  if (command === "edit-status" || command === "-es") {
    console.clear();

    const id = Number(task);
    const dataItem = answerArray.at(2);

    editTask("status", { id, dataItem });
    return;
  }

  // Search by name
  if (command === "search" || command === "-s") {
    searchTask(task);
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
    return;
  }

  // Input invalid
}
