// MainLayout component with responsive sidebar and top navbar.
// Here I'm uisng the Tailwind CSS for styling and Heroicons for icons.
import { useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

// Menu items for sidebar and top navbar
const menuItems = [
  { name: "Dashboard" },
  { name: "Employees" },
  {
    name: "Manage",
    children: ["Classes", "Attendance"],
  },
];

// Top menu items
const topMenu = ["Grid View", "Tile View", "Reports", "Settings"];

export default function MainLayout({ children }) {
  const [open, setOpen] = useState(false);
  
// Responsive sidebar state
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-100 to-slate-200 text-slate-800">

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 w-72 z-30 p-6
          backdrop-blur-xl bg-white/40 border-r border-white/30 shadow-xl
          transform transition-all duration-300
          ${open ? "translate-x-0" : "-translate-x-72"}
          md:translate-x-0
        `}
      >
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl font-semibold tracking-wide">Ultraship 🚀</h1>
          <button className="md:hidden" onClick={() => setOpen(false)}>
            <XMarkIcon className="w-7 h-7" />
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="space-y-4">
          {menuItems.map((item) => (
            <div key={item.name}>
              <p className="font-medium flex items-center justify-between hover:text-blue-600 cursor-pointer transition">
                {item.name}
                {item.children && <ChevronRightIcon className="w-4 h-4" />}
              </p>

              {/* Submenu */}
              {item.children && (
                <div className="pl-4 mt-2 space-y-1">
                  {item.children.map((c) => (
                    <p
                      key={c}
                      className="text-sm text-slate-600 hover:text-blue-500 cursor-pointer transition"
                    >
                      {c}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main Layout */}
      <div className="flex-1 md:ml-72 flex flex-col">

        {/* Top Navbar */}
        <header className="flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-white/50 shadow-md border-b border-white/30">
          <button className="md:hidden" onClick={() => setOpen(true)}>
            <Bars3Icon className="w-7 h-7 text-slate-700" />
          </button>

          {/* Desktop Top Menu */}
          <nav className="hidden md:flex space-x-8">
            {topMenu.map((item) => (
              <p
                key={item}
                className="hover:text-blue-600 font-medium cursor-pointer transition"
              >
                {item}
              </p>
            ))}
          </nav>

          <div className="font-medium">Admin • Rahul</div>
        </header>

        {/* Content */}
        <main className="p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
