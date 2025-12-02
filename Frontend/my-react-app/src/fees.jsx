import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./fees.css";

function Fees() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const feesData = [
    { semester: "Semester 1", tuition: 5000, lab: 1500, library: 500, scholarship: 1000, paid: 5500, pending: 1500 },
    { semester: "Semester 2", tuition: 5000, lab: 1500, library: 500, scholarship: 500, paid: 6000, pending: 1000 },
    { semester: "Semester 3", tuition: 5000, lab: 1500, library: 500, scholarship: 0, paid: 5500, pending: 1500 },
    { semester: "Semester 4", tuition: 5000, lab: 1500, library: 500, scholarship: 500, paid: 6000, pending: 1000 },
  ];

  return (
    <div className="fees-container">

      {/* Navbar */}
      <div className="fees-navbar">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>← Back</button>

        <div className="profile-section">
          <button className="profile-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <i className="fa fa-user-circle fa-lg"></i>
          </button>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/profile" onClick={() => setDropdownOpen(false)}>My Profile</Link>
              <Link to="/login" onClick={() => setDropdownOpen(false)}>Logout</Link>
            </div>
          )}
        </div>
      </div>

      <h2>Fees Details</h2>

      {/* Fee Summary Cards */}
      <div className="fees-cards">
        <div className="card">
          <h3>Total Tuition</h3>
          <p>₹{feesData.reduce((sum, f) => sum + f.tuition, 0)}</p>
        </div>
        <div className="card">
          <h3>Total Paid</h3>
          <p>₹{feesData.reduce((sum, f) => sum + f.paid, 0)}</p>
        </div>
        <div className="card">
          <h3>Total Pending</h3>
          <p>₹{feesData.reduce((sum, f) => sum + f.pending, 0)}</p>
        </div>
      </div>

      {/* Detailed Fee Table */}
      <div className="fees-table">
        <table>
          <thead>
            <tr>
              <th>Semester</th>
              <th>Tuition</th>
              <th>Lab</th>
              <th>Library</th>
              <th>Scholarship</th>
              <th>Paid</th>
              <th>Pending</th>
            </tr>
          </thead>
          <tbody>
            {feesData.map((fee, index) => (
              <tr key={index}>
                <td>{fee.semester}</td>
                <td>₹{fee.tuition}</td>
                <td>₹{fee.lab}</td>
                <td>₹{fee.library}</td>
                <td>₹{fee.scholarship}</td>
                <td className="paid">₹{fee.paid}</td>
                <td className="pending">₹{fee.pending}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Fees;

