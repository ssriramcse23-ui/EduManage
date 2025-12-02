import React, { useState } from "react";
import "./forget.css";

export default function Forget() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Reset link sent to: " + email);

    // API call can be added here
    // axios.post("/api/forgot-password", { email })
  };

  return (
    <div className="fp-container">
      <div className="fp-card">

        <h2 className="fp-title">Forgot Password</h2>
        <p className="fp-subtitle">
          Enter your email and we’ll send you a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="fp-form">

          <label className="fp-label">Email Address</label>
          <input
            type="email"
            required
            className="fp-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit" className="fp-btn">Send Reset Link</button>
        </form>

        <a href="/login" className="fp-back">Back to Login</a>
      </div>
    </div>
  );
}
