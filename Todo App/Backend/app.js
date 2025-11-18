import express from "express";
import cors from "cors";

export const app = express();

app.use(express.json());
app.use(cors());

let todos = [];

// GET all todos
app.get("/api/todos", (req, res) => res.json(todos));

// POST add new todo
app.post("/api/todos", (req, res) => {
    const { title } = req.body;

    if (!title?.trim()) {
        return res.status(400).json({ message: "Title is required" });
    }

    const newTodo = {
        id: Date.now(),
        title: title.trim(),
        status: false,
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PATCH update title
app.patch("/api/todos/:id", (req, res) => {
    const id = Number(req.params.id);
    const { title } = req.body;

    const todo = todos.find(t => t.id === id);

    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }

    todo.title = title ?? todo.title;
    res.json(todo);
});

// PATCH toggle status
app.patch("/api/todos/:id/status", (req, res) => {
    const id = Number(req.params.id);

    const todo = todos.find(t => t.id === id);

    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }

    todo.status = !todo.status;
    res.json(todo);
});

// DELETE todo
app.delete("/api/todos/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = todos.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Todo not found" });
    }

    todos.splice(index, 1);
    res.json({ success: true });
});
