import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UpdateTodoModal from "../components/UpdateTodoModal";

const bgThemes = {
  blue: {
    label: "Baby Blue",
    bg: "linear-gradient(135deg, #d8f0ff 0%, #ebf6ff 50%, #dfe7ff 100%)",
    card: "border-sky-200/80 shadow-sky-200/45",
    descBox: "border-sky-200/80 bg-sky-50/50",
    heading: "text-sky-800",
    titleGradient: "from-slate-900 via-sky-800 to-indigo-800",
    swatch: "bg-sky-400",
  },
  pink: {
    label: "Sakura Pink",
    bg: "linear-gradient(135deg, #ffd6e7 0%, #fff0f6 50%, #ffe0ec 100%)",
    card: "border-pink-200/80 shadow-pink-200/45",
    descBox: "border-pink-200/80 bg-pink-50/50",
    heading: "text-pink-800",
    titleGradient: "from-slate-900 via-pink-800 to-rose-800",
    swatch: "bg-pink-400",
  },
  lavender: {
    label: "Soft Lavender",
    bg: "linear-gradient(135deg, #e5d9ff 0%, #f5f0ff 50%, #e0e7ff 100%)",
    card: "border-purple-200/80 shadow-purple-200/45",
    descBox: "border-purple-200/80 bg-purple-50/50",
    heading: "text-indigo-800",
    titleGradient: "from-slate-900 via-purple-800 to-indigo-800",
    swatch: "bg-purple-400",
  },
};

const statusColor = {
  "to-do": "text-slate-600 hover:text-slate-900",
  "in progress": "text-sky-700 hover:text-sky-900",
  done: "text-emerald-700 hover:text-emerald-900",
};

const priorityColor = {
  low: "text-indigo-700",
  medium: "text-amber-700",
  high: "text-rose-700",
};

const nextStatusMap = {
  "to-do": "in progress",
  "in progress": "done",
  done: "to-do",
};

export default function TodoDetail({ todos, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState(
    () => localStorage.getItem("detail_theme") || "blue"
  );

  useEffect(() => {
    localStorage.setItem("detail_theme", activeTheme);
  }, [activeTheme]);

  const todo = todos.find((item) => String(item.id) === String(id));
  const theme = bgThemes[activeTheme] ?? bgThemes.blue;

  if (!todo) {
    return (
      <div
        style={{ backgroundImage: theme.bg }}
        className="flex min-h-screen flex-col items-center justify-center gap-4 p-4"
      >
        <p className="text-sm font-medium text-slate-600">
          Tugas tidak ditemukan.
        </p>
        <button
          onClick={() => navigate("/")}
          className="cursor-pointer rounded-lg border border-sky-300 bg-linear-to-r from-sky-200 to-indigo-200 px-4 py-2 text-sm font-semibold text-sky-950 transition hover:-translate-y-0.5 hover:from-sky-300 hover:to-indigo-300 hover:shadow-md hover:shadow-sky-200/70"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  const handleCycleStatus = () => {
    const nextStatus = nextStatusMap[todo.status] ?? "to-do";
    onUpdate({
      ...todo,
      status: nextStatus,
    });
  };

  return (
    <div
      style={{ backgroundImage: theme.bg }}
      className="flex min-h-screen flex-col items-center justify-center p-4 transition-all duration-300"
    >
      <div className="w-full max-w-xl">
        {/* Pilihan Tema Warna Latar */}
        <div className="mb-2.5 flex items-center justify-end gap-2 px-1">
          {Object.entries(bgThemes).map(([key, item]) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTheme(key)}
              title={`Ganti ke tema ${item.label}`}
              aria-label={`Ganti ke tema ${item.label}`}
              className={`h-4 w-4 cursor-pointer rounded-full border-2 border-white shadow-sm transition-transform ${item.swatch} ${
                activeTheme === key
                  ? "scale-120 ring-2 ring-slate-500/50"
                  : "opacity-75 hover:scale-110 hover:opacity-100"
              }`}
            />
          ))}
        </div>

        {/* Kartu Detail Tugas */}
        <div
          className={`grid w-full grid-cols-1 gap-6 rounded-xl border bg-white/95 p-6 shadow-lg transition-all duration-300 md:grid-cols-3 ${theme.card}`}
        >
          <div className="space-y-4 md:col-span-2">
            <div>
              <h3 className={`text-sm font-bold ${theme.heading}`}>Judul</h3>
              <p
                className={`mt-1 bg-linear-to-r ${theme.titleGradient} bg-clip-text text-sm font-bold text-transparent`}
              >
                {todo.title}
              </p>
            </div>

            <div>
              <h3 className={`text-sm font-bold ${theme.heading}`}>
                Deskripsi
              </h3>
              <div
                className={`mt-1 min-h-[100px] rounded-lg border p-3 text-sm whitespace-pre-wrap break-words text-slate-700 transition-colors duration-300 ${theme.descBox}`}
              >
                {todo.description}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div>
                <h3 className={`text-sm font-bold ${theme.heading}`}>Status</h3>
                <button
                  type="button"
                  onClick={handleCycleStatus}
                  title="Klik untuk mengubah status"
                  className={`cursor-pointer text-left text-sm font-semibold underline-offset-4 transition hover:underline ${
                    statusColor[todo.status] ?? "text-slate-700"
                  }`}
                >
                  {todo.status}
                </button>
              </div>

              <div>
                <h3 className={`text-sm font-bold ${theme.heading}`}>
                  Prioritas
                </h3>
                <p
                  className={`text-sm font-semibold ${
                    priorityColor[todo.priority] ?? "text-slate-700"
                  }`}
                >
                  {todo.priority}
                </p>
              </div>

              <div>
                <h3 className={`text-sm font-bold ${theme.heading}`}>
                  Deadline
                </h3>
                <p className="text-sm font-medium text-slate-700">
                  {todo.deadline}
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => navigate("/")}
                className="flex-1 cursor-pointer rounded-lg border border-rose-300 bg-rose-200/90 py-2 text-xs font-semibold text-rose-950 transition hover:-translate-y-0.5 hover:bg-rose-300 hover:shadow-md hover:shadow-rose-200/70"
              >
                Kembali
              </button>
              <button
                onClick={() => setIsUpdateModalOpen(true)}
                className="flex-1 cursor-pointer rounded-lg border border-sky-300 bg-linear-to-r from-sky-200 to-indigo-200 py-2 text-xs font-semibold text-sky-950 transition hover:-translate-y-0.5 hover:from-sky-300 hover:to-indigo-300 hover:shadow-md hover:shadow-sky-300/70"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      <UpdateTodoModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        todo={todo}
        onUpdate={onUpdate}
      />
    </div>
  );
}