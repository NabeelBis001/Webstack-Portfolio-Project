import React, { createContext, useState, useEffect, useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const AuthCons = createContext({});

export const AuthProvider = ({ children }) => {
  const [authcons, setAuthcons] = useState(() => {
    const storedAuth = localStorage.getItem("authcons");
    return storedAuth ? JSON.parse(storedAuth) : {};
  });

  useEffect(() => {
    localStorage.setItem("authcons", JSON.stringify(authcons));
  }, [authcons]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setAuthcons({});
    }, 9000000); 

    return () => clearTimeout(timeoutId);
  }, [authcons]);

  return (
    <AuthCons.Provider value={{ authcons, setAuthcons }}>
      {children}
    </AuthCons.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthCons);
};

export const RequireAuth = ({ allowedRoles }) => {
  const { authcons} = useAuth();

  return authcons?.roles === allowedRoles ? (
    <Outlet />
  ) : authcons?.accessToken ? (
    <Navigate to="/unauthorized" />
  ) : (
    <Navigate to="/login" />
  );
};
