import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  changeStatus,
  deleteTodo,
  updateTodo,
  setTodos,
} from "../features/todo";
import Modal from "./Modal";

const API_URL = "http://localhost:3000/api/todos";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [modalInfo, setModalInfo] = useState(null);

  const { light, toggleTheme, view, toggleView } = useContext(AppContext);

  const todos = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  /** Persist Redux Todos */
  useEffect(() => {
    localStorage.setItem("redux-todo", JSON.stringify(todos));
  }, [todos]);

  /** Add Todo */
  const handleAdd = useCallback(async () => {
    if (!title.trim()) return;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!res.ok) return console.error("Failed to add todo");

      const newTodo = await res.json();
      dispatch(addTodo(newTodo));

      setTitle("");
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  }, [title, dispatch]);

  /** Update Todo */
  const handleUpdate = async (id, newTitle) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
      });

      if (!res.ok) return console.error("Failed to update todo");

      const updatedTodo = await res.json();
      dispatch(updateTodo({ id, title: updatedTodo.title }));
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  /** Delete Todo */
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

      if (!res.ok) return console.error("Failed to delete todo");

      dispatch(deleteTodo(id));
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  /** Toggle Status */
  const handleToggleStatus = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}/status`, {
        method: "PATCH",
      });

      if (!res.ok) return console.error("Failed to toggle status");

      dispatch(changeStatus(id));
    } catch (err) {
      console.error("Error toggling status:", err);
    }
  };

  /** Fetch Todos on Mount */
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        dispatch(setTodos(data));
      } catch (err) {
        console.error("Failed to fetch todos:", err);
      }
    };

    fetchTodos();
  }, [dispatch]);

  /** Add on Enter */
  useEffect(() => {
    const onEnter = (e) => {
      if (e.key === "Enter" && title.trim()) handleAdd();
    };

    document.addEventListener("keydown", onEnter);
    return () => document.removeEventListener("keydown", onEnter);
  }, [title, handleAdd]);

  /** UI Container Classes */
  const containerClass = light
    ? "bg-amber-200 shadow-white shadow-sm"
    : "bg-blue-200 shadow-lg";

  return (
    <section
      className={`w-80 sm:w-sm md:w-md lg:w-lg h-150 md:h-200 p-5 rounded-xl transition-all bg-red-400 ${containerClass}`}
    >
      {/* Header */}
      <section className="flex items-center justify-between">
        <p
          className={`font-bold text-4xl ${light ? "text-neutral-600" : "text-black"
            }`}
        >
          Todo
        </p>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-all hover:-rotate-12 hover:scale-110 ${light ? "bg-amber-500 shadow-lg" : "bg-white shadow-lg"
            }`}
          title={light ? "Light Mode" : "Dark Mode"}
        >
          {light ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>

          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>

          )}
        </button>
      </section>

      <hr className="opacity-30 mt-3" />

      {/* Input */}
      <section className="flex items-center gap-5">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Write your todo here"
          className={`border border-neutral-500 p-2 mt-5 rounded-md flex-1 text-sm outline-none ${light ? "focus:ring-amber-400" : "focus:ring-blue-400"
            }`}
        />

        {/* Add Button */}
        <button
          onClick={handleAdd}
          className={`h-12 w-12 rounded-full mt-5 flex items-center justify-center transition-all ${light
            ? "bg-amber-500 hover:bg-amber-700 text-neutral-700"
            : "bg-white hover:bg-neutral-600 hover:text-white"
            }`}
          title="Add Todo"
        >
          Add
        </button>
      </section>

      {/* Todo List */}
      {todos.length === 0 ? (
        <p className="mt-5 text-center text-neutral-500 text-sm select-none">
          No task available!
        </p>
      ) : (
        <section className="mt-4 max-h-[580px] overflow-y-auto pr-1 scrollbar-thin">
          <ul className="space-y-4">
            {[...todos]
              .sort((a, b) => a.status - b.status)
              .map((todo) => {
                const isEditing = editingId === todo.id;

                return (
                  <li
                    key={todo.id}
                    className={`p-4 flex items-center gap-5 rounded-md transition-all ${light
                      ? "bg-neutral-600 text-white"
                      : "bg-white shadow-md"
                      } ${todo.status ? "opacity-70" : ""} ${isEditing ? "pointer-events-none" : ""
                      }`}
                  >
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={todo.status}
                      onChange={() => handleToggleStatus(todo.id)}
                      className={`w-5 h-5 border-2 rounded-full cursor-pointer appearance-none transition-all ${light
                        ? "checked:bg-amber-500 checked:border-amber-500"
                        : "checked:bg-blue-500 checked:border-blue-500"
                        }`}
                    />

                    {/* Text or Input */}
                    <div className="flex-1">
                      {isEditing ? (
                        <input
                          autoFocus
                          value={editTitle}
                          placeholder="Type and click tick to save"
                          onChange={(e) => setEditTitle(e.target.value)}
                          className={`border px-2 py-1 rounded w-full ${light ? "text-white" : "text-black"
                            }`}
                        />
                      ) : (
                        <p
                          className={`truncate ${todo.status ? "line-through text-gray-400" : ""
                            }`}
                        >
                          {todo.title}
                        </p>
                      )}
                    </div>

                    {/* Buttons */}
                    <section className="flex items-center gap-2">

                      {/* View */}
                      <button
                        onClick={() => {
                          setModalInfo(todo);
                          toggleView();
                        }}
                        className="h-8 w-8 bg-amber-500 rounded-full flex items-center justify-center hover:bg-amber-600"
                      >
                        👁
                      </button>

                      {/* Edit / Save */}
                      <button
                        onClick={() => {
                          if (isEditing) {
                            if (editTitle.trim()) {
                              handleUpdate(todo.id, editTitle);
                            }
                            setEditingId(null);
                          } else {
                            setEditingId(todo.id);
                            setEditTitle(todo.title);
                          }
                        }}
                        className="h-8 w-8 bg-emerald-500 rounded-full hover:bg-emerald-600"
                      >
                        {isEditing ? "✓" : "✎"}
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(todo.id)}
                        className="h-8 w-8 bg-red-500 rounded-full hover:bg-red-600"
                      >
                        🗑
                      </button>
                    </section>
                  </li>
                );
              })}
          </ul>
        </section>
      )}

      {/* Modal */}
      {view && (
        <section className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
          <Modal todo={modalInfo} />
        </section>
      )}
    </section>
  );
};

export default Todo;
