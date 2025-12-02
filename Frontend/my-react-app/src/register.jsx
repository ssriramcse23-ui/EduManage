import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const cardRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rePassword: "",
    gender: "",
    registerNo: "",
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState(""); 
  const [serverError, setServerError] = useState(""); 
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.firstName.trim()) tempErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) tempErrors.lastName = "Last Name is required";

    if (!formData.email.trim()) tempErrors.email = "Email is required";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) tempErrors.email = "Enter a valid email";
    }

    if (!formData.password) tempErrors.password = "Password is required";
    else if (formData.password.length < 6)
      tempErrors.password = "Password must be at least 6 characters";

    if (!formData.rePassword) tempErrors.rePassword = "Re-enter password";
    else if (formData.rePassword !== formData.password)
      tempErrors.rePassword = "Passwords do not match";

    if (!formData.gender) tempErrors.gender = "Gender is required";
    if (!formData.registerNo.trim()) tempErrors.registerNo = "Register Number is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccessMsg("");

    if (validate()) {
      setLoading(true);
      try {
        await axios.post("http://localhost:5000/register", formData);
        setSuccessMsg("Registration Successful!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          rePassword: "",
          gender: "",
          registerNo: "",
        });
        setErrors({});
        setTimeout(() => navigate("/login"), 2000); // redirect after 2s
      } catch (err) {
        setServerError(err.response?.data?.message || "Server error! Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Slow auto-scroll effect inside the card
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let scrollTop = 0;
    const maxScroll = card.scrollHeight - card.clientHeight;

    const slowScroll = () => {
      if (scrollTop < maxScroll) {
        scrollTop += 0.05; // smaller number = slower scroll
        card.scrollTo({ top: scrollTop });
        requestAnimationFrame(slowScroll);
      }
    };

    slowScroll();
  }, []);

  return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100 position-relative" 
      style={{ background: "#f4f6f9", overflow: "hidden" }}
    >
      {/* Loading overlay */}
      {loading && (
        <div 
          className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(255,255,255,0.7)", zIndex: 10 }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <div 
        ref={cardRef}
        className="card shadow p-4 rounded-4 form-box"
        style={{ 
          maxHeight: "90vh",
          overflowY: "auto",
          width: "100%",
          maxWidth: "500px",
          scrollBehavior: "smooth",
          position: "relative",
          zIndex: 1
        }}
      >
        <h3 className="text-center mb-4">Register</h3>

        {successMsg && <div className="alert alert-success">{successMsg}</div>}
        {serverError && <div className="alert alert-danger">{serverError}</div>}

        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
          </div>

          <div className="col-md-6">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
          </div>

          <div className="col-md-12">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="example@gmail.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </div>

          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.password && <small className="text-danger">{errors.password}</small>}
          </div>

          <div className="col-md-6">
            <label className="form-label">Re-Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Re-enter password"
              name="rePassword"
              value={formData.rePassword}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.rePassword && <small className="text-danger">{errors.rePassword}</small>}
          </div>

          <div className="col-md-6">
            <label className="form-label">Gender</label>
            <select
              className="form-select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="" disabled>Choose...</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            {errors.gender && <small className="text-danger">{errors.gender}</small>}
          </div>

          <div className="col-md-6">
            <label className="form-label">Register Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Register No"
              name="registerNo"
              value={formData.registerNo}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.registerNo && <small className="text-danger">{errors.registerNo}</small>}
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
