// BunMenu component for edit, flag, delete actions
import { useState, useRef, useEffect } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

export default function BunMenu({ onEdit, onFlag, onDelete }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

 // Close menu on outside click
  useEffect(() => {
    function handler(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // Menu JSX
  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 hover:bg-white/40 rounded-full transition"
      >
        <EllipsisVerticalIcon className="w-6 h-6 text-slate-600" />
      </button>

      {open && (
        <div
          className="
            absolute right-0 mt-2 w-40 
            bg-white/80 backdrop-blur-xl border border-white/30 
            shadow-xl rounded-xl p-2 z-20
            animate-fadeIn
          "
        >
          <button
            onClick={onEdit}
            className="block w-full text-left px-3 py-2 hover:bg-blue-50 rounded-lg"
          >
            Edit
          </button>

          <button
            onClick={onFlag}
            className="block w-full text-left px-3 py-2 hover:bg-yellow-50 rounded-lg"
          >
            Flag
          </button>

          <button
            onClick={onDelete}
            className="block w-full text-left px-3 py-2 hover:bg-red-50 rounded-lg text-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
