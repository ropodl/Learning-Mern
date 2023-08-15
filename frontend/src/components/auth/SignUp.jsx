import React, { useState } from "react";
import createUser from "../../api/auth";
import { commonFormClass, commonParentClass } from "../../utils/theme";
import Container from "../Container";
import CustomLink from "../CustomLink";
import Input from "../form/Input";
import Submit from "../form/Submit";
import Title from "../form/Title";

const validate=({name,email,password})=>{
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const nameRegex = /^[a-z A-Z]+$/;
  
  if(!name.trim()) return {ok:false,error:"Name is missing"}
  if(!nameRegex.test(name)) return {ok:false,error: "Invalid Name"}

  if(!email.trim()) return {ok:false,error:"Email is missing"}
  if(!emailRegex.test(email)) return {ok:false,error:"Email is in invalid format"}

  if(!password.trim()) return {ok:false,error:"Password is missing"}
  if(password.length<8) return {ok:false,error:"Password must be 8 characters long"}

  return {ok:true}
}

export default function SignUp() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const formSubmit = async(e) => {
    e.preventDefault();
    const {ok,error} = validate(userInfo)

    if(!ok) return console.log(error);

    await createUser(userInfo);
  }

  const { name, email, password } = userInfo;

  return (
    <div className={commonParentClass}>
      <Container>
        <form onSubmit={formSubmit} className={commonFormClass + " w-80"}>
          <Title>Sign Up</Title>
          <Input name="name" placeholder={"Enter your full name"} type="name" value={name} onChange={handleChange}/>
          <Input name="email" placeholder={"Enter your fancy email"} type="email" value={email} onChange={handleChange}/>
          <Input name="password" placeholder={"Enter super secure password"} type="password" value={password} onChange={handleChange}/>
          <Submit value={"Sign Up"} />
          <div className="flex justify-between text-gray-400 mt-4">
            <CustomLink to="/sign-in">Already have an account?</CustomLink>
          </div>
        </form>
      </Container>
    </div>
  );
}
