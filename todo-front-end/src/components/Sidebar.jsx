import React, { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  function logout() {
    localStorage.removeItem("token");
  }

  return (
    <div className="d-flex z-3">
      {/* Sidebar */}
      <div
        className={`sidebar bg-dark text-white p-3 ${
          isOpen ? "open" : "collapsed"
        } position-fixed  `}
      >
        <h3 className="navbar-brandd changa-one-regular-italic ps-3 mb-5">
          NoteIt
        </h3>
        <ul className="nav flex-column mt-4">
          <li className="nav-item mb-4">
            <Link to="/dashboard" className="nav-link text-white pt-1">
              {" "}
              <i className="fas fa-tachometer-alt me-2"> </i>Dashboard
            </Link>
          </li>
          <li className="nav-item mb-4">
            <Link to="/addtask" className="nav-link text-white pt-1">
              {" "}
              <i className="fa-notdog fa-solid fa-plus me-2"></i>Add Task
            </Link>
          </li>
          <li className=" mt-2 ms-1">
            <p className="nav-link text-white opacity-50">
              My Tasks
            </p>
          </li>

          <li className="nav-item mb-1">
            <Link to="/dashboard/work" className="nav-link text-white">
              <i className="fa-solid fa-circle me-2"></i>Work
            </Link>
          </li>
          <li className="nav-item mb-1">
            <Link to="/dashboard/personal" className="nav-link text-white">
              <i className="fa-solid fa-circle text-success me-2"></i>Personal
            </Link>
          </li>
          <li className="nav-item mb-1">
            <Link to="/dashboard/urgent" className="nav-link text-white">
              <i className="fa-solid fa-circle text-danger me-2"></i>Urgent
            </Link>
          </li>
          <li className="nav-item position-absolute bottom-0 w-100 p-2">
            <Link
              onClick={() => logout()}
              to="/"
              className="nav-link text-white"
            >
              Logout
              <i className="fa-solid fa-arrow-right-from-bracket ps-5"></i>
            </Link>
          </li>
        </ul>
        <button
          className="btn text-white mb-3 position-absolute top-0 end-0 mt-3"
          onClick={toggleSidebar}
        >
          <i className="fa-solid fa-circle-xmark"></i>
        </button>
      </div>

      {/* Main Content */}
      <div className=" w-100 border-raduis-none">
        <nav className="navbar w-100 py-3 sticky-top position-relative navbar-color">
          <button className="btn text-white fs-4" onClick={toggleSidebar}>
            {!isOpen && <i className="fa-solid fa-bars"></i>}
          </button>

          <div className="mx-auto">
            <Link
              to="/"
              className="text-decoration-none navbar-brandd fs-3 changa-one-regular-italic"
            >
              NoteIt
            </Link>
          </div>
          <div className="me-0">
            <Link
              onClick={() => logout()}
              to="/"
              className="navbar-brand text-white"
            >
              Logout
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
