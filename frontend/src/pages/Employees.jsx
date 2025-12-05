// This is the main page controlling Grid / Tile view switching for Employees.
import { useState } from "react";
import EmployeeGrid from "../components/EmployeeGrid";
import EmployeeTiles from "../components/EmployeeTiles";

export default function Employees() {
  const [view, setView] = useState("grid");

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold">Employees</h2>

      {/* Switcher */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setView("grid")}
          className={`px-4 py-2 rounded-lg transition ${
            view === "grid"
              ? "bg-blue-600 text-white shadow"
              : "bg-white/60 backdrop-blur border border-slate-200"
          }`}
        >
          Grid View
        </button>

        <button
          onClick={() => setView("tile")}
          className={`px-4 py-2 rounded-lg transition ${
            view === "tile"
              ? "bg-blue-600 text-white shadow"
              : "bg-white/60 backdrop-blur border border-slate-200"
          }`}
        >
          Tile View
        </button>
      </div>

      {/* Renderer */}
      {view === "grid" ? <EmployeeGrid /> : <EmployeeTiles />}
    </div>
  );
}
