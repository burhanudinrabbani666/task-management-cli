import fs from "fs";

export function getDataFromFile(callback) {
  fs.readFile("taskData.json", (error, taskData) => {
    callback({ data: JSON.parse(taskData), error });
  });
}
