import React from "react";
import { Link } from "react-router-dom";

export default function Header({ onLogout, role }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm rounded-3 mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          SMPF Classroom
        </Link>

        {/* Navbar*/}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">

            {/* Teacher Menu */}
            {role === "TEACHER" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/teacher/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teacher/quiz/create">
                    Create Quiz
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teacher/attendance">
                    Attendance
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teacher/doubts">
                    Doubts
                  </Link>
                </li>
              </>
            )}

            {/* Student Menu */}
            {role === "STUDENT" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/student/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/student/quizzes">
                    Quizzes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/student/results">
                    Results
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/student/doubt">
                    Raise Doubt
                  </Link>
                </li>
              </>
            )}

            {/* If not logged in */}
            {!role && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}

            {/* Logout */}
            {role && (
              <li className="nav-item ms-3">
                <button
                  className="btn btn-outline-danger btn-sm px-3"
                  onClick={onLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
