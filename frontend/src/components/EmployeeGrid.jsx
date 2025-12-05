// EmployeeGrid component displaying a table of employees with placeholder data.
// Includes modals for editing and deleting employees.

import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import AttendanceBar from "./AttendanceBar";
import BunMenu from "./BunMenu";
import EditEmployeeModal from "./EditEmployeeModal";
import DeleteEmployeeModal from "./DeleteEmployeeModal";

// employee data structure
export default function EmployeeGrid({ employees, loading, refetch }) {

  const [selected, setSelected] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { role } = useContext(AuthContext);

  function openEdit(emp) {
    setSelected(emp);
    setEditOpen(true);
  }

  function openDelete(emp) {
    setSelected(emp);
    setDeleteOpen(true);
  }

  // Render the employee grid
  return (
    <>
      <div className="bg-white/70 backdrop-blur-xl rounded-xl shadow-xl border border-white/30 p-6 overflow-x-auto">

        <table className="w-full text-left text-slate-700">
          <thead className="text-sm font-semibold text-slate-600 border-b">
            <tr>
              <th className="py-3">Name</th>
              <th>Age</th>
              <th>Class</th>
              <th>Subjects</th>
              <th>Attendance</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr><td className="py-3">Loading...</td></tr>
            )}

            {!loading && employees.map((emp) => (
              <tr key={emp.id} className="text-sm">
                <td className="py-3 font-medium">{emp.name}</td>
                <td>{emp.age}</td>
                <td>{emp.class}</td>
                <td>
                  <div className="flex gap-1 flex-wrap">
                    {emp.subjects.map((s) => (
                      <span key={s} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-lg">
                        {s}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="w-40">
                  <AttendanceBar value={emp.attendance} />
                </td>

                <td className="text-right">
                  {role === "admin" && (
                    <BunMenu
                      emp={emp}
                      onEdit={(emp) => openEdit(emp)}
                      onDelete={(emp) => openDelete(emp)}
                      onFlag={(emp) => console.log("flag", emp)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Modals */}
      <EditEmployeeModal
        open={editOpen}
        employee={selected}
        onClose={() => setEditOpen(false)}
        refetch={refetch}     
      />

      <DeleteEmployeeModal
        open={deleteOpen}
        employee={selected}
        onClose={() => setDeleteOpen(false)}
        refetch={refetch}     
      />
    </>
  );
}
