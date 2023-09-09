import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useNotification } from "../../hooks";
import { commonFormClass, commonParentClass } from "../../utils/theme";
import Container from "../Container";
import CustomLink from "../CustomLink";
import Input from "../form/Input";
import Submit from "../form/Submit";
import Title from "../form/Title";

const validate = ({ email, password }) => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!email.trim()) return { ok: false, error: "Email is missing" };
  if (!emailRegex.test(email)) return { ok: false, error: "Email is in invalid format" };

  if (!password.trim()) return { ok: false, error: "Password is missing" };
  if (password.length < 8) return { ok: false, error: "Password must be 8 characters long" };

  return { ok: true };
};

export default function Signin() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { updateNotification } = useNotification();
  const { handleLogin, authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    const { ok, error } = validate(userInfo);
    if (!ok) return updateNotification("error", error);
    
    await handleLogin(userInfo.email, userInfo.password);
    
  };

  // useEffect(() => {
  //   if (isLoggedIn) navigate("/");
  // }, [isLoggedIn]);

  return (
    <div className={commonParentClass}>
      <Container>
        <form onSubmit={formSubmit} className={commonFormClass + " w-80"}>
          <Title>Sign In</Title>
          <Input name={"email"} value={userInfo.email} placeholder={"Enter your fancy email"} type="email" onChange={handleChange}/>
          <Input name={"password"} value={userInfo.password} placeholder={"Enter password"} type="password" onChange={handleChange}/>
          <Submit value="Sign In" />
          <div className="flex justify-between text-gray-400 mt-4">
            <CustomLink to="/forgot-password">Forgot Password</CustomLink>
            <CustomLink to="/sign-up">Sign Up</CustomLink>
          </div>
        </form>
      </Container>
    </div>
  );
}
