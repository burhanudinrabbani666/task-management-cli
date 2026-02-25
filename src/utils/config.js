import { homePage } from "../../app.js";

export function renderSpace() {
  console.log("\n \n \n \n \n \n \n \n \n \n");
}

export const DATE_OPTION = {
  day: "numeric",
  month: "long",
  year: "numeric",
};

export function redirectToHomePage(message) {
  console.log(`${message} Redirect to Home page in 3 seconds`);

  setTimeout(() => {
    homePage();
  }, 3000);
}
