import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./dashboard.css"; // optional custom CSS

function Dashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      navigate("/login"); // redirect if not logged in
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user"); // clear user session
    navigate("/login"); // redirect to login
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="d-flex bg-light" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div className="bg-primary text-white p-3" style={{ width: "250px" }}>
        <h3 className="text-center mb-4">Student CMS</h3>

        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="/dashboard" className="nav-link text-white">
              <i className="fa fa-home me-2"></i> Home
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link to="/mymarks" className="nav-link text-white">
              <i className="fa fa-graduation-cap me-2"></i> My Marks
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link to="/courses" className="nav-link text-white">
              <i className="fa fa-book-open me-2"></i> My Courses
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link to="/fees" className="nav-link text-white">
              <i className="fa fa-money-bill me-2"></i> Fees Details
            </Link>
          </li>

          <li className="nav-item">
            <button
              className="nav-link text-white bg-transparent border-0"
              onClick={handleLogout}
            >
              <i className="fa fa-right-from-bracket me-2"></i> Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        {/* Topbar */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Student Dashboard</h2>

          <div className="position-relative">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {user.firstName} <i className="fa fa-caret-down"></i>
            </button>

            {dropdownOpen && (
              <div
                className="position-absolute bg-white shadow rounded mt-2"
                style={{ right: 0, width: "150px", zIndex: 10 }}
              >
                <Link
                  className="dropdown-item py-2"
                  to="/profile"
                  onClick={() => setDropdownOpen(false)}
                >
                  <i className="fa fa-user-circle me-2"></i>My Profile
                </Link>

                <button
                  className="dropdown-item py-2 bg-transparent border-0"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Cards */}
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="card shadow text-center p-4">
              <i className="fa fa-graduation-cap fa-2x text-primary mb-2"></i>
              <h4>My Marks</h4>
              <p className="text-muted">View your academic performance</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow text-center p-4">
              <i className="fa fa-book-open fa-2x text-primary mb-2"></i>
              <h4>My Courses</h4>
              <p className="text-muted">Explore your enrolled courses</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow text-center p-4">
              <i className="fa fa-money-bill fa-2x text-primary mb-2"></i>
              <h4>Fees Details</h4>
              <p className="text-muted">View fee status & pending dues</p>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="card shadow p-3">
          <h5>Recent Activities</h5>
          <ul className="list-group list-group-flush mt-2">
            <li className="list-group-item">You scored 87 in Mathematics.</li>
            <li className="list-group-item">New course "Physics - II" added.</li>
            <li className="list-group-item">Your semester fees updated.</li>
            <li className="list-group-item">Class attendance updated.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
