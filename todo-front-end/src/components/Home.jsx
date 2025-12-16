import React from "react";
import image from "../assets/hero-image.jpg";
import { Link } from "react-router-dom";
import image_two from "../assets/hero-image-two.jpg";

function Home() {
  return (
    <div className="hero-section position-relative">
      <img
        src={image}
        alt="Notebook hero illustration"
        className="hero-image"
        loading="lazy"
      />

      <nav className="navbar px-2 top-0 position-absolute w-100 mt-3 px-3">
        <span className="navbar-brandd mb-0 ms-1 fs-2 changa-one-regular-italic">
          NoteIt
        </span>
        <div>
          <Link to="/login" className="me-4 text-dark text-decoration-none">
            Login
          </Link>
          <Link to="/register" className="me-2 text-dark text-decoration-none">
            SignUp
          </Link>
        </div>
      </nav>

      <div className="col-12 bg-dark text-white">
        <h4 className="text-center dancing-script-font">PlanIt DoIt NoteIt</h4>
      </div>

      <div className="row mt-3">
        <div className="col-12 col-lg-5">
          <img src={image_two} alt="Secondary hero" className="hero-image-two" />
        </div>
        <div className="col-12 col-lg-6 d-flex align-items-center  text-center text-white">
          <p className="fs-4">
            NoteIt is a sleek and intuitive task management app designed to help
            you stay organized and productive. With a clean interface and
            responsive design, it makes adding, tracking, and updating tasks
            effortless.
          </p>
        </div>
      </div>

      <footer className="bg-dark text-white mt-5">
        <div className="container-fluid text-center">
          <p className="mb-2">&copy; {new Date().getFullYear()} NoteIt Todo App</p>
          <p className="small">Built with ❤️ using React, Node.js, and MongoDB</p>
          <div>
            <a href="https://github.com/your-repo" className="text-white me-3">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://linkedin.com/in/jithendra-sri-manikanta-bonthu-385176363" className="text-white">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
