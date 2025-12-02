import React, { useState } from "react";
import QuizList from "./QuizList";
import RaiseDoubt from "./RaiseDoubt";
import StudentDoubts from "./StudentDoubts";
import ViewResults from "./ViewResults";
import QuizTaker from "./QuizTaker";

export default function StudentDashboard({ user }) {
  const [tab, setTab] = useState("quizzes");
  const [selectedQuizId, setSelectedQuizId] = useState(null);

  const handleTakeQuiz = (quizId) => {
    setSelectedQuizId(quizId);
    setTab("takeQuiz");
  };

  return (
    <div className="card card-body shadow-sm mt-4">
      <h3 className="text-success mb-4">
        Welcome {user?.name || "Student"}
      </h3>

      {/* Tab Navigation */}
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
             Raise Doubt
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

      {/* Tab Content */}
      {tab === "quizzes" && <QuizList onTakeQuiz={handleTakeQuiz} />}
      {tab === "takeQuiz" && selectedQuizId && (
        <QuizTaker id={selectedQuizId} />
      )}
      {tab === "doubts" && <RaiseDoubt />}
      {tab === "mydoubts" && <StudentDoubts />}
      {tab === "results" && <ViewResults />}
    </div>
  );
}

