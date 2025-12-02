import React, { useEffect, useState } from "react";
import api from "../../api";

export default function QuizList({ onTakeQuiz }) {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId"); 

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        let res;
        // Only fetch quizzes created by this teacher
        if (role === "TEACHER" || role==="ROLE_TEACHER") {
          
          res = await api.get(`/quizquestion/teacher/${userId}`);
        } else {
          // Students see all quizzes 
          res = await api.get("/quizzes");
        }

        if (res.status === 200) {
          setQuizzes(res.body || []);
        } else {
          setMsg("Failed to fetch quizzes. Check access.");
        }
      } catch (err) {
        console.error(err);
        setMsg("Failed to fetch quizzes. Check access.");
      } finally {
        setLoading(false);
      }
    }

    fetchQuizzes();
  }, [role, userId]);

  if (loading) return <p>Loading quizzes...</p>;
  if (!quizzes.length) return <p>No quizzes available.</p>;

  return (
    <div className="list-group">
      {msg && <div className="alert alert-danger">{msg}</div>}

      {quizzes.map((quiz) => (
        <div key={quiz.id} className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <h6>{quiz.title}</h6>
            <small>{quiz.description}</small>
          </div>

          {role === "STUDENT" && (
            <button className="btn btn-primary" onClick={()=>{localStorage.setItem("lastQuizId",quiz.id);
              onTakeQuiz(quiz.id);}}>
                TakeQuiz
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
