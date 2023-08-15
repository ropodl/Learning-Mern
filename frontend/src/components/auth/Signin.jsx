import React from 'react'
import { commonFormClass, commonParentClass } from '../../utils/theme'
import Container from '../Container'
import CustomLink from '../CustomLink'
import Input from '../form/Input'
import Submit from '../form/Submit'
import Title from '../form/Title'


const help = ()=>{
  console.log('test');
}

export default function Signin() {
  return (
    <div className={commonParentClass}>
        <Container>
            <form onSubmit={help} className={commonFormClass+' w-80'}>
              <Title>Sign In</Title>
                <Input name={'email'} placeholder={'Enter your fancy email'} type="email"></Input>
                <Input name={'password'} placeholder={'Enter password'} type="password"></Input>
                <Submit value='Sign In'/>
                <div className="flex justify-between text-gray-400 mt-4">
                  <CustomLink to="/forgot-password">Forgot Password</CustomLink>
                  <CustomLink to="/sign-up">Sign Up</CustomLink>
                </div>
            </form>
        </Container>
    </div>
  )
}
