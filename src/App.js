import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Common/Header";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

// Teacher
import TeacherDashboard from "./components/Teacher/TeacherDashboard";
import QuizCreator from "./components/Teacher/QuizCreator";
import QuestionCreator from "./components/Teacher/QuestionCreator";
import AttendanceMark from "./components/Teacher/AttendanceMark";
import TeacherDoubts from "./components/Teacher/TeacherDoubts";

// Student
import StudentDashboard from "./components/Student/StudentDashboard";
import QuizList from "./components/Student/QuizList";
import QuizTaker from "./components/Student/QuizTaker";
import RaiseDoubt from "./components/Student/RaiseDoubt";
import ViewResults from "./components/Student/ViewResults";

// JWT
import { jwtDecode } from "jwt-decode";
import StudentDoubts from "./components/Student/StudentDoubts";

function App() {
  const navigate = useNavigate();

  // ✅ React state for token and role
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(token ? jwtDecode(token).role : null);

  // ✅ Sync with localStorage changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      const decodedRole = jwtDecode(token).role;
      localStorage.setItem("role", decodedRole);
      setRole(decodedRole);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setRole(null);
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    navigate("/");
  };

  const handleLogin = (token, profile) => {
    setToken(token);
    const userRole = profile?.role || jwtDecode(token).role;
    setRole(userRole);

    // ✅ Navigate immediately after login
    if (userRole === "TEACHER") navigate("/teacher/dashboard");
    else if (userRole === "STUDENT") navigate("/student/dashboard");
    else navigate("/");
  };

  return (
    <>
      <Header onLogout={handleLogout} role={role} />

      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        {/* Teacher Routes */}
        {role === "TEACHER" && (
          <>
            <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
            <Route path="/teacher/quiz/create" element={<QuizCreator />} />
            <Route path="/teacher/question/create" element={<QuestionCreator />} />
            <Route path="/teacher/attendance" element={<AttendanceMark />} />
            <Route path="/teacher/doubts" element={<TeacherDoubts />} />
          </>
        )}

        {/* Student Routes */}
        {role === "STUDENT" && (
          <>
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/quizzes" element={<QuizList />} />
            <Route path="/student/quiz/:id" element={<QuizTaker />} />
            <Route path="/student/doubt" element={<RaiseDoubt />} />
            <Route path="/student/results" element={<ViewResults />} />
            <Route path="/student/doubts/view" element={<StudentDoubts />} />
          </>
        )}

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}