// Layout component for the main application structure.
// Includes a sidebar, top navigation, and main content area.
import { useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

// Menu configuration
const menuItems = [
  { name: "Dashboard" },
  { name: "Employees" },
  { 
    name: "Manage",
    children: ["Classes", "Attendance"],
  },
];

// Top navigation menu items
const topMenu = ["Grid View", "Tile View", "Reports", "Settings"];

// Main layout component
export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  // Render the layout
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-100 to-slate-200">

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
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl font-semibold text-slate-800 tracking-wide">
            Ultraship 🚀
          </h1>
          <button className="md:hidden" onClick={() => setOpen(false)}>
            <XMarkIcon className="w-7 h-7 text-slate-700" />
          </button>
        </div>

        {/* Menu */}
        <nav className="space-y-4">
          {menuItems.map((item) => (
            <div key={item.name}>
              <p
                className="
                  text-slate-700 font-medium flex items-center justify-between 
                  hover:text-blue-600 cursor-pointer transition-colors
                "
              >
                {item.name}
                {item.children && <ChevronRightIcon className="w-4 h-4" />}
              </p>

              {/* Submenu */}
              {item.children && (
                <div className="pl-4 mt-2 space-y-1">
                  {item.children.map((c) => (
                    <p
                      key={c}
                      className="
                        text-sm text-slate-600 hover:text-blue-500 cursor-pointer 
                        transition-colors
                      "
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

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main content layout */}
      <div className="flex-1 md:ml-72 flex flex-col">

        {/* Top Navigation */}
        <header
          className="
            flex items-center justify-between px-6 py-4
            backdrop-blur-xl bg-white/50 shadow-md border-b border-white/30
          "
        >
          <button className="md:hidden" onClick={() => setOpen(true)}>
            <Bars3Icon className="w-7 h-7 text-slate-700" />
          </button>

          {/* Horizontal menu */}
          <nav className="hidden md:flex space-x-8">
            {topMenu.map((item) => (
              <p
                key={item}
                className="
                  text-slate-700 hover:text-blue-600 font-medium cursor-pointer
                  transition-colors
                "
              >
                {item}
              </p>
            ))}
          </nav>

          {/* Profile */}
          <div className="text-slate-700 font-medium">
            Admin • Rahul
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
