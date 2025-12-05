
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_EMPLOYEE } from "../api/mutations";
import { GET_EMPLOYEES } from "../api/queries";
import Select from "react-select";
import toast from "react-hot-toast";


export default function AddEmployeeModal({ open, onClose, refetch }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [className, setClassName] = useState("");
  const [attendance, setAttendance] = useState("");
  const [subjects, setSubjects] = useState([]);

  const SUBJECT_OPTIONS = [
    { value: "Math", label: "Math" },
    { value: "Physics", label: "Physics" },
    { value: "Hindi", label: "Hindi" },
    { value: "Operating Systems", label: "Operating Systems" },
    { value: "CS", label: "CS" },
  ];

  const [addEmployee, { loading }] = useMutation(ADD_EMPLOYEE, {
    refetchQueries: [{ query: GET_EMPLOYEES }],
  });

  async function handleAdd() {
    if (!name || !age || !className || !attendance || subjects.length === 0) {
      toast.error("Fill all fields");
      return;
    }

    try {
      await addEmployee({
        variables: {
          name,
          age: Number(age),
          class: className,
          subjects: subjects.map((s) => s.value),
          attendance: Number(attendance),
        },
      });

      toast.success("Employee added!");
      onClose();
      refetch && refetch(); 
    } catch (err) {
      toast.error("Error adding employee");
      console.error(err);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl w-[450px] border border-white/40">
        <h2 className="text-xl font-semibold mb-6">Add Employee</h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Name</label>
          <input
            className="w-full px-3 py-2 rounded-lg border"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter full name"
          />
        </div>

        {/* Age */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Age</label>
          <input
            type="number"
            className="w-full px-3 py-2 rounded-lg border"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Age"
          />
        </div>

        {/* Class */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Class</label>
          <input
            className="w-full px-3 py-2 rounded-lg border"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="A / B / C"
          />
        </div>

        {/* Attendance */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Attendance (%)</label>
          <input
            type="number"
            className="w-full px-3 py-2 rounded-lg border"
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
            placeholder="0 - 100"
          />
        </div>

        {/* Subjects */}
        <div className="mb-6">
          <label className="block text-sm mb-1">Subjects</label>
          <Select
            isMulti
            options={SUBJECT_OPTIONS}
            value={subjects}
            onChange={setSubjects}
            className="text-sm"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleAdd}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {loading ? "Adding..." : "Add Employee"}
          </button>
        </div>
      </div>
    </div>
  );
}
