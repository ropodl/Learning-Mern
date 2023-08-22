import React, { useState } from "react";
import { forgotPassword } from "../../api/auth";
import { useNotification } from "../../hooks";
import { commonFormClass, commonParentClass } from "../../utils/theme";
import Container from "../Container";
import CustomLink from "../CustomLink";
import Input from "../form/Input";
import Submit from "../form/Submit";
import Title from "../form/Title";

const validate = (email) => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // const nameRegex = /^[a-z A-Z]+$/;

  // if(!name.trim()) return {ok:false,error:"Name is missing"}
  // if(!nameRegex.test(name)) return {ok:false,error: "Invalid Name"}

  if (!email.trim()) return { ok: false, error: "Email is missing" };
  if (!emailRegex.test(email)) return { ok: false, error: "Email is in invalid format" };

  // if (!password.trim()) return { ok: false, error: "Password is missing" };
  // if (password.length < 8) return { ok: false, error: "Password must be 8 characters long" };

  return { ok: true };
};

export default function Forgotpassword() {
  const [email, setEmail] = useState("");
  const { updateNotification } = useNotification();

  const handleChange = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    const { ok, error } = validate(email);

    if (!ok) return updateNotification("error", error);

    const { message, error: Error } = await forgotPassword(email);
    if (Error) return updateNotification("error", Error);
    
    updateNotification("success", message);
  };

  return (
    <div className={commonParentClass}>
      <Container>
        <form onSubmit={formSubmit} className={commonFormClass + " w-96"}>
          <Title>Forgot Password</Title>
          <Input name={"email"} value={email} placeholder={"Enter your fancy email"} type="email" onChange={handleChange}></Input>
          <Submit value={"Send Link"} />
          <div className="flex justify-between text-gray-400 mt-4">
            <CustomLink to="/sign-in">Sign In</CustomLink>
            <CustomLink to="/sign-in">Sign Up</CustomLink>
          </div>
        </form>
      </Container>
    </div>
  );
}
