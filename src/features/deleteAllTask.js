import fs from "node:fs";
import { homePage, rl } from "../../app.js";

export async function deleteAllTask() {
  const answer = await rl.question("Are you sure want to delete all?(y/n)");

  if (answer.toLowerCase() === "y") {
    fs.writeFile("taskData.json", JSON.stringify([]), (error) => {
      if (error) console.log(error);
      return;
    });

    homePage();
  }

  if (answer.toLowerCase() === "n") {
    homePage();
  }

  console.log("input not valid");
  homePage();
  return;
}
