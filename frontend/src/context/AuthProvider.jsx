import React, { createContext } from "react";
import { signInUser } from "../api/auth";

export const AuthProvider = createContext();

const defaultAuthInfo = {
  profile: null,
  isLoggedIn: false,
  isPending: false,
  error: "",
};

export default function AuthProvider({ children }) {
  const [authInfo, setAuthInfo] = useState({ ...defaultAuthInfo });

  const handlelogin = async(email, password) => {
    setAuthInfo({...authInfo,isPending:true})
    const {error,user} = await signInUser({ email, password });
    
  };

  return <AuthContext.Provider value={{ authInfo, handlelogin, handlelogout, isAuth }}>{children}</AuthContext.Provider>;
}
