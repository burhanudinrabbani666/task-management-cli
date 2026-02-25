# Task Manager CLI

A command-line task management application built with Node.js. Create, view, edit, search, and remove tasks directly from your terminal.

begginer project of: https://roadmap.sh/projects/task-tracker

**Author:** Burhanudin Rabbani

---

## 🚀 Getting Started

```bash
npm start
```

---

## 🛠 Tech Stack

- **JavaScript** — Core language
- **Node.js** — Runtime environment
- **ESLint** — Code linting and style enforcement

---

## 📖 Command Reference

### Add a Task

```
add <task name>
-a <task name>
```

Creates a new task with the given name and saves it to your task list. A unique ID is automatically generated for each task.

**Example:**

```
add Running with Friend
-a Buy groceries
```

---

### View Tasks

```
view
-v
```

Displays all tasks in your list, including their ID, name, and current status (completed or incomplete).

You can optionally filter tasks by status using `w` (completed) or `l` (incomplete):

```
view w     → Show only completed tasks
view l     → Show only incomplete tasks
-v w       → Show only completed tasks
-v l       → Show only incomplete tasks
```

---

### View Task Details

```
view-task <id>
-vt <id>
```

Shows the full details of a single task by its ID, including its name, status, and any other stored metadata. If no ID is provided after the command, you will be prompted to enter one.

**Example:**

```
view-task 1234
-vt 1234
```

---

### Edit a Task

```
edit <id> <field> <value>
-e <id> <field> <value>
```

Edits an existing task by its ID. There are two editable fields:

| Field Code | Field     | Accepted Values                     |
| ---------- | --------- | ----------------------------------- |
| `tn`       | Task name | Any text string                     |
| `s`        | Status    | `w` (completed) or `l` (incomplete) |

If no ID is provided, you will be prompted to enter one.

**Examples:**

```
edit 1234 tn Go jogging with Friend     → Rename the task
edit 1234 s w                           → Mark task as completed
edit 1234 s l                           → Mark task as incomplete
-e 1234 s w
```

---

### Search Tasks

```
search <name>
-s <name>
```

Searches your task list for any tasks whose name contains the given query string. The search is not limited to exact matches — any task name that includes the query will appear in the results. If no name is provided, you will be prompted to enter one.

**Example:**

```
search running
-s buy
```

---

### Remove a Task

```
remove <id>
-rm <id>
```

Deletes a specific task from your list by its ID. This action is permanent. If no ID is provided after the command, you will be prompted to enter one.

**Example:**

```
remove 1234
-rm 1234
```

---

### Remove All Tasks

```
remove-all
-rma
```

Deletes every task in your list at once. A confirmation prompt will appear before anything is deleted, giving you a chance to cancel.

---

### Back / Home

```
back
-b
```

Returns you to the home page / main menu of the application.

---

### Close the App

```
close
-c
```

Exits and closes the application.

---

### ❓ Help

```
help
-h
```

Displays this command guide within the application.

---

## Command Summary

| Command                     | Alias     | Description                   |
| --------------------------- | --------- | ----------------------------- |
| `add <name>`                | `-a`      | Add a new task                |
| `view`                      | `-v`      | View all tasks                |
| `view w\|l`                 | `-v w\|l` | View filtered tasks by status |
| `view-task <id>`            | `-vt`     | View a task's details         |
| `edit <id> <field> <value>` | `-e`      | Edit a task's name or status  |
| `search <name>`             | `-s`      | Search tasks by name          |
| `remove <id>`               | `-rm`     | Remove a specific task        |
| `remove-all`                | `-rma`    | Remove all tasks              |
| `back`                      | `-b`      | Go to home page               |
| `close`                     | `-c`      | Close the application         |
| `help`                      | `-h`      | Show help guide               |

## 🙏 Thank You

Thank you for checking out this repository! Feedback, bug reports, and suggestions are always welcome — feel free to open an issue anytime. I'm open to all input and hope to keep growing this app with more features over time. 🚀
