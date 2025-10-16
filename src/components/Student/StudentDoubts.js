import React, { useEffect, useState } from "react";
import api from "../../api";

export default function StudentDoubts() {
  const [doubts, setDoubts] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    loadDoubts();
  }, []);

  async function loadDoubts() {
    try {
      const res = await api.get("/doubts");

      if (res.status === 200 && Array.isArray(res.body)) {
        const userId = localStorage.getItem("userId"); // ✅ Get current logged-in student ID
        if (!userId) {
          setMsg("⚠️ Unable to find your user ID. Please login again.");
          return;
        }

        // ✅ Filter doubts only for this student
        const myDoubts = res.body.filter(
          (d) => String(d.userId) === String(userId)
        );

        setDoubts(myDoubts);
        if (myDoubts.length === 0) setMsg("No doubts raised yet.");
        else setMsg("");
      } else {
        setMsg("❌ Failed to load doubts.");
      }
    } catch (err) {
      console.error("Error loading doubts:", err);
      setMsg("⚠️ Error loading doubts.");
    }
  }

  return (
    <div className="container mt-4">
      <h4 className="mb-3 text-primary">Your Doubts & Responses</h4>

      {msg && <div className="alert alert-info text-center">{msg}</div>}

      {doubts.length > 0 && (
        <ul className="list-group">
          {doubts.map((d) => (
            <li key={d.id} className="list-group-item">
              <p>
                <strong>Subject:</strong> {d.subject} <br />
                <strong>Question:</strong> {d.question} <br />
                <strong>Status:</strong>{" "}
                {d.status === "RESOLVED" ? (
                  <span className="badge bg-success">Resolved</span>
                ) : (
                  <span className="badge bg-warning text-dark">Pending</span>
                )}
              </p>

              {/* ✅ Show teacher’s reply if available */}
              {d.response ? (
                <div className="alert alert-success p-2 mt-2">
                  <strong>Teacher Response:</strong> {d.response}
                </div>
              ) : (
                <div className="alert alert-secondary p-2 mt-2">
                  Waiting for teacher’s response...
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
