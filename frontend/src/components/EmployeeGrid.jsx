// EmployeeGrid component displaying a table of employees with placeholder data.
export default function EmployeeGrid() {
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
          <tr className="text-sm">
            <td className="py-3 font-medium">Loading...</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
