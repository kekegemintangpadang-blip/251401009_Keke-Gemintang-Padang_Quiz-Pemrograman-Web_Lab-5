import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Trash2 } from "lucide-react";
import AddTodoModal from "../components/AddTodoModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

const bgThemes = {
  blue: {
    label: "Baby Blue",
    bg: "linear-gradient(135deg, #d8f0ff 0%, #ebf6ff 50%, #dfe7ff 100%)",
    card: "border-sky-200/80 shadow-sky-200/45",
    titleGradient: "from-slate-900 via-sky-800 to-indigo-800",
    addBtn:
      "border-sky-300 bg-linear-to-r from-sky-200 to-indigo-200 text-sky-950 hover:from-sky-300 hover:to-indigo-300 hover:shadow-sky-300/60",
    tableBorder: "border-sky-200/80",
    thead:
      "border-sky-200/80 bg-linear-to-r from-sky-100/90 via-[#E8F5FF] to-indigo-100/80 text-sky-900",
    tbodyDivide: "divide-sky-100",
    rowHover: "hover:bg-sky-50/70",
    swatch: "bg-sky-400",
  },
  pink: {
    label: "Sakura Pink",
    bg: "linear-gradient(135deg, #ffd6e7 0%, #fff0f6 50%, #ffe0ec 100%)",
    card: "border-pink-200/80 shadow-pink-200/45",
    titleGradient: "from-slate-900 via-pink-800 to-rose-800",
    addBtn:
      "border-pink-300 bg-linear-to-r from-pink-200 to-rose-200 text-pink-950 hover:from-pink-300 hover:to-rose-300 hover:shadow-pink-300/60",
    tableBorder: "border-pink-200/80",
    thead:
      "border-pink-200/80 bg-linear-to-r from-pink-100/90 via-[#FFF0F6] to-rose-100/80 text-pink-900",
    tbodyDivide: "divide-pink-100",
    rowHover: "hover:bg-pink-50/70",
    swatch: "bg-pink-400",
  },
  lavender: {
    label: "Soft Lavender",
    bg: "linear-gradient(135deg, #e5d9ff 0%, #f5f0ff 50%, #e0e7ff 100%)",
    card: "border-purple-200/80 shadow-purple-200/45",
    titleGradient: "from-slate-900 via-purple-800 to-indigo-800",
    addBtn:
      "border-purple-300 bg-linear-to-r from-purple-200 to-indigo-200 text-purple-950 hover:from-purple-300 hover:to-indigo-300 hover:shadow-purple-300/60",
    tableBorder: "border-purple-200/80",
    thead:
      "border-purple-200/80 bg-linear-to-r from-purple-100/90 via-[#F4EEFF] to-indigo-100/80 text-purple-900",
    tbodyDivide: "divide-purple-100",
    rowHover: "hover:bg-purple-50/70",
    swatch: "bg-purple-400",
  },
};

const statusBadge = {
  "to-do": "border-slate-200 bg-slate-100/90 text-slate-700",
  "in progress": "border-sky-200 bg-sky-100/90 text-sky-800",
  done: "border-emerald-200 bg-emerald-100/90 text-emerald-800",
};

const priorityBadge = {
  low: "border-indigo-200 bg-indigo-100/80 text-indigo-800",
  medium: "border-amber-200 bg-amber-100/80 text-amber-800",
  high: "border-rose-200 bg-rose-100/80 text-rose-800",
};

export default function Home({ todos, onAdd, onDelete }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [activeTheme, setActiveTheme] = useState(
    () => localStorage.getItem("detail_theme") || "blue"
  );
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("detail_theme", activeTheme);
  }, [activeTheme]);

  const theme = bgThemes[activeTheme] ?? bgThemes.blue;

  return (
    <div
      style={{ backgroundImage: theme.bg }}
      className="min-h-screen px-4 py-10 transition-all duration-300 md:px-10"
    >
      <div className="mx-auto max-w-5xl">
        {/* Pilihan Tema Warna Latar (Tersinkron dengan TodoDetail) */}
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

        {/* Kartu Utama */}
        <div
          className={`rounded-2xl border bg-white/95 p-6 shadow-lg transition-all duration-300 md:p-8 ${theme.card}`}
        >
          {/* Header */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <h1
              className={`bg-linear-to-r ${theme.titleGradient} bg-clip-text text-2xl font-extrabold tracking-tight text-transparent md:text-3xl`}
            >
              Todo List
            </h1>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className={`cursor-pointer rounded-xl border px-4 py-2 text-xs font-semibold shadow-2xs transition hover:-translate-y-0.5 hover:shadow-md md:text-sm ${theme.addBtn}`}
            >
              Tambah Todo
            </button>
          </div>

          {/* Tabel Daftar Tugas */}
          <div
            className={`overflow-hidden rounded-xl border bg-white transition-colors duration-300 ${theme.tableBorder}`}
          >
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr
                    className={`border-b text-xs font-bold tracking-wide transition-colors duration-300 ${theme.thead}`}
                  >
                    <th className="py-3.5 pr-4 pl-5">Judul</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-4 py-3.5">Prioritas</th>
                    <th className="px-4 py-3.5">Deadline</th>
                    <th className="py-3.5 pr-5 pl-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody
                  className={`divide-y text-slate-700 ${theme.tbodyDivide}`}
                >
                  {todos.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="py-8 text-center text-sm text-slate-500"
                      >
                        Belum ada daftar tugas.
                      </td>
                    </tr>
                  ) : (
                    todos.map((todo) => (
                      <tr
                        key={todo.id}
                        className={`transition-colors duration-200 ${theme.rowHover}`}
                      >
                        <td className="max-w-[230px] truncate py-4 pr-4 pl-5 font-medium text-slate-800">
                          {todo.title}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-block rounded-full border px-3 py-0.5 text-xs font-semibold ${
                              statusBadge[todo.status] ??
                              "border-slate-200 bg-slate-100 text-slate-700"
                            }`}
                          >
                            {todo.status}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-block rounded-full border px-3 py-0.5 text-xs font-semibold ${
                              priorityBadge[todo.priority] ??
                              "border-slate-200 bg-slate-100 text-slate-700"
                            }`}
                          >
                            {todo.priority}
                          </span>
                        </td>
                        <td className="px-4 py-4 font-medium text-slate-700">
                          {todo.deadline}
                        </td>
                        <td className="py-4 pr-5 pl-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => navigate(`/todo/${todo.id}`)}
                              title="Lihat Detail"
                              className="cursor-pointer rounded-lg border border-sky-300 bg-sky-200/80 p-1.5 text-sky-900 transition hover:-translate-y-0.5 hover:bg-sky-300 hover:shadow-sm hover:shadow-sky-200"
                            >
                              <Eye size={15} />
                            </button>
                            <button
                              onClick={() => setTodoToDelete(todo)}
                              title="Hapus Tugas"
                              className="cursor-pointer rounded-lg border border-rose-300 bg-rose-200/80 p-1.5 text-rose-900 transition hover:-translate-y-0.5 hover:bg-rose-300 hover:shadow-sm hover:shadow-rose-200"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <AddTodoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={onAdd}
      />

      <DeleteConfirmModal
        isOpen={Boolean(todoToDelete)}
        onClose={() => setTodoToDelete(null)}
        todoTitle={todoToDelete?.title}
        onConfirm={() => {
          onDelete(todoToDelete.id);
          setTodoToDelete(null);
        }}
      />
    </div>
  );
}