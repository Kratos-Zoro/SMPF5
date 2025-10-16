import React, { useState } from "react";
import api from "../../api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [msg, setMsg] = useState(null);

  async function handleRegister(e) {
    e.preventDefault();
    setMsg(null);

    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      if (res.status === 200 || res.status === 201) {
        setMsg("Registered successfully! Please login now.");
        setName("");
        setEmail("");
        setPassword("");
        setRole("STUDENT");
      } else {
        setMsg("Registration failed. Try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setMsg("⚠️ Something went wrong during registration.");
    }
  }

  return (
    <div className="card card-body shadow-sm mt-4">
      <h5 className="text-center text-success mb-3">Register</h5>
      {msg && <div className="alert alert-info">{msg}</div>}
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label>Name</label>
          <input
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Role</label>
          <select
            className="form-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="STUDENT">Student</option>
            <option value="TEACHER">Teacher</option>
          </select>
        </div>
        <div className="text-end">
          <button className="btn btn-success w-100">Register</button>
        </div>
      </form>
    </div>
  );
}


// import React, { useState } from "react";
// import api from "../../api";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("STUDENT");
//   const [msg, setMsg] = useState(null);

//   async function handleRegister(e) {
//     e.preventDefault();
//     setMsg(null);
//     const res = await api("/auth/register", {
//       method: "POST",
//       body: { name, email, password, role },
//     });

//     if (res.status === 200 || res.status === 201)
//       setMsg("Registered successfully! Please login now.");
//     else setMsg("Registration failed. Try again.");
//   }

//   return (
//     <div className="card card-body shadow-sm mt-4">
//       <h5 className="text-center text-success mb-3">Register</h5>
//       {msg && <div className="alert alert-info">{msg}</div>}
//       <form onSubmit={handleRegister}>
//         <div className="mb-3">
//           <label>Name</label>
//           <input
//             className="form-control"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label>Email</label>
//           <input
//             type="email"
//             className="form-control"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label>Password</label>
//           <input
//             type="password"
//             className="form-control"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label>Role</label>
//           <select
//             className="form-select"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//           >
//             <option value="STUDENT">Student</option>
//             <option value="TEACHER">Teacher</option>
//           </select>
//         </div>
//         <div className="text-end">
//           <button className="btn btn-success w-100">Register</button>
//         </div>
//       </form>
//     </div>
//   );
// }
