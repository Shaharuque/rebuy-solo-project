import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const token = localStorage.getItem("adminToken") || null;
  console.log("token require auth", token);
  let location = useLocation();
  console.log("location", location);

  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <>{children}</>; // Wrap children inside React.Fragment or <div> if needed
};

export default RequireAuth;
