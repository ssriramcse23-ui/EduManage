import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./course.css";

export default function Courses() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const coursesData = [
    { title: "Mathematics", code: "MATH101", instructor: "Dr. Smith", schedule: "Mon & Wed 10:00-11:30" },
    { title: "Physics", code: "PHY102", instructor: "Dr. Johnson", schedule: "Tue & Thu 09:00-10:30" },
    { title: "Chemistry", code: "CHE103", instructor: "Dr. Lee", schedule: "Mon & Wed 12:00-13:30" },
    { title: "Computer Science", code: "CS104", instructor: "Dr. Brown", schedule: "Tue & Thu 11:00-12:30" },
    { title: "English", code: "ENG105", instructor: "Prof. Taylor", schedule: "Fri 10:00-12:00" },
  ];

  return (
    <div className="courses-container">

      {/* NAVBAR */}
      <div className="courses-navbar">
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

      <h2>My Courses</h2>

      <div className="courses-grid">
        {coursesData.map((course, index) => (
          <div className="course-card" key={index}>
            <h3>{course.title}</h3>
            <p><strong>Code:</strong> {course.code}</p>
            <p><strong>Instructor:</strong> {course.instructor}</p>
            <p><strong>Schedule:</strong> {course.schedule}</p>
            <button className="details-btn">View Details</button>
          </div>
        ))}
      </div>

    </div>
  );
}
