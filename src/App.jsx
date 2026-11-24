import { useState, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initialTodos } from "./data/dummyTodos";
import Home from "./pages/Home";
import TodoDetail from "./pages/TodoDetail";

const STORAGE_KEY = "todos_data";

const toastStyle = {
  success: "border-emerald-300 bg-emerald-100 text-emerald-950",
  info: "border-sky-300 bg-sky-100 text-sky-950",
  danger: "border-rose-300 bg-rose-100 text-rose-950",
};

export default function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialTodos;
    } catch {
      return initialTodos;
    }
  });
  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] = useState("success");
  const timeoutRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      // Abaikan jika penyimpanan browser penuh atau dibatasi
    }
  }, [todos]);

  const showFeedback = (message, type = "success") => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setNotification(message);
    setNotificationType(type);
    timeoutRef.current = setTimeout(() => {
      setNotification("");
      timeoutRef.current = null;
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleAddTodo = (newTodo) => {
    const todoWithId = {
      ...newTodo,
      id: Date.now(),
    };
    setTodos((prev) => [...prev, todoWithId]);
    showFeedback("Tugas berhasil ditambahkan!", "success");
  };

  const handleUpdateTodo = (updatedTodo) => {
    setTodos((prev) =>
      prev.map((todo) =>
        String(todo.id) === String(updatedTodo.id) ? updatedTodo : todo
      )
    );
    showFeedback("Tugas berhasil diperbarui!", "info");
  };

  const handleDeleteTodo = (id) => {
    setTodos((prev) =>
      prev.filter((todo) => String(todo.id) !== String(id))
    );
    showFeedback("Tugas berhasil dihapus!", "danger");
  };

  return (
    <BrowserRouter>
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 rounded-xl border px-4 py-2.5 text-sm font-semibold shadow-md ${
            toastStyle[notificationType] ?? toastStyle.success
          }`}
        >
          {notification}
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Home
              todos={todos}
              onAdd={handleAddTodo}
              onDelete={handleDeleteTodo}
            />
          }
        />
        <Route
          path="/todo/:id"
          element={<TodoDetail todos={todos} onUpdate={handleUpdateTodo} />}
        />
      </Routes>
    </BrowserRouter>
  );
}