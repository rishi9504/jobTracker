import { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null
  );
  const [user, setUser] = useState(() =>
    authTokens ? jwtDecode(authTokens.access) : null
  );

  const loginUser = async (username, password) => {
    const response = await fetch("http://localhost:8000/api/auth/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      return true;
    } else {
      return false;
    }
  };

  const logoutUser = async () => {
    if (authTokens?.refresh) {
      await fetch("http://localhost:8000/api/auth/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
        body: JSON.stringify({ refresh: authTokens.refresh }),
      });
    }
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    window.location.href = "/login";
  };

  const contextData = {
    user,
    authTokens,
    loginUser,
    logoutUser,
  };

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};

export default AuthContext;
