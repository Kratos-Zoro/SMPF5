import React, { useEffect, useState } from "react";
import api from "../../api";

export default function ViewResults() {
  const [results, setResults] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      try {
        const studentId = localStorage.getItem("userId");
        const quizId = localStorage.getItem("lastQuizId");
        if (!studentId || !quizId) {
          setMsg("Missing studentId or quizId.");
          setLoading(false);
          return;
        }
        const res = await api.get(`/results/${studentId}/${quizId}`);
        if (res.status === 200 && res.body) {
          setResults(res.body.results || []);
          setMsg(
            `Total: ${res.body.totalQuestions}, Correct: ${res.body.correctAnswer}`
          );
        } else {
          setMsg("No results found.");
        }
      } catch (err) {
        console.error("Error fetching results:", err);
        setMsg("Error fetching results.");
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h5>Your Quiz Results</h5>
      {msg && <div className="alert alert-info">{msg}</div>}

      {results.length === 0 ? (
        <div className="alert alert-warning">No quiz results yet.</div>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Your Answer</th>
              <th>Correct?</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={r.questionId}>
                <td>{i + 1}</td>
                <td>{r.question}</td>
                <td>{r.selectedOption}</td>
                <td>{r.correct ? "✅" : "❌"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}