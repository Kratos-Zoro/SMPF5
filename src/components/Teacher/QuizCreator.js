import React, { useState } from "react";
import api from "../../api";

export default function QuizCreator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const payload = {
      title,
      description

    };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await api.post("/quizzes", payload);
      if (res.status === 200 || res.status === 201) {
        setMessage("Quiz created successfully!");
        setTitle("");
        setDescription("");
      }

      else 
        setMessage("Failed to create quiz.");
    } 
    catch (err) {
      console.error("Error:", err);
      setMessage("Something went wrong while creating Quiz.");
    }
  }
  return (
    <div>
      <h5>Create a New Quiz</h5>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Quiz Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-100">Create Quiz</button>
      </form>
    </div>
  );
}
