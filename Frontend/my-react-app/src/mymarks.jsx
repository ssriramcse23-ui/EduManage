import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./mymarks.css";

export default function MyMarks() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [marksData, setMarksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ---------------- Fetch User Marks ----------------
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || !storedUser._id) {
      navigate("/login"); // redirect if not logged in
      return;
    }

    const userId = storedUser._id;

    fetch(`http://localhost:5000/marks/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.marks && Array.isArray(data.marks)) {
          setMarksData(data.marks);
        } else {
          setMarksData([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching marks:", err);
        setMarksData([]);
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  return (
    <div className="marks-container">
      {/* ---------------- Navbar ---------------- */}
      <div className="marks-navbar">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back
        </button>

        <div className="profile-section">
          <button
            className="profile-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <i className="fa fa-user-circle me-1"></i> Student ▼
          </button>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/profile" onClick={() => setDropdownOpen(false)}>
                My Profile
              </Link>
              <Link to="/login" onClick={() => setDropdownOpen(false)}>
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>

      <h2>My Marks (Detailed View)</h2>

      {/* ---------------- Loader or Table ---------------- */}
      {loading ? (
        <p className="loading-text">Loading marks...</p>
      ) : (
        <div className="marks-table">
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Internal 1</th>
                <th>Internal 2</th>
                <th>Internal 3</th>
                <th>Assignment</th>
                <th>Attendance %</th>
                <th>Total</th>
                <th>Grade</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {marksData.length === 0 ? (
                <tr>
                  <td colSpan="9" className="no-marks">
                    No Marks Found
                  </td>
                </tr>
              ) : (
                marksData.map((row) => (
                  <tr key={row._id || row.subject}>
                    <td>{row.subject}</td>
                    <td>{row.internal1}</td>
                    <td>{row.internal2}</td>
                    <td>{row.internal3}</td>
                    <td>{row.assignment}</td>
                    <td className={row.attendance >= 90 ? "green" : "orange"}>
                      {row.attendance}%
                    </td>
                    <td className="blue">{row.total}</td>
                    <td>{row.grade}</td>
                    <td className={row.status === "Pass" ? "green" : "red"}>
                      {row.status}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
