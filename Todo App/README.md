📝 Todo App (React + Redux + Node.js API)
A simple and clean Todo application built using React, Redux Toolkit, and a Node.js/Express backend.
This app supports adding, editing, deleting, viewing, and toggling the status of todos, with persistent storage via an API and localStorage.

🚀 Features
✅ Core Features


Add new todos


Edit existing todos


Delete todos


Mark todos as complete/incomplete


View todo details in a modal


Auto-save todos to localStorage


Auto-fetch todos from backend API on load


🎨 UI/UX Features


Light & dark theme toggle


Smooth animations & transitions


Clean list sorting (incomplete → complete)


Responsive layout


Keyboard shortcut: Enter adds a todo



🏗 Tech Stack
Frontend


React


Redux Toolkit


TailwindCSS


React Context API (theme + modal view state)


Backend (Assumed)


Node.js


Express


REST API endpoints:


GET /api/todos


POST /api/todos


PATCH /api/todos/:id


PATCH /api/todos/:id/status


DELETE /api/todos/:id





📦 Installation & Setup
1️⃣ Clone the project
git clone <your-repo-url>
cd your-project-folder

2️⃣ Install dependencies
npm install

3️⃣ Start backend (if using your own Node.js server)
Example:
npm run server

4️⃣ Start frontend
npm run dev


🌐 API Endpoints Used
MethodEndpointDescriptionGET/api/todosFetch all todosPOST/api/todosAdd new todoPATCH/api/todos/:idUpdate todo titlePATCH/api/todos/:id/statusToggle completionDELETE/api/todos/:idRemove a todo

📁 Folder Structure (Frontend)
src/
│
├─ components/
│   ├─ Todo.jsx
│   └─ Modal.jsx
│
├─ contexts/
│   └─ AppContext.jsx
│
├─ features/
│   └─ todo.js     // Redux slice
│
└─ App.jsx


🧠 How State Works
Redux State (Todos)


All todos are stored in the Redux store.


Synced with backend CRUD operations.


Mutations:


addTodo


updateTodo


deleteTodo


changeStatus


setTodos (initial fetch)




Context State
Context ValuePurposelightLight/Dark themetoggleThemeSwitch themeviewModal visibilitytoggleViewShow/hide modal

🖼 Modal View
When clicking the eye (👁) icon on any todo:


The modal opens


Shows full todo information


Context-driven modal state



🎯 Future Improvements


Add authentication (JWT)


Add due dates & categories


Search + filtering


Drag-and-drop todo ordering


Better responsive layout



❤️ Author
Made with care using React, Redux, and modern frontend patterns.

If you'd like, I can also:
✅ Generate a backend README
✅ Create API documentation
✅ Create a prettier GitHub-style README
✅ Add screenshots or GIFs
Just tell me!
img src="<img width="1895" height="886" alt="image" src="https://github.com/user-attachments/assets/4d048430-8d6e-47fe-9400-c111c0646f31" />
"
