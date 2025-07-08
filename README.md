

## **Capstone Project: Task Management App**
Develop the  application using **SOLID**, **KISS**, **DRY**, and **YAGNI** principles. The tech stack is **HTML**, **TypeScript**, and **CSS** (no frameworks/library).

---

## Capstone Project: **Task Management App**

---

### **Purpose**
This project assesses your ability to design and implement clean, maintainable, and scalable software following established engineering principles (**SOLID**, **KISS**, **DRY**, **YAGNI**).

---

### **Requirements**

Build a web-based **Task Management App** using only **HTML**, **TypeScript**, and **CSS** (no frameworks).  
Users should be able to:

1. **View a list of tasks**
2. **Add a new task**
3. **Mark a task as completed**
4. **(Optional, YAGNI consideration)** Filter tasks by status (all, completed, pending)

---

### **Functional Details**

#### **1. Task Structure**
Each task should have:
- An **ID** (unique)
- **Title** (string)
- **Completed** (boolean)

#### **2. Features to Implement**
- Show the current list of tasks (at least 5 dummy tasks initially)
- Form to add a new task (only requires a title)
- Ability to mark a task as completed (checkbox/button)
- _(Optional) Dropdown or buttons to filter the list by All, Completed, or Pending_

---

### **Technical Constraints**

- **No external libraries** (e.g. React, Bootstrap, jQuery, etc.)
- Use **TypeScript** for all logic and model code
- Use **HTML** and **CSS** for layout and styling (keep styling simple)
- All code should be modular and written with **SOLID**, **KISS**, **DRY**, and **YAGNI** in mind.

---

### **Principles to Demonstrate**

**1. SOLID**
  - SRP: Classes/functions should have only one responsibility.
  - OCP: Components should be easy to extend, not modify.
  - LSP: Replacements (if any) should not break logic.
  - ISP: If interfaces are used, keep them lean.
  - DIP: Rely on abstraction where possible.

**2. KISS** (“Keep It Simple, Stupid”)
  - Write clear, direct, and easy-to-understand logic.

**3. DRY** (“Don’t Repeat Yourself”)
  - Avoid copy-pasting code; extract reusable code to functions or classes.

**4. YAGNI** (“You Aren’t Gonna Need It”)
  - Build only what is described, not what *might* be needed in the future. Only implement filtering if you believe it adds user value.

---

### **Instructions**

**1. Set up your project:**
   - Create a new folder (e.g. `task-manager`)
   - Create required files:  
     - `index.html`
     - `style.css`
     - `app.ts` (TypeScript)
   - Include your compiled JS in `index.html`.

**2. Implement the UI:**
   - Show a list of tasks with their titles and statuses.
   - Add a form for entering new task titles.

**3. Implement interactions:**
   - Adding a new task updates the task list view.
   - Marking a task as completed updates its state and view.

**4. Code Quality:**
   - Use clear interfaces/types for data models.
   - Organize code into logical classes/modules (e.g. Task, TaskManager, UI).
   - Each class/module should have a single, clear responsibility.
   - Avoid unnecessary abstraction (YAGNI).
   - Reuse code where appropriate (DRY).
   - Keep logic simple and clear (KISS).

**5. (Optional) Filtering:**
   - Allow filtering tasks by status **only if you feel it improves usability**. Implement this in a way that is easy to extend.

---

### **Deliverables**

1. `index.html`
2. `style.css`
3. `app.ts` (and compiled `app.js`)
4. A **README.md** (briefly explain your design choices related to SOLID, KISS, DRY, YAGNI.)

---

### **Bonus**
- Use simple comments to point out where you’ve applied SOLID/DRY/KISS/YAGNI in your code.

---

## **Evaluation Criteria**
- **Correctness:** Does the app meet the functional requirements?
- **Code Quality:** Is the code clean, modular, and maintainable according to SOLID/KISS/DRY/YAGNI?
- **Simplicity:** Is the solution as straightforward as possible?
- **Reusability:** Is repeated logic extracted (DRY)?
- **Overengineering:** Is unnecessary complexity or abstraction avoided (YAGNI)?

---

## **Final Note**
You are being evaluated as much for **how** you solve the problem as for **what** you build.  
**Keep code readable, tested, practical, and well-structured.**  
Good luck!

---
