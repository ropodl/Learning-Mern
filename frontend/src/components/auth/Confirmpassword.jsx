import React from 'react'
import { commonFormClass, commonParentClass } from '../../utils/theme'
import Container from '../Container'
import Input from '../form/Input'
import Submit from '../form/Submit'
import Title from '../form/Title'

export default function Confirmpassword() {
  return (
    <div className={commonParentClass}>
        <Container>
            <form className={commonFormClass+' w-96'}>
              <Title>Enter New Password</Title>
              <Input name={'password'} placeholder={'Enter your new password'} type="password"></Input>
              <Input name={'confirmpassword'} placeholder={'Confirm password'} type="password"></Input>
              <Submit value={'Change Password'} />
            </form>
        </Container>
    </div>
  )
}
