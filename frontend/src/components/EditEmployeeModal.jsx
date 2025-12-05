// EditEmployeeModal - wired to UPDATE_EMPLOYEE, uses refetch() after success.
// Preserves comments and basic structure.

import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_EMPLOYEE } from "../api/mutations";
import toast from "react-hot-toast";

export default function EditEmployeeModal({ open, employee, onClose, refetch }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    class: "",
    subjects: [],
    attendance: "",
  });

  useEffect(() => {
    if (employee) {
      setForm({
        name: employee.name || "",
        age: employee.age || "",
        class: employee.class || "A",
        subjects: employee.subjects || [],
        attendance: employee.attendance || 0,
      });
    }
  }, [employee]);

  // GraphQL mutation to update an employee
  const [updateEmployee, { loading }] = useMutation(UPDATE_EMPLOYEE);

  if (!open) return null;

  async function handleSave() {
    try {
      await updateEmployee({
        variables: {
          id: employee.id,
          input: {
            name: form.name,
            age: Number(form.age),
            class: form.class,
            subjects: form.subjects,
            attendance: Number(form.attendance),
          },
        },
      });

      toast.success("Employee updated!");
      if (refetch) await refetch();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  }

  function handleSubjectsChange(e) {
    const options = Array.from(e.target.options);
    const selected = options.filter((o) => o.selected).map((o) => o.value);
    setForm({ ...form, subjects: selected });
  }

  // Render the modal
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-xl p-6 w-[420px] shadow-xl">
        <h3 className="text-xl font-semibold mb-4">Edit Employee</h3>

        <div className="space-y-3">
          <input
            className="w-full px-3 py-2 border rounded-lg"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
          />

          <input
            className="w-full px-3 py-2 border rounded-lg"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            placeholder="Age"
          />

          <select
            value={form.class}
            onChange={(e) => setForm({ ...form, class: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>

          <label className="block text-sm font-medium">Subjects (multi-select)</label>
          <select
            multiple
            value={form.subjects}
            onChange={handleSubjectsChange}
            className="w-full h-28 px-2 py-2 border rounded-lg"
          >
            <option>Math</option>
            <option>Physics</option>
            <option>CS</option>
            <option>Hindi</option>
            <option>Operating Systems</option>
          </select>

          <input
            className="w-full px-3 py-2 border rounded-lg"
            value={form.attendance}
            onChange={(e) => setForm({ ...form, attendance: e.target.value })}
            placeholder="Attendance %"
          />
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200">
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
