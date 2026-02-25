export const helpGuide = [
  {
    Command: "add OR -a",
    Description: "Add a new task.",
    example: "add Running with Friend OR -a Running with Friend",
  },
  {
    Command: "view OR -v",
    Description: "View all tasks.",
    example: "view OR -v",
  },
  {
    Command: "view [...w/l] OR -v [...w/l]",
    Description:
      "'w' to view all completed tasks and 'l' to view all incomplete tasks.",
    example: "view w OR -v l",
  },
  {
    Command: "view-task [...id] OR -vt [...id]",
    Description:
      "View task details by ID. If no ID is provided, you will be prompted to enter one.",
    example: "view-task 1234 OR -vt 1234",
  },
  {
    Command: "remove [...id] OR -rm [...id]",
    Description:
      "Remove a task by ID. If no ID is provided, you will be prompted to enter one.",
    example: "remove 1234 OR -rm 1234",
  },
  {
    Command: "remove-all OR -rma",
    Description: "Remove all tasks with confirmation.",
    example: "remove-all OR -rma",
  },
  {
    Command:
      "edit [...id] [...tn/s] [...task] OR -e [...id] [...tn/s] [...task]",
    Description:
      "Edit a task by ID. You can edit the task name or status field. Use 'tn' for task name and 's' for status. When editing status, set [...task] to ONLY (w OR l), where 'w' means completed and 'l' means not completed.",
    example: "edit 1234 s w OR -a 1234 s w ",
  },
  {
    Command: "search [...name] OR -s [...name]",
    Description:
      "Search for tasks by name. The result will show tasks that include the given query. If no name is provided, you will be prompted to enter one.",
    example: "search running OR -s running",
  },
  {
    Command: "back OR -b",
    Description: "Return to the home page.",
    example: "back OR -b",
  },
  {
    Command: "close OR -c",
    Description: "Close the application.",
    example: "close OR -c",
  },
  {
    Command: "help OR -h",
    Description: "Display the command guide.",
    example: "help OR -h",
  },
];
