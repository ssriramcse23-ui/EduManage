// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // Redirect to login if no user
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
