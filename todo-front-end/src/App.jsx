import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import AddTask from "./components/AddTask";
import Work from "./components/Work";
import Urgent from "./components/Urgent";
import Personal from "./components/Personal";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addtask" element={<AddTask />} />
          <Route path="/dashboard/work" element={<Work />} />
          <Route path="/dashboard/urgent" element={<Urgent />} />
          <Route path="/dashboard/personal" element={<Personal />} />






        </Routes>
      </BrowserRouter>
    </>
  );
} 

export default App;
