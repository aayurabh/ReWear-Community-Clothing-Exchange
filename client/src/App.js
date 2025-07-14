import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import Browse from "./components/pages/Browse";
import ItemDetails from "./components/pages/ItemsDetails";
import AddItem from "./components/pages/AddItems";
import AdminPanel from "./components/pages/AdminPanel";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/browse" element={<Browse />} />
            <Route path="/items/:id" element={<ItemDetails />} />
            <Route
              path="/add-item"
              element={
                <ProtectedRoute>
                  <AddItem />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
