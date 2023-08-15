import React from 'react'
import { commonFormClass, commonParentClass } from '../../utils/theme'
import Container from '../Container'
import CustomLink from '../CustomLink'
import Input from '../form/Input'
import Submit from '../form/Submit'
import Title from '../form/Title'

export default function Forgotpassword() {
  return (
    <div className={commonParentClass}>
        <Container>
            <form className={commonFormClass+' w-96'}>
              <Title>Forgot Password</Title>
              <Input name={'email'} placeholder={'Enter your fancy email'} type="email"></Input>
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
