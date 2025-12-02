import React, { useState } from "react";
import QuizCreator from "./QuizCreator";
import QuestionCreator from "./QuestionCreator";
import AttendanceMark from "./AttendanceMark";
import TeacherDoubts from "./TeacherDoubts";

export default function TeacherDashboard({ user }) {
  const [activeTab, setActiveTab] = useState("quiz");

  return (
    <div className="card card-body shadow-sm">
      <h3 className="text-primary mb-4">
        Welcome {user?.name || "Teacher"}
      </h3>

      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "quiz" ? "active" : ""}`}
            onClick={() => setActiveTab("quiz")}
          >
            Create Quiz
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "question" ? "active" : ""}`}
            onClick={() => setActiveTab("question")}
          >
            Add Questions
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "attendance" ? "active" : ""}`}
            onClick={() => setActiveTab("attendance")}
          >
            Mark Attendance
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "doubts" ? "active" : ""}`}
            onClick={() => setActiveTab("doubts")}
          >
            Resolve Doubts
          </button>
        </li>
      </ul>

      {activeTab === "quiz" && <QuizCreator />}
      {activeTab === "question" && <QuestionCreator />}
      {activeTab === "attendance" && <AttendanceMark />}
      {activeTab === "doubts" && <TeacherDoubts />}
    </div>
  );
}

