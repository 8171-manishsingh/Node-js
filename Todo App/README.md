# Todo App

A simple, production-ready Todo application demonstrating a React + Redux Toolkit frontend with a Node.js/Express backend API. The project includes CRUD operations for todos, modal detail views, theme support, and persistent storage via the backend and localStorage.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Folder Structure](#folder-structure)
- [State Management](#state-management)
- [Development Notes](#development-notes)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License & Author](#license--author)

## Features
- Add, edit, and delete todos
- Toggle todo completion status
- View todo details in a modal
- Persist todos via backend API and localStorage
- Light / dark theme toggle
- Responsive layout and keyboard-friendly interactions

## Tech Stack
- Frontend: React, Vite, Redux Toolkit, Tailwind CSS (or equivalent styling)
- Backend: Node.js, Express (simple REST API)
- Dev tools: Vite (frontend dev server), npm

## Architecture

- Frontend communicates with the backend REST API for persistent storage.
- Local state uses Redux Toolkit for todos and a small Context for UI concerns (theme, modal visibility).

## Getting Started

Prerequisites:
- Node.js >= 14
- npm (or yarn)

Clone the repository:

```powershell
git clone <your-repo-url>
cd "Todo App"
```

Install dependencies and run the backend and frontend separately.

Backend (from the `Backend` folder):

```powershell
cd Backend
npm install
# start backend (example)
npm run server || node server.js
```

Frontend (from the `Frontend` folder):

```powershell
cd ..\Frontend
npm install
npm run dev
```

Open the app in your browser at the address Vite prints (typically `http://localhost:5173`).

## API Reference

Base path: `/api/todos`

- GET `/api/todos` — Return list of todos
- POST `/api/todos` — Create a todo
  - Body: `{ "title": "Buy milk", "completed": false }`
- PATCH `/api/todos/:id` — Update a todo (title or other fields)
  - Body: `{ "title": "Updated title" }`
- PATCH `/api/todos/:id/status` — Toggle completion status
- DELETE `/api/todos/:id` — Delete a todo

Note: Adjust the paths/ports if your backend server runs on a different host/port; update the frontend `fetch`/`axios` base URL accordingly.

## Folder Structure (summary)

`Backend/` — Express API and server code

`Frontend/` — Vite + React app
- `src/components/` — Reusable UI components (`Todo.jsx`, `Modal.jsx`)
- `src/contexts/` — Small UI contexts (`AppContext.jsx`)
- `src/features/` — Redux slices (e.g., `todo.js`)

## State Management

- Todos: managed by Redux Toolkit slice (`features/todo.js`). Actions include `addTodo`, `updateTodo`, `deleteTodo`, `changeStatus`, and `setTodos` (initial fetch).
- UI: theme and modal visibility are managed with React Context in `contexts/AppContext.jsx`.

## Development Notes

- Keyboard: pressing Enter in the new-todo input creates a todo.
- Modal displays full todo details when the eye icon is clicked.
- LocalStorage is used as a fallback cache; the canonical source of truth is the backend API.

## Future Improvements

- Authentication (JWT) and per-user todo lists
- Due dates, tags, and filtering/search
- Drag-and-drop ordering
- End-to-end tests and CI integration

## Contributing

Contributions are welcome. Please open an issue or submit a pull request with a clear description of the change.

## License & Author

This project is provided as-is for learning and demonstration purposes. For questions or help, open an issue or contact the author.
