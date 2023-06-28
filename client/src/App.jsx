import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegiterPage from "./pages/RegiterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/authContext";
import TasksPage from "./pages/TasksPage";
import TaskFormePage from "./pages/TaskFormePage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import { TaskProvider } from "./context/TasksContext";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
        <main className=" container mx-auto px-10">
        <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegiterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/add-task" element={<TaskFormePage />} />
              <Route path="/tasks/:id" element={<TaskFormePage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
