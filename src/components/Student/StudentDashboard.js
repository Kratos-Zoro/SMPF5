import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import QuizList from "./QuizList";
import RaiseDoubt from "./RaiseDoubt";
import ViewResults from "./ViewResults";
import QuizTaker from "./QuizTaker";

export default function StudentDashboard({ user }) {
  const [tab, setTab] = useState("quizzes");
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const navigate = useNavigate();

  const handleTakeQuiz = (quizId) => {
    setSelectedQuizId(quizId);
    setTab("takeQuiz");
  };

  return (
    <div className="card card-body shadow-sm">
      <h3 className="text-success mb-4">
        Welcome, {user?.name || "Student"} 
      </h3>

      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${tab === "quizzes" ? "active" : ""}`}
            onClick={() => setTab("quizzes")}
          >
            Take Quizzes
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${tab === "doubts" ? "active" : ""}`}
            onClick={() => setTab("doubts")}
          >
            Raise Doubts
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${tab === "mydoubts" ? "active" : ""}`}
            onClick={() => setTab("mydoubts")}
          >
            View My Doubts
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${tab === "results" ? "active" : ""}`}
            onClick={() => setTab("results")}
          >
            View Results
          </button>
        </li>
      </ul>

      {/* Tab content */}
      {tab === "quizzes" && <QuizList onTakeQuiz={handleTakeQuiz} />}
      {tab === "takeQuiz" && selectedQuizId && <QuizTaker id={selectedQuizId} />}
      {tab === "doubts" && <RaiseDoubt />}
      {tab === "results" && <ViewResults />}
    </div>
  );
}
