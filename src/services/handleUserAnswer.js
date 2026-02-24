import fs from "node:fs";

import { homePage, rl } from "../../app.js";
import { addNewTask } from "../features/addTask.js";
import { deleteAllTask } from "../features/deleteAllTask.js";
import { searchTask } from "../features/searchTask.js";
import { viewAllTask } from "../features/viewTask.js";
import { getDataFromFile } from "./getDataFromFile.js";
import { detailTask } from "../features/detailTask.js";

export function handleAnswer(answer) {
  const answerArray = answer.split(" ");

  const command = answerArray.at(0);
  let task = answerArray.at(1)?.trim();

  // 1. add new task
  if (command === "add" || command === "-a") {
    addNewTask(task);
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
    const id = Number(task);
    const newName = answerArray.at(2);

    return;
  }

  // 9. Edit data Status by id
  // Search by name
  if (command === "search" || command === "-s") {
    searchTask(task);
    return;
  }

  // 10. Back to home page
  // 11. Close app
  if (command === "close" || command === "-c") {
    rl.close();
    return;
  }

  // Input invalid
}
