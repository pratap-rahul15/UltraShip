// EmployeeDetailModal component to show detailed info about an employee in a modal.

export default function EmployeeDetailModal({ open, onClose, employee }) {
  if (!open) return null;

  // Modal content
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-[450px] relative">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-600 hover:text-slate-900"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-4">
          {employee?.name || "Employee Details"}
        </h2>

        <div className="space-y-2 text-slate-700">
          <p><strong>Age:</strong> {employee?.age}</p>
          <p><strong>Class:</strong> {employee?.class}</p>
          <p><strong>Attendance:</strong> {employee?.attendance}%</p>

          <div>
            <strong>Subjects:</strong>
            <div className="flex gap-2 flex-wrap mt-1">
              {employee?.subjects?.map((s) => (
                <span
                  key={s}
                  className="px-2 py-1 text-sm rounded-lg bg-blue-100 text-blue-700"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
