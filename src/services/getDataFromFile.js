import fs from "fs";

export function getDataFromFile(callback) {
  fs.readFile("taskData.json", (error, data) => {
    callback({ data, error });
  });
}
