import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import api from "../../api";

export default function QuizTaker({ id :propId}) {
  const {id:paramId} = useParams();
  const id = propId ?? Number(paramId);
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const res = await api.get(`/quizzes/${id}`); 
        if (res.status === 200) {
          setQuiz(res.body);

          const initialAnswers = {};
          res.body.questions.forEach((q) => {
            initialAnswers[q.id] = "";
          });
          setAnswers(initialAnswers);
        } else {
          setMsg("Failed to load quiz.");
        }
      } catch (err) {
        console.error(err);
        setMsg("Failed to load quiz.");
      }
    }

    fetchQuiz();
  }, [id]);

  const handleChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const studentId = Number(localStorage.getItem("userId"));
    const quizId = Number(id);

    // Build correct submissions array
    const submissions = Object.entries(answers).map(([questionId, selectedOption]) => ({
      questionId: Number(questionId),
      selectedOption
    }));

    const payload = { quizId, studentId, submissions };
    console.log("Submitting payload:", payload);
    const res = await api.post("/results/submit", payload);

    if (res.status === 200 || res.status === 201) {
      localStorage.setItem("lastQuizId", quizId);  
      const data = res.body; 
      setMsg(`Quiz submitted successfully! Score: ${data.correctAnswer}/${data.totalQuestions}`);
    }
    else {
       setMsg("Failed to submit quiz.");
    }
  } catch (err) {
    console.error("Quiz submission error:", err);
    setMsg("Something went wrong while submitting quiz.");
  }
};

  if (!quiz) return <p>Loading quiz...</p>;

  return (
    <div className="container mt-4">
      <h4 className="mb-3">{quiz.title}</h4>
      <p>{quiz.description}</p>

      {msg && (
        <div className={`alert ${msg.startsWith("*") ? "alert-success" : "alert-danger"}`}>
          {msg}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {quiz.questions.map((q, idx) => (
          <div key={q.id} className="mb-4 p-3 border rounded bg-light">
            <h6>{idx + 1}. {q.question}</h6>
            {["A", "B", "C", "D"].map((opt) => (
              <div key={opt} className="form-check">
                <input
                  type="radio"
                  name={`q${q.id}`}
                  id={`q${q.id}_${opt}`}
                  value={opt}
                  checked={answers[q.id] === opt}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                  className="form-check-input"
                />
                <label htmlFor={`q${q.id}_${opt}`} className="form-check-label">
                  {q[`option${opt}`]}
                </label>
              </div>
            ))}
          </div>
        ))}

        <button type="submit" className="btn btn-success w-100">Submit Quiz</button>
      </form>
    </div>
  );
}
