// BunMenu component for edit, flag, delete actions
import { useState, useRef, useEffect } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

export default function BunMenu({ emp, onEdit, onDelete, onFlag }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Close menu on outside click
  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* 3-Dots button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="p-2 hover:bg-gray-200 rounded-full transition"
      >
        <EllipsisVerticalIcon className="w-6 h-6 text-slate-600" />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute right-0 mt-2 w-36 
            bg-white/80 backdrop-blur-xl 
            border border-slate-200 
            shadow-xl rounded-lg z-50
          "
        >
          <button
            onClick={() => {
              setOpen(false);
              onEdit(emp);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-blue-50"
          >
            Edit
          </button>

          <button
            onClick={() => {
              setOpen(false);
              onFlag(emp);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-yellow-50"
          >
            {emp.flagged ? "Unflag" : "Flag"}
          </button>

          <button
            onClick={() => {
              setOpen(false);
              onDelete(emp);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-red-50 text-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
