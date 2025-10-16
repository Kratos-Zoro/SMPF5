import React, { useState } from "react";
import api from "../../api";

export default function AttendanceMark() {
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("PRESENT");
  const [date, setDate] = useState(""); // manual input
  const [time, setTime] = useState(""); // manual input
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!date || !time) {
      setMsg("Please provide both date and time.");
      return;
    }

    const payload = {
      userId: Number(userId),
      status,
      date,
      time,
    };
      try{
          const res = await api.post("/attendance",payload); 
          if (res.status === 200 || res.status === 201){
            setMsg(`✅ Attendance marked for ${date} at ${time}`);
            setUserId("");
            setStatus("PRESENT");
            setDate("");
            setTime("");
          }
           
          else 
            setMsg("Failed to mark attendance.");
        }catch (err) {
           console.error("Error:", err);
           setMsg("Something went wrong while marking attendance.");
        }    
      }
  return (
    <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <h4 className="text-center mb-4"> Mark Attendance</h4>

      {msg && (
        <div className={`alert ${msg.startsWith("*") ? "alert-success" : "alert-danger"}`}>
          {msg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm bg-light">
        <div className="mb-3">
          <label className="form-label">Student (User) ID</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Student ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="PRESENT">Present</option>
            <option value="ABSENT">Absent</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Time</label>
          <input
            type="time"
            className="form-control"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-warning w-100">
          Mark Attendance
        </button>
      </form>
    </div>
  );
}