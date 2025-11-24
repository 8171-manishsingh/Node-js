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
- [Contributing](#contributing)

## Screenshots & Demo

### Light Mode
<img width="900" height="700" alt="Screenshot 2025-11-23 211950" src="https://github.com/user-attachments/assets/141029a2-8586-4828-afc4-7d31fb0295b3" />

### Dark Mode
<img width="900" height="700" alt="Screenshot 2025-11-23 211932" src="https://github.com/user-attachments/assets/63169fe1-6525-44d0-8037-cac9cfff7aa5" />

### Demo video 
Watch (https://drive.google.com/file/d/1jTZkSS6H2fMK820kDIpo7Y0I96k7ARct/view?usp=sharing)


## Features
- Add, edit, and delete todos
- Toggle todo completion status
- View todo details in a modal
- Persist todos via backend API and localStorage
- Light / dark theme toggle
- Responsive layout and keyboard-friendly interactions

## Tech Stack
- Frontend: React, Vite, Redux Toolkit, Tailwind CSS
- Backend: Node.js, Express (simple REST API)
- Dev tools: Vite (frontend dev server), npm

## Architecture
- Frontend communicates with the backend REST API for persistent storage.
- Local state uses Redux Toolkit for todos and React Context for UI concerns (theme, modal visibility).

## Getting Started
Prerequisites:
- Node.js >= 14
- npm (or yarn)

Clone the repository:
```bash
git clone <your-repo-url>
cd "Todo App"
```

Install dependencies and run the backend and frontend separately.

Backend (from the `Backend` folder):
```bash
cd Backend
npm install
npm run server || node server.js
```

Frontend (from the `Frontend` folder):
```bash
cd Frontend
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

## Folder Structure
```
Backend/          # Express API and server code
Frontend/         # Vite + React app
├── src/
│   ├── components/  # Reusable UI components (Todo.jsx, Modal.jsx)
│   ├── contexts/    # UI contexts (AppContext.jsx)
│   └── features/    # Redux slices (todo.js)
```

## State Management
- Todos: Managed by Redux Toolkit slice (`features/todo.js`). Actions include `addTodo`, `updateTodo`, `deleteTodo`, `changeStatus`, and `setTodos` (initial fetch).
- UI: Theme and modal visibility are managed with React Context in `contexts/AppContext.jsx`.

## Development Notes
- Keyboard: Pressing Enter in the new-todo input creates a todo.
- Modal displays full todo details when the eye icon is clicked.
- LocalStorage is used as a fallback cache; the canonical source of truth is the backend API.

## Contributing
Contributions are welcome. Please open an issue or submit a pull request with a clear description of the change.
