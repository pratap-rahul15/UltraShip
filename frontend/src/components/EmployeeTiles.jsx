// EmployeeTiles component displaying employee information in tile format with placeholder data.
export default function EmployeeTiles() {
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl hover:shadow-2xl transition cursor-pointer">
        <div className="text-xl font-semibold">Loading...</div>
        <p className="text-slate-600 text-sm mt-2">Fetching employee data…</p>
      </div>
    </div>
  );
}
