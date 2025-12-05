// This is the main page controlling Grid / Tile view switching for Employees.
// It fetches employee data and manages pagination.
import { useState } from "react";
import { useQuery } from "@apollo/client";  
import { GET_EMPLOYEES } from "../api/queries";
import EmployeeGrid from "../components/EmployeeGrid";
import EmployeeTiles from "../components/EmployeeTiles";

// Main Employees Page Component
export default function Employees() {
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);


// Fetch employees with pagination
  const { data, loading, error } = useQuery(GET_EMPLOYEES, {
    variables: { page, pageSize: 12 },
    fetchPolicy: "cache-and-network",
  });

// Extract employees and pageInfo from the fetched data
  const employees = data?.employees?.items || [];
  const pageInfo = data?.employees?.pageInfo || {};

  if (error) return <p className="text-red-600">Error loading employees.</p>;

// Render the Employees page
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

      {/* Real Data Renderer */}
      {view === "grid" ? (
        <EmployeeGrid employees={employees} loading={loading} />
      ) : (
        <EmployeeTiles employees={employees} loading={loading} />
      )}

      {/* Pagination */}
      <div className="flex items-center gap-4 mt-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 rounded-lg bg-white/70 backdrop-blur border border-slate-300 disabled:opacity-40"
        >
          Previous
        </button>

        <span className="text-slate-700 font-medium">
          Page {page}
        </span>

        <button
          disabled={!pageInfo.hasNext}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 rounded-lg bg-white/70 backdrop-blur border border-slate-300 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
