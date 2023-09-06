import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getIsAuth, signInUser } from "../api/auth";
import { useNotification } from "../hooks/";

export const AuthContext = createContext();

const defaultAuthInfo = {
  profile: null,
  isLoggedIn: false,
  isPending: false,
  error: "",
};

export default function AuthProvider({ children }) {
  const [authInfo, setAuthInfo] = useState({ ...defaultAuthInfo });
  const { updateNotification } = useNotification();

  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setAuthInfo({ ...authInfo, isPending: true });

    const { error, user } = await signInUser({ email, password });

    if (error) {
      updateNotification("error", error);
      return setAuthInfo({ ...authInfo, isPending: false, error });
    }

    navigate("/", { replace: true });

    setAuthInfo({
      profile: user,
      isPending: false,
      isLoggedIn: true,
      error: "",
    });

    localStorage.setItem("auth_token", user.token);
  };

  const isAuth = async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;

    setAuthInfo({ ...authInfo, isPending: true });

    const { error, user, name, email, isVerified, role } = await getIsAuth(token);

    if (error) {
      updateNotification("error", error);
      return setAuthInfo({ ...authInfo, isPending: false, error });
    }
    // Profile here below is hacky way check back later
    setAuthInfo({ profile: { user, name, email, isVerified, role }, isLoggedIn: true, isPending: false, error: "" });
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    setAuthInfo({ ...defaultAuthInfo });
    navigate("/");
  };

  useEffect(() => {
    isAuth();
  }, []);

  return <AuthContext.Provider value={{ authInfo, handleLogin, handleLogout, isAuth }}>{children}</AuthContext.Provider>;
}
