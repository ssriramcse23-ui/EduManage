import React, { useState, useEffect } from "react";
import "./profile.css";

function Profile() {
  const [activeTab, setActiveTab] = useState("marks");
  const [user, setUser] = useState(null);
  const [marks, setMarks] = useState([]);

  // Fetch user data from localStorage (after login)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);

      // Fetch marks for this user
      fetch(`http://localhost:5000/marks/${storedUser._id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setMarks(data.marks);
        })
        .catch((err) => console.error("Error fetching marks:", err));
    }
  }, []);

  if (!user) return <p>Loading...</p>; // Or redirect to login

  return (
    <>
      <header className="header">
        <h1>Student Profile</h1>
        <nav>
          <a href="/dashboard">Dashboard</a>
          <a href="/login">Logout</a>
        </nav>
      </header>

      <main className="main">
        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-pic">{user.firstName[0]}</div>
          <div className="profile-info">
            <h2>{user.firstName} {user.lastName}</h2>
            <p><strong>Reg No:</strong> {user.registerNo}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <div className={`tab ${activeTab === "marks" ? "active" : ""}`} onClick={() => setActiveTab("marks")}>Marks</div>
          <div className={`tab ${activeTab === "courses" ? "active" : ""}`} onClick={() => setActiveTab("courses")}>Courses</div>
          <div className={`tab ${activeTab === "fees" ? "active" : ""}`} onClick={() => setActiveTab("fees")}>Fees</div>
        </div>

        {/* TAB CONTENT */}
        <div className="tab-content">
          {activeTab === "marks" && (
            <table>
              <thead>
                <tr><th>Subject</th><th>Total</th><th>Grade</th><th>Status</th></tr>
              </thead>
              <tbody>
                {marks.length === 0 ? (
                  <tr><td colSpan="4">No marks available</td></tr>
                ) : (
                  marks.map((m) => (
                    <tr key={m._id}>
                      <td>{m.subject}</td>
                      <td>{m.total}</td>
                      <td>{m.grade}</td>
                      <td>{m.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          {activeTab === "courses" && (
            <p>Courses tab content here (you can fetch dynamically later)</p>
          )}

          {activeTab === "fees" && (
            <p>Fees tab content here (you can fetch dynamically later)</p>
          )}
        </div>
      </main>

      <footer className="footer">© 2025 College Management System</footer>
    </>
  );
}

export default Profile;
