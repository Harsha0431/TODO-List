

## **Capstone Project: Task Management App**
Develop the  application using **SOLID**, **KISS**, **DRY**, and **YAGNI** principles. The tech stack is **HTML**, **TypeScript**, and **CSS** (no frameworks/library).

---

## Capstone Project: **Task Management App**

---

### **Purpose**
This project assesses your ability to design and implement clean, maintainable, and scalable software following established engineering principles (**SOLID**, **KISS**, **DRY**, **YAGNI**).

---

### Folder Structrure
```
C:.
│   .gitignore
│   index.html
│   package-lock.json
│   package.json
│   README.md
│   tsconfig.json
│
├───dist
│   └───src
│       ├───constants
│       │       formData.d.ts
│       │       formData.d.ts.map
│       │       formData.js
│       │       formData.js.map
│       │       formInputPlaceholderMessage.d.ts
│       │       formInputPlaceholderMessage.d.ts.map
│       │       formInputPlaceholderMessage.js
│       │       formInputPlaceholderMessage.js.map
│       │
│       ├───core
│       │   ├───storage
│       │   │       local-storage.service.d.ts
│       │   │       local-storage.service.d.ts.map
│       │   │       local-storage.service.js
│       │   │       local-storage.service.js.map
│       │   │       storage.interface.d.ts
│       │   │       storage.interface.d.ts.map
│       │   │       storage.interface.js
│       │   │       storage.interface.js.map
│       │   │
│       │   └───types
│       │           response.type.d.ts
│       │           response.type.d.ts.map
│       │           response.type.js
│       │           response.type.js.map
│       │
│       ├───features
│       │   └───todo
│       │       ├───data
│       │       │       todo.repository.d.ts
│       │       │       todo.repository.d.ts.map
│       │       │       todo.repository.instance.d.ts
│       │       │       todo.repository.instance.d.ts.map
│       │       │       todo.repository.instance.js
│       │       │       todo.repository.instance.js.map
│       │       │       todo.repository.js
│       │       │       todo.repository.js.map
│       │       │
│       │       ├───model
│       │       │       todo.types.d.ts
│       │       │       todo.types.d.ts.map
│       │       │       todo.types.js
│       │       │       todo.types.js.map
│       │       │
│       │       └───service
│       │               todo.service.d.ts
│       │               todo.service.d.ts.map
│       │               todo.service.js
│       │               todo.service.js.map
│       │
│       ├───scripts
│       │       index.d.ts
│       │       index.d.ts.map
│       │       index.js
│       │       index.js.map
│       │
│       └───utils
│           │   debounce.d.ts
│           │   debounce.d.ts.map
│           │   debounce.js
│           │   debounce.js.map
│           │   formatDate.d.ts
│           │   formatDate.d.ts.map
│           │   formatDate.js
│           │   formatDate.js.map
│           │
│           └───todo
│                   filterAndSortTasks.d.ts
│                   filterAndSortTasks.d.ts.map
│                   filterAndSortTasks.js
│                   filterAndSortTasks.js.map
│                   generateId.d.ts
│                   generateId.d.ts.map
│                   generateId.js
│                   generateId.js.map
│
├───public
│   └───assets
│           logo-large.svg
│           logo.svg
│
└───src
    ├───constants
    │       formData.ts
    │
    ├───core
    │   ├───storage
    │   │       local-storage.service.ts
    │   │       storage.interface.ts
    │   │
    │   └───types
    │           response.type.ts
    │
    ├───features
    │   └───todo
    │       ├───data
    │       │       todo.repository.instance.ts
    │       │       todo.repository.ts
    │       │
    │       ├───model
    │       │       todo.types.ts
    │       │
    │       └───service
    │               todo.service.ts
    │
    ├───scripts
    │       index.ts
    │
    ├───styles
    │       index.css
    │
    └───utils
        │   debounce.ts
        │   formatDate.ts
        │
        └───todo
                filterAndSortTasks.ts
                generateId.ts
```