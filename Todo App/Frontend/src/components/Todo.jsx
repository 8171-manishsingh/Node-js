import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import Modal from "./Modal";

const API_URL = "http://localhost:3000/api/todos";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [modalInfo, setModalInfo] = useState(null);

  const { light, toggleTheme, view, toggleView } = useContext(AppContext);

  useEffect(() => {
    const saved = localStorage.getItem("my-todos");
    if (saved) setTodos(JSON.parse(saved));

    fetch(API_URL)
      ?.then((res) => res.json())
      .then((data) => {
        setTodos(data);
        localStorage.setItem("my-todos", JSON.stringify(data));
      })
      .catch(() => console.log("Using local data"));
  }, []);

  useEffect(() => {
    localStorage.setItem("my-todos", JSON.stringify(todos));
  }, [todos]);

  // Add Todo
  const handleAdd = async () => {
    if (!title.trim()) return;
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim() }),
      });
      if (res.ok) {
        const newTodo = await res.json();
        setTodos((prev) => [...prev, newTodo]);
      }
    } catch {
      const temp = { id: Date.now(), title: title.trim(), status: false };
      setTodos((prev) => [...prev, temp]);
    }
    setTitle("");
  };

  const handleUpdate = async (id, newTitle) => {
    if (!newTitle.trim()) return;
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
      });
    } catch { }
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, title: newTitle } : t)));
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    } catch { }
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggleStatus = async (id) => {
    try {
      await fetch(`${API_URL}/${id}/status`, { method: "PATCH" });
    } catch { }
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: !t.status } : t))
    );
  };

  useEffect(() => {
    const handler = (e) => e.key === "Enter" && title.trim() && handleAdd();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [title]);

  return (
    <section
      className={`w-80 sm:w-96 md:w-[28rem] lg:w-[32rem] rounded-2xl ${light ? "bg-white" : "bg-gray-900"
        } min-h-[600px] p-6 transition-all duration-300 mx-auto mt-10 border ${light ? "border-gray-300" : "border-gray-700"
        }`}
    >
      {/* Title & Theme Toggle */}
      <section className="flex items-center justify-between mb-4">
        <p className={`font-bold text-4xl ${light ? "text-gray-800" : "text-white"}`}>
          Todo App
        </p>
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-12 ${light ? "bg-yellow-500 text-white" : "bg-indigo-600 text-white"
            }`}
        >
          {light ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 7a5 5 0 100 10 5 5 0 000-10z" />
              <path d="M12 2v2m0 16v2m8-10h2M4 12H2m15.364-7.364l1.414 1.414M5.222 18.778l1.414 1.414M18.778 18.778l1.414-1.414M5.222 5.222L6.636 6.636" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </section>

      <hr className={`opacity-30 mb-6 ${light ? "border-gray-300" : "border-gray-700"}`} />

      {/* Input */}
      <section className="flex items-center gap-4 mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add your new task..."
          className={`flex-1 px-4 py-3 rounded-lg border outline-none transition-all ${light
            ? "bg-gray-100 border-gray-300 focus:border-blue-500"
            : "bg-gray-800 border-gray-600 text-white focus:border-indigo-500"
            }`}
        />
        <button
          onClick={handleAdd}
          className={`p-4 rounded-full transition-all hover:scale-110 ${light ? "bg-blue-500 text-white" : "bg-indigo-600 text-white"
            }`}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 14h-2v-4H5v-2h4V6h2v4h4v2h-4v4z" />
          </svg>
        </button>
      </section>

      {/* List */}
      {todos.length === 0 ? (
        <p className="text-center text-gray-500 mt-10 font-medium">No task available!</p>
      ) : (
        <section className="max-h-[580px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 pr-2">
          <ul className="space-y-3">
            {[...todos]
              .sort((a, b) => a.status - b.status)
              .map((todo) => (
                <li
                  key={todo.id}
                  className={`p-4 rounded-xl flex items-center gap-4 transition-all ${light ? "bg-gray-50" : "bg-gray-800"
                    } ${todo.status ? "opacity-70" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={todo.status}
                    onChange={() => handleToggleStatus(todo.id)}
                    className={`w-6 h-6 rounded-full border-2 cursor-pointer transition-all ${light
                      ? "border-blue-500 checked:bg-blue-500"
                      : "border-indigo-500 checked:bg-indigo-500"
                      }`}
                  />

                  <div className="flex-1">
                    {editingId === todo.id ? (
                      <input
                        autoFocus
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className={`w-full px-3 py-2 rounded border ${light ? "bg-white border-blue-400" : "bg-gray-700 border-indigo-400 text-white"
                          } outline-none`}
                        onKeyDown={(e) => e.key === "Enter" && editTitle.trim() && handleUpdate(todo.id, editTitle)}
                      />
                    ) : (
                      <p className={`text-lg ${todo.status ? "line-through text-gray-500" : light ? "text-gray-800" : "text-white"}`}>
                        {todo.title}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => { setModalInfo(todo); toggleView(); }}
                      className="p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition"
                      title="View"
                    >
                      View
                    </button>

                    <button
                      onClick={() => {
                        if (editingId === todo.id) {
                          if (editTitle.trim()) handleUpdate(todo.id, editTitle);
                          setEditingId(null);
                        } else {
                          setEditingId(todo.id);
                          setEditTitle(todo.title);
                        }
                      }}
                      className={`p-2 rounded-lg text-white transition ${editingId === todo.id ? "bg-green-500 hover:bg-green-600" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                      {editingId === todo.id ? "Save" : "Edit"}
                    </button>

                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </section>
      )}

      {/* Modal */}
      <section className={`fixed inset-0 z-50 flex items-center justify-center ${view ? "visible" : 'invisible'}`}>
        {view && modalInfo && (
          <div className="fixed inset-0 bg-black bg-opacity-60" onClick={toggleView}></div>
        )}
        {view && modalInfo && (
          <div className="relative z-10">
            <Modal todo={modalInfo} />
          </div>
        )}
      </section>
    </section>
  );
};

export default Todo;