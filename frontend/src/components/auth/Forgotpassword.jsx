import React, { useState } from 'react'
import { forgotPassword } from '../../api/auth'
import { commonFormClass, commonParentClass } from '../../utils/theme'
import Container from '../Container'
import CustomLink from '../CustomLink'
import Input from '../form/Input'
import Submit from '../form/Submit'
import Title from '../form/Title'

export default function Forgotpassword() {

  const [email,setEmail] = useState("")

  const handleChange = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    const { ok, error } = forgotPassword(email);

    if (!ok) return updateNotification("error", error);

    handleLogin(userInfo.email, userInfo.password);
  };

  return (
    <div className={commonParentClass}>
        <Container>
            <form className={commonFormClass+' w-96'}>
              <Title>Forgot Password</Title>
              <Input name={'email'} value={email} placeholder={'Enter your fancy email'} type="email" onChange={handleChange}></Input>
              <Submit value={'Send Link'} />
              <div className="flex justify-between text-gray-400 mt-4">
                <CustomLink to="/sign-in">Sign In</CustomLink>
                <CustomLink to="/sign-in">Sign Up</CustomLink>
              </div>
            </form>
        </Container>
    </div>
  )
}
