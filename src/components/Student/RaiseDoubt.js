import React, { useState } from "react";
import api from "../../api";

export default function RaiseDoubt() {
  const [subject, setSubject] = useState("");
  const [question, setQuestion] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    // ✅ Get current logged-in student ID
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setMsg("⚠️ Unable to find your user ID. Please log in again.");
      return;
    }

    // ✅ Include userId in payload
    const payload = {
      subject,
      question,
      userId: Number(userId),
      status: "PENDING"
    };

    try {
      const res = await api.post("/doubts", payload);
      if (res.status === 200 || res.status === 201) {
        setMsg("✅ Doubt raised successfully!");
        setSubject("");
        setQuestion("");
      } else {
        setMsg("❌ Failed to raise doubt.");
      }
    } catch (err) {
      console.error("Error while raising doubt:", err);
      setMsg("⚠️ Something went wrong while raising your doubt.");
    }
  }

  return (
    <div className="container mt-4">
      <h4 className="mb-3 text-primary">Raise a Doubt</h4>
      {msg && <div className="alert alert-info text-center">{msg}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Subject</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter subject (e.g. Math, Science)"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Your Question</label>
          <textarea
            className="form-control"
            rows="3"
            placeholder="Type your doubt here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit Doubt
        </button>
      </form>
    </div>
  );
}


// import React, { useState } from "react";
// import api from "../../api";

// export default function RaiseDoubt() {
//   const [subject, setSubject] = useState("");
//   const [question, setQuestion] = useState("");
//   const [msg, setMsg] = useState("");

//   async function handleSubmit(e) {
//     e.preventDefault();

//     const payload = {
//       subject,
//       question
//     };

//     try {
//       const res = await api.post("/doubts", payload);
//       if (res.status === 200 || res.status === 201) {
//         setMsg("Doubt raised successfully!");
//         setSubject("");
//         setQuestion("");
//       } else {
//         setMsg("Failed to raise doubt.");
//       }
//     } catch (err) {
//       console.error("Error while raising doubt:", err);
//       setMsg("Something went wrong while raising your doubt.");
//     }
//   }

//   return (
//     <div className="container mt-4">
//       <h4 className="mb-3 text-primary">Raise a Doubt</h4>
//       {msg && <div className="alert alert-info text-center">{msg}</div>}

//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="form-label">Subject</label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter subject (e.g. Math, Science)"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Your Question</label>
//           <textarea
//             className="form-control"
//             rows="3"
//             placeholder="Type your doubt here..."
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             required
//           />
//         </div>

//         <button type="submit" className="btn btn-primary w-100">
//           Submit Doubt
//         </button>
//       </form>
//     </div>
//   );
// }
