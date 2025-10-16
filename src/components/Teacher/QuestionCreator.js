
import React, { useState, useEffect } from "react";
import api from "../../api";

export default function QuestionCreator() {
  const [quizzes, setQuizzes] = useState([]);
  const [quizId, setQuizId] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/quizzes").then((res) => {
      if (res.status === 200) setQuizzes(res.body || []);
    });
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      question: question,
      optionA: options[0],
      optionB: options[1],
      optionC: options[2],
      optionD: options[3],
      correctOption: options[correctIndex],
      quizId: quizId, 
      teacherId: localStorage.getItem("teacherId") || 1, 
    };

    try {
      const res = await api.post("/quizquestion", payload);
      if (res.status === 200 || res.status === 201)
        setMessage("Question added!");
      else setMessage(" Failed to add question.");
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    }
  }
  return (
    <div>
      <h5>Add Question to Quiz</h5>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Select Quiz</label>
          <select
            className="form-select"
            value={quizId}
            onChange={(e) => setQuizId(e.target.value)}
            required
          >
            <option value="">--Select--</option>
            {quizzes.map((q) => (
              <option key={q.id} value={q.id}>
                {q.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Question</label>
          <input
            className="form-control"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>

        {options.map((opt, i) => (
          <div className="input-group mb-2" key={i}>
            <input
              className="form-control"
              value={opt}
              placeholder={`Option ${i + 1}`}
              onChange={(e) => {
                const copy = [...options];
                copy[i] = e.target.value;
                setOptions(copy);
              }}
            />
            <div className="input-group-text">
              <input
                type="radio"
                name="correct"
                checked={correctIndex === i}
                onChange={() => setCorrectIndex(i)}
              />
            </div>
          </div>
        ))}
        <button className="btn btn-success w-100">Add Question</button>
      </form>
    </div>
  );
}

