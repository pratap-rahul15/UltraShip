import { useState, useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_EMPLOYEES } from "../api/queries";
import EmployeeGrid from "../components/EmployeeGrid";
import EmployeeTiles from "../components/EmployeeTiles";
import AddEmployeeModal from "../components/AddEmployeeModal";
import { AuthContext } from "../context/AuthContext";

export default function Employees() {
  const { role } = useContext(AuthContext);

  
  const [view, setView] = useState("grid"); 
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const pageSize = 8;

  
  const { data, loading, error, refetch } = useQuery(GET_EMPLOYEES, {
    variables: { page, pageSize, search },
    fetchPolicy: "network-only",
  });

  const employees = data?.employees?.data || [];
  const total = data?.employees?.total || 0;
  const totalPages = Math.ceil(total / pageSize);

  function nextPage() {
    if (page < totalPages) setPage(page + 1);
  }

  function prevPage() {
    if (page > 1) setPage(page - 1);
  }

  return (
    <div className="space-y-8">
      
      {/* PAGE HEADER */}
      <div className="flex items-center justify-between">
        
        <h1 className="text-3xl font-semibold">Employees</h1>

        {/* Admin only → Add Employee button */}
        {role === "admin" && (
          <button
            onClick={() => setAddOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
          >
            + Add Employee
          </button>
        )}
      </div>

      {/* SEARCH + VIEW TOGGLE */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        
        {/* Search input */}
        <input
          className="px-4 py-2 rounded-xl border shadow bg-white/60 backdrop-blur-md w-72"
          placeholder="Search name, class, subject..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        {/* View buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setView("grid")}
            className={`px-4 py-2 rounded-lg ${
              view === "grid"
                ? "bg-blue-600 text-white"
                : "bg-white/50 shadow"
            }`}
          >
            Grid View
          </button>

          <button
            onClick={() => setView("tiles")}
            className={`px-4 py-2 rounded-lg ${
              view === "tiles"
                ? "bg-blue-600 text-white"
                : "bg-white/50 shadow"
            }`}
          >
            Tile View
          </button>
        </div>
      </div>

     
      <p className="text-sm text-slate-600">
        Showing page {page} of {totalPages} — Total {total} employees
      </p>

      {/* MAIN CONTENT */}
      {error ? (
        <p className="text-red-500">Error loading employees.</p>
      ) : view === "grid" ? (
        <EmployeeGrid employees={employees} loading={loading} refetch={refetch} />
      ) : (
        <EmployeeTiles employees={employees} loading={loading} refetch={refetch} />
      )}

      {/* PAGINATION */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={prevPage}
          className="px-3 py-2 bg-white/70 rounded-lg shadow disabled:opacity-40"
        >
          ← Prev
        </button>

        <span className="px-4 py-2 bg-white/50 rounded-lg shadow">
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={nextPage}
          className="px-3 py-2 bg-white/70 rounded-lg shadow disabled:opacity-40"
        >
          Next →
        </button>
      </div>

      {/* ADD EMPLOYEE MODAL */}
      <AddEmployeeModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        refetch={refetch}
      />
    </div>
  );
}
