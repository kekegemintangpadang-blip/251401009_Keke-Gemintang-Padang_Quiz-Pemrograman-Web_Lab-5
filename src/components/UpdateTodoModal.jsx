import { useState, useEffect } from "react";

const modalThemes = {
  blue: {
    overlay: "bg-sky-950/30",
    card: "border-sky-200/90 shadow-sky-200/50",
    titleGradient: "from-slate-900 via-sky-800 to-indigo-800",
    label: "text-sky-800",
    input:
      "border-sky-200 bg-sky-50/50 focus:border-sky-400 focus:bg-white focus:ring-sky-400/20",
    submitBtn:
      "border-sky-300 bg-linear-to-r from-sky-200 to-indigo-200 text-sky-950 hover:from-sky-300 hover:to-indigo-300 hover:shadow-sky-300/60",
  },
  pink: {
    overlay: "bg-rose-950/30",
    card: "border-pink-200/90 shadow-pink-200/50",
    titleGradient: "from-slate-900 via-pink-800 to-rose-800",
    label: "text-pink-800",
    input:
      "border-pink-200 bg-pink-50/50 focus:border-pink-400 focus:bg-white focus:ring-pink-400/20",
    submitBtn:
      "border-pink-300 bg-linear-to-r from-pink-200 to-rose-200 text-pink-950 hover:from-pink-300 hover:to-rose-300 hover:shadow-pink-300/60",
  },
  lavender: {
    overlay: "bg-indigo-950/30",
    card: "border-purple-200/90 shadow-purple-200/50",
    titleGradient: "from-slate-900 via-purple-800 to-indigo-800",
    label: "text-indigo-800",
    input:
      "border-purple-200 bg-purple-50/50 focus:border-purple-400 focus:bg-white focus:ring-purple-400/20",
    submitBtn:
      "border-purple-300 bg-linear-to-r from-purple-200 to-indigo-200 text-purple-950 hover:from-purple-300 hover:to-indigo-300 hover:shadow-purple-300/60",
  },
};

export default function UpdateTodoModal({
  isOpen,
  onClose,
  todo,
  onUpdate,
  activeTheme,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("to-do");
  const [priority, setPriority] = useState("low");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setStatus(todo.status);
      setPriority(todo.priority);
      setDeadline(todo.deadline);
      setError("");
    }
  }, [todo, isOpen]);

  if (!isOpen || !todo) return null;

  const themeKey = activeTheme || localStorage.getItem("detail_theme") || "blue";
  const theme = modalThemes[themeKey] ?? modalThemes.blue;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle || !trimmedDescription) {
      setError("Judul dan deskripsi tidak boleh kosong atau hanya spasi.");
      return;
    }

    onUpdate({
      ...todo,
      title: trimmedTitle,
      description: trimmedDescription,
      status,
      priority,
      deadline,
    });
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xs transition-colors duration-300 ${theme.overlay}`}
    >
      <div
        className={`w-full max-w-md rounded-2xl border bg-white/95 p-6 shadow-xl transition-all duration-300 ${theme.card}`}
      >
        <h2
          className={`mb-5 bg-linear-to-r ${theme.titleGradient} bg-clip-text text-center text-xl font-extrabold text-transparent`}
        >
          Update Todo
        </h2>

        {error && (
          <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-medium text-rose-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`mb-1 block text-xs font-bold ${theme.label}`}>
              Judul
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError("");
              }}
              className={`w-full rounded-xl border px-3.5 py-2 text-sm text-slate-800 transition focus:ring-3 focus:outline-none ${theme.input}`}
            />
          </div>

          <div>
            <label className={`mb-1 block text-xs font-bold ${theme.label}`}>
              Deskripsi
            </label>
            <textarea
              rows="3"
              required
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (error) setError("");
              }}
              className={`w-full rounded-xl border px-3.5 py-2 text-sm text-slate-800 transition focus:ring-3 focus:outline-none ${theme.input}`}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`mb-1 block text-xs font-bold ${theme.label}`}>
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={`w-full rounded-xl border px-3 py-2 text-sm text-slate-800 transition focus:ring-3 focus:outline-none ${theme.input}`}
              >
                <option value="to-do">to-do</option>
                <option value="in progress">in progress</option>
                <option value="done">done</option>
              </select>
            </div>

            <div>
              <label className={`mb-1 block text-xs font-bold ${theme.label}`}>
                Prioritas
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className={`w-full rounded-xl border px-3 py-2 text-sm text-slate-800 transition focus:ring-3 focus:outline-none ${theme.input}`}
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>
          </div>

          <div>
            <label className={`mb-1 block text-xs font-bold ${theme.label}`}>
              Deadline
            </label>
            <input
              type="date"
              required
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className={`w-full rounded-xl border px-3.5 py-2 text-sm text-slate-800 transition focus:ring-3 focus:outline-none ${theme.input}`}
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl border border-rose-300 bg-rose-200/90 py-2.5 text-xs font-semibold text-rose-950 transition hover:-translate-y-0.5 hover:bg-rose-300 hover:shadow-md hover:shadow-rose-200/70"
            >
              Batal
            </button>
            <button
              type="submit"
              className={`cursor-pointer rounded-xl border py-2.5 text-xs font-semibold transition hover:-translate-y-0.5 hover:shadow-md ${theme.submitBtn}`}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}