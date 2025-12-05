// EmployeeGrid component displaying a table of employees with placeholder data.
import AttendanceBar from "./AttendanceBar";
import BunMenu from "./BunMenu";

// EmployeeGrid is a table-based view for displaying employee details.
export default function EmployeeGrid({ employees, loading }) {
  return (
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
                <BunMenu
                  onEdit={() => console.log("edit", emp.id)}
                  onFlag={() => console.log("flag", emp.id)}
                  onDelete={() => console.log("delete", emp.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
