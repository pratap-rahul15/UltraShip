import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Employees from "./pages/Employees.jsx";
import Login from "./pages/Login.jsx";
import { AuthContext } from "./context/AuthContext.jsx";
import { useContext } from "react";

export default function App() {
  const { token, login } = useContext(AuthContext);

  // If not logged in → show Login page
  if (!token) {
    return <Login onLogin={login} />;
  }

  // If logged in → show Dashboard
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/employees" />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </MainLayout>
  );
}
