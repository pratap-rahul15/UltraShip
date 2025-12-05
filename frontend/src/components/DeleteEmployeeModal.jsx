import { useMutation } from "@apollo/client";
import { DELETE_EMPLOYEE } from "../api/mutations";
import toast from "react-hot-toast";


export default function DeleteEmployeeModal({ open, employee, onClose, refetch }) {
  const [deleteEmployee, { loading }] = useMutation(DELETE_EMPLOYEE);

  if (!open) return null;

  // Handle the delete action here
  async function handleDelete() {
    try {
      await deleteEmployee({ variables: { id: employee.id } });
      toast.success("Employee deleted!");
      if (refetch) await refetch();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="bg-white rounded-xl p-6 w-[350px] shadow-xl">
        <h3 className="text-lg font-semibold mb-4">Delete Employee?</h3>
        <p className="text-sm text-slate-600">
          Are you sure you want to delete <b>{employee?.name}</b>?
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
