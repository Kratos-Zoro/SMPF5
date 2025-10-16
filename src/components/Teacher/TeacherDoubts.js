import React, { useState, useEffect } from "react";
import api from "../../api";

export default function TeacherDoubts() {
  const [doubts, setDoubts] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    loadDoubts();
  }, []);

  async function loadDoubts() {
    try {
      const res = await api.get("/doubts");
      if (res.status === 200 && Array.isArray(res.body)) {
        setDoubts(res.body);
        if (res.body.length === 0) setMsg("No doubts raised yet.");
        else setMsg("");
      } else {
        setMsg("Failed to load doubts.");
      }
    } catch (err) {
      console.error("Error loading doubts:", err);
      setMsg("Error loading doubts.");
    }
  }

  async function handleResolve(id) {
    const reply = prompt("Enter your reply:");
    if (!reply) return;

    try {
      const res = await api.put(`/doubts/${id}`, {
        response: reply,
        status: "RESOLVED",
      });

      if (res.status === 200) {
        alert("Reply submitted!");
        loadDoubts();
      } else {
        alert("Failed to submit reply.");
      }
    } catch (err) {
      console.error("Error replying to doubt:", err);
      alert("Error while submitting reply.");
    }
  }

  return (
    <div className="container mt-4">
      <h4 className="mb-3 text-primary">Resolve Student Doubts</h4>

      {msg && <div className="alert alert-info">{msg}</div>}

      {doubts.length > 0 && (
        <ul className="list-group">
          {doubts.map((d) => (
            <li key={d.id} className="list-group-item">
              <p>
                <strong>Subject:</strong> {d.subject} <br />
                <strong>Question:</strong> {d.question} <br />
                <strong>Status:</strong>{" "}
                {d.status || "PENDING"} <br />
                <strong>Student ID:</strong> {d.userId || "Unknown"}
              </p>

              {d.response ? (
                <div className="alert alert-success p-2">
                  <strong>Teacher Response:</strong> {d.response}
                </div>
              ) : (
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => handleResolve(d.id)}
                >
                  Reply
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}