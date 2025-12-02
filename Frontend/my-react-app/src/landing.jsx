import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";

export default function LandingPage() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
        <div className="container">
          <a className="navbar-brand fw-bold text-primary fs-3" href="#">
            EduManage
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item mx-2">
                <a className="nav-link" href="#home">Home</a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link" href="#about">About</a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link" href="#features">Features</a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
            </ul>

            {/* Login and Sign Up buttons */}
            <div className="d-flex ms-3">
              <Link to="/login" className="btn btn-primary me-2">
                Login
              </Link>
              <Link to="/register" className="btn btn-outline-primary">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section container py-5 d-flex align-items-center">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="fw-bold display-5">
              College Management System
            </h1>
            <p className="mt-3 text-secondary">
              A complete digital platform to manage students, staff, exams,
              attendance, and everything your institution needs.
            </p>

            <button className="btn btn-primary btn-lg mt-3">
              Get Started
            </button>
          </div>

          <div className="col-md-6 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2942/2942874.png"
              className="hero-img"
              alt="college"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container py-5">
        <h2 className="text-center fw-bold mb-4">Our Features</h2>

        <div className="row g-4">
          <div className="col-md-3">
            <div className="card feature-card p-3 text-center">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png" className="feature-img" alt="" />
              <h5 className="mt-3 fw-bold">Student Management</h5>
              <p>Manage student records, details, and academic history.</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card feature-card p-3 text-center">
              <img src="https://cdn-icons-png.flaticon.com/512/2332/2332605.png" className="feature-img" alt="" />
              <h5 className="mt-3 fw-bold">Attendance Tracking</h5>
              <p>Monitor attendance with daily and monthly reports.</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card feature-card p-3 text-center">
              <img src="https://cdn-icons-png.flaticon.com/512/1995/1995515.png" className="feature-img" alt="" />
              <h5 className="mt-3 fw-bold">Exam & Results</h5>
              <p>Conduct exams and generate automatic report cards.</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card feature-card p-3 text-center">
              <img src="https://cdn-icons-png.flaticon.com/512/1256/1256650.png" className="feature-img" alt="" />
              <h5 className="mt-3 fw-bold">Fee Management</h5>
              <p>Track fees, receipts, dues, and payment history.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section py-5 text-center">
        <div className="container">
          <h2 className="fw-bold mb-3">About EduManage</h2>
          <p className="text-secondary fs-5 mx-auto" style={{ maxWidth: "750px" }}>
            EduManage is a complete digital college management system designed to
            simplify academic and administrative workflows. From admissions to
            exams, everything is automated and efficient.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section py-5 text-center">
        <div className="container d-flex flex-column justify-content-center align-items-center">
          <h2 className="fw-bold mb-3">Contact Us</h2>
          <p>Email: info@edumanage.com</p>
          <p>Phone: +91 1234567890</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer text-center py-3 bg-primary">
        <p className="text-white mb-0">© 2025 EduManage. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
