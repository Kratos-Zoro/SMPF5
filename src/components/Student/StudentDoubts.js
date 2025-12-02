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
    console.log("Full API response:", res);

    
    const data = res?.body;

    if (Array.isArray(data)) {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setMsg("Unable to find your user ID. Please log in again.");
        return;
      }

      const myDoubts = data.filter(
        (d) => String(d.userId) === String(userId)
      );

      setDoubts(myDoubts);
      if (myDoubts.length === 0)
        setMsg("You haven’t raised any doubts yet.");
      else setMsg("");
    } else {
      console.error("Unexpected response structure:", res);
      setMsg("Failed to load doubts (unexpected format).");
    }
  } catch (err) {
    console.error("Error loading doubts:", err);
    setMsg("Something went wrong while fetching your doubts.");
  }
}

  return (
    <div className="card card-body shadow-sm mt-4">
      <h4 className="text-primary mb-3 text-center">Your Doubts & Responses</h4>

      {msg && <div className="alert alert-info text-center">{msg}</div>}

      {doubts.length > 0 && (
        <ul className="list-group">
          {doubts.map((d) => (
            <li key={d.id} className="list-group-item mb-2 shadow-sm">
              <p className="mb-1">
                <strong>Subject:</strong> {d.subject} <br />
                <strong>Question:</strong> {d.question} <br />
                <strong>Status:</strong>{" "}
                {d.status === "RESOLVED" ? (
                  <span className="badge bg-success">Resolved</span>
                ) : (
                  <span className="badge bg-warning text-dark">Pending</span>
                )}
              </p>

              {d.response ? (
                <div className="alert alert-success p-2 mt-2 mb-0">
                  <strong>Teacher Response:</strong> {d.response}
                </div>
              ) : (
                <div className="alert alert-secondary p-2 mt-2 mb-0">
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

