import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Confirmpassword from "./components/auth/Confirmpassword";
import Emailverification from "./components/auth/Emailverification";
import Forgotpassword from "./components/auth/Forgotpassword";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/Signin";
import Navbar from "./components/user/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/email-verification" element={<Emailverification />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/confirm-password" element={<Confirmpassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
