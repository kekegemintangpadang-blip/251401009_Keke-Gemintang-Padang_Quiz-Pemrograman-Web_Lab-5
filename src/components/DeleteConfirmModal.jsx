const modalThemes = {
  blue: {
    overlay: "bg-sky-950/30",
    card: "border-sky-200/90 shadow-sky-200/50",
    titleGradient: "from-slate-900 via-sky-800 to-indigo-800",
    cancelBtn:
      "border-sky-300 bg-linear-to-r from-sky-200 to-indigo-200 text-sky-950 hover:from-sky-300 hover:to-indigo-300 hover:shadow-sky-300/60",
  },
  pink: {
    overlay: "bg-rose-950/30",
    card: "border-pink-200/90 shadow-pink-200/50",
    titleGradient: "from-slate-900 via-pink-800 to-rose-800",
    cancelBtn:
      "border-pink-300 bg-linear-to-r from-pink-200 to-rose-200 text-pink-950 hover:from-pink-300 hover:to-rose-300 hover:shadow-pink-300/60",
  },
  lavender: {
    overlay: "bg-indigo-950/30",
    card: "border-purple-200/90 shadow-purple-200/50",
    titleGradient: "from-slate-900 via-purple-800 to-indigo-800",
    cancelBtn:
      "border-purple-300 bg-linear-to-r from-purple-200 to-indigo-200 text-purple-950 hover:from-purple-300 hover:to-indigo-300 hover:shadow-purple-300/60",
  },
};

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  todoTitle,
  activeTheme,
}) {
  if (!isOpen) return null;

  const themeKey = activeTheme || localStorage.getItem("detail_theme") || "blue";
  const theme = modalThemes[themeKey] ?? modalThemes.blue;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xs transition-colors duration-300 ${theme.overlay}`}
    >
      <div
        className={`w-full max-w-sm rounded-2xl border bg-white/95 p-6 shadow-xl transition-all duration-300 ${theme.card}`}
      >
        <h3
          className={`bg-linear-to-r ${theme.titleGradient} bg-clip-text text-center text-lg font-extrabold text-transparent`}
        >
          Konfirmasi Hapus
        </h3>
        <p className="mt-2 text-center text-sm leading-relaxed text-slate-600">
          Apakah Anda yakin ingin menghapus tugas{" "}
          <span className="font-bold text-slate-900">
            &quot;{todoTitle}&quot;
          </span>
          ?
        </p>

        <div className="mt-6 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className={`cursor-pointer rounded-xl border py-2.5 text-xs font-semibold transition hover:-translate-y-0.5 hover:shadow-md ${theme.cancelBtn}`}
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="cursor-pointer rounded-xl border border-rose-300 bg-rose-200/90 py-2.5 text-xs font-semibold text-rose-950 transition hover:-translate-y-0.5 hover:bg-rose-300 hover:shadow-md hover:shadow-rose-200/70"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}