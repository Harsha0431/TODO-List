

## **Capstone Project: Task Management App**



#### **Project Description**

Build a small **Task Management App** using **TypeScript** where users can:
1. **View a list of tasks**.
2. **Add a new task**.
3. **Mark a task as completed**.
4. (Optional, based on YAGNI) **Filter tasks by status** (all, completed, pending).

The project will enforce **SOLID**, **KISS**, **DRY**, and **YAGNI** principles to ensure clean, modular, and reusable code.

---

### **Requirements**

#### Core Features:
1. List all tasks.
2. Allow users to add a task.
3. Allow users to toggle a task's status (completed/incomplete).

#### Optional Features:
- Filter tasks based on their status (e.g., pending, completed).
- Add animations or transitions for the task list (nice-to-have, not essential).

---

### **Tech Stack**

1. **Frontend Framework**: React with TypeScript.
2. **Styling**: Your choice (TailwindCSS, plain CSS, or a CSS-in-JS library like Styled Components).
3. **State Management**: React's built-in `useState` or `useReducer` for simplicity.

---

### **Deliverables**

By the end, you will:
- Apply **SOLID principles** in frontend components.
- Modularize using **DRY** logic and shared hooks or utility functions.
- Avoid overengineering following **YAGNI.**
- Keep the implementation minimal and clean following **KISS**.

---

### **Steps to Implement the Task Management App**

---

#### 1. **Project Setup**
1. Initialize React with TypeScript:
   ```bash
   npx create-react-app task-manager --template typescript
   cd task-manager
   ```
2. Install TailwindCSS (optional for styling):
   ```bash
   npm install tailwindcss postcss autoprefixer
   npx tailwindcss init
   ```
3. Modify `tailwind.config.js` and import Tailwind in `index.css`.

---

#### 2. **Project Structure**

Organize the project as:

```plaintext
src/
├── components/            # Reusable components.
│   ├── TaskList.tsx       # Renders a list of tasks.
│   ├── TaskItem.tsx       # Renders a single task.
│   ├── AddTaskForm.tsx    # A form to add a new task.
│   └── FilterBar.tsx      # (Optional) Filters tasks by status.
├── hooks/                 # Shared hooks.
│   ├── useTasks.ts        # Custom hook for task-related logic.
├── services/              # Utility functions (following DRY).
│   ├── uuidGenerator.ts   # Generates unique task IDs.
│   └── validateInput.ts   # Validates task input.
├── types/                 # Shared types for TypeScript.
│   ├── Task.ts
├── App.tsx                # Main application component.
└── index.tsx              # Entry point.
```

---

#### 3. **Step-by-Step Implementation**

---

### **Step 1: Define the Data Model (TypeScript Interface)**

Create a type for tasks in `src/types/Task.ts`:

```typescript
export interface Task {
  id: string;
  title: string;
  completed: boolean;
}
```

---

### **Step 2: Task Management State (KISS)**

For managing the tasks, use `useState` or `useReducer` in a custom hook (`src/hooks/useTasks.ts`):

```typescript
import { useState } from "react";
import { Task } from "../types/Task";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(), // Generates a unique ID.
      title,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return { tasks, addTask, toggleTask, removeTask };
};
```

---

### **Step 3: Build Components (SOLID)**

---

#### 3.1 **TaskList Component**
Responsible for rendering a list of `TaskItem` components. Follows **Single Responsibility** by delegating individual task rendering to `TaskItem`.

`src/components/TaskList.tsx`:
```typescript
import React from "react";
import { Task } from "../types/Task";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  toggleTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, toggleTask }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} toggleTask={toggleTask} />
      ))}
    </div>
  );
};

export default TaskList;
```

---

#### 3.2 **TaskItem Component**
Handles the rendering of a single task and its `toggle` functionality. Keeps UI logic isolated.

`src/components/TaskItem.tsx`:
```typescript
import React from "react";
import { Task } from "../types/Task";

interface TaskItemProps {
  task: Task;
  toggleTask: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, toggleTask }) => {
  return (
    <div className="flex items-center space-x-4">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
      />
      <span className={task.completed ? "line-through" : ""}>{task.title}</span>
    </div>
  );
};

export default TaskItem;
```

---

#### 3.3 **AddTaskForm Component**
Handles the logic for adding a new task. Keeps UI isolated.

`src/components/AddTaskForm.tsx`:
```typescript
import React, { useState } from "react";

interface AddTaskFormProps {
  addTask: (title: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ addTask }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title);
      setTitle(""); // Clear input after adding a task.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
```

---

### **Step 4: Use Components Together**

In `src/App.tsx`:

```typescript
import React from "react";
import { useTasks } from "./hooks/useTasks";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";

const App: React.FC = () => {
  const { tasks, addTask, toggleTask } = useTasks();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Task Manager</h1>
      <AddTaskForm addTask={addTask} />
      <TaskList tasks={tasks} toggleTask={toggleTask} />
    </div>
  );
};

export default App;
```

---

### **Step 5: Keep It Simple, Avoid YAGNI**

- No unnecessary features or complex animations to start with.
- No advanced state management (like Redux) unless required.
- Expand later if needed (e.g., filtering tasks by status).

---

### **Principles in Use**

1. **SOLID**: Each component/class is responsible for a single task.
2. **KISS**: Minimal code. Only the required features.
3. **DRY**: Utility functions (e.g., unique ID generation) are reused.
4. **YAGNI**: Skip filtering/analytics until necessary.

---

This simple **Task Management App** gives you a hands-on introduction to the principles while keeping the project minimal and focused. Let me know if you'd like further clarifications! 🚀