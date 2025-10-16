import React, { useState } from "react";
import api from "../../api";
import { jwtDecode } from "jwt-decode";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      
      const res = await api.post("/auth/login", { email, password });

      if (res.status === 200 && res.body?.token) {
        const token = res.body.token;
        localStorage.setItem("token", token);
        const decoded = jwtDecode(token);
        const userEmail = decoded.sub;

        // Fetch all users to map email -> ID
        const usersRes = await api.get("/users");

        if (usersRes.status === 200 && Array.isArray(usersRes.body)) {
          const user = usersRes.body.find((u) => u.email === userEmail);
          if (!user) return setError("User not found.");

          // Fetch profile
          const profileRes = await api.get(`/users/${user.id}`);
          if (profileRes.status === 200) {
            const profile = profileRes.body;
            localStorage.setItem("role", profile.role);
            localStorage.setItem("userId",profile.id);
            onLogin(token, profile); 
          } else {
            setError("Unable to fetch user profile.");
          }
        } else {
          setError("Failed to fetch user list.");
        }
      } else {
        setError("Invalid credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong.");
    }
  }

  return (
    <div className="card card-body shadow-sm mt-5 col-md-4 mx-auto">
      <h4 className="mb-3 text-center text-primary">Login</h4>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
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

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
}
