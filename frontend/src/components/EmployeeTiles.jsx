// EmployeeTiles component displaying employee information in tile format with placeholder data.
import { useState } from "react";
import AttendanceBar from "./AttendanceBar";
import BunMenu from "./BunMenu";
import EmployeeDetailModal from "./EmployeeDetailModal";

// EmployeeTiles is a tile-based view for displaying employee details.
export default function EmployeeTiles({ employees, loading }) {
  const [selected, setSelected] = useState(null);

  // here we can see the loading placeholders
  if (loading)
    return (
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="h-40 rounded-2xl bg-white/40 backdrop-blur animate-pulse shadow"
          ></div>
        ))}
      </div>
    );

    // Render the Employee Tiles
  return (
    <>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {employees.map((emp) => (
          <div
            key={emp.id}
            onClick={() => setSelected(emp)}
            className="
              relative p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/30 
              shadow-xl hover:shadow-2xl transition cursor-pointer
            "
          >
            {/* Bun button */}
            <div className="absolute top-3 right-3">
              <BunMenu />
            </div>

            <h3 className="text-xl font-semibold">{emp.name}</h3>
            <p className="text-sm text-slate-600">{emp.class}</p>

            <div className="mt-4">
              <AttendanceBar value={emp.attendance} />
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {emp.subjects.map((s) => (
                <span
                  key={s}
                  className="px-2 py-1 text-xs rounded-lg bg-blue-100 text-blue-700"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      <EmployeeDetailModal
        open={!!selected}
        employee={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}

