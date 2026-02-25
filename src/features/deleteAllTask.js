import fs from "node:fs";
import { homePage, rl } from "../../app.js";
import { getDataFromFile } from "../services/getDataFromFile.js";
import { redirectToHomePage } from "../utils/config.js";

export async function deleteAllTask() {
  const answer = await rl.question("Are you sure want to delete all?(y/n)");

  getDataFromFile(({ data, error }) => {
    if (
      error?.code === "ENOENT" ||
      data?.toString("hex") === "0a" ||
      JSON.parse(data).length === 0
    ) {
      return redirectToHomePage("You dont have task yet!");
    }

    if (answer.toLowerCase() === "y") {
      fs.writeFile("taskData.json", JSON.stringify([]), (error) => {
        if (error) {
          console.log(error);
          homePage();
        }

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
  });
}
