import React, { useEffect, useRef, useState } from 'react';
import { commonFormClass, commonParentClass } from '../../utils/theme';
import Container from '../Container';
import Submit from '../form/Submit';
import Title from '../form/Title';

const OTP_LENGTH = 6;

export default function Emailverification() {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(''))
  const [activeOTPindex, setActiveOTPindex] = useState(0)
  const inputRef = useRef()

  const handleOtpChange = ({ target }, index) => {
    const { value } = target;
    const newOTP = [...otp];
    newOTP[index] = value.substring(value.length - 1, value.length);

    if (!value) focusPreviousInput(index);
    else focusNextInput(index);

    setOtp([...newOTP]);
  }

  const focusNextInput = (index) => {
    setActiveOTPindex(index + 1)
  }
  const focusPreviousInput = (index) => {
    let nextIndex;
    const diff = index - 1
    nextIndex = diff !== 0 ? diff : 0;
    setActiveOTPindex(nextIndex)
  }

  const handleKeyDown=({key},index)=>{
    if(key==='Backspace'){
      focusPreviousInput(index)
    }
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPindex])
  return (
    <div className={commonParentClass}>
      <Container>
        <form className={commonFormClass+' w-96'}>
          <Title>Email Verification</Title>
          <p className='text-center dark:text-dark-subtle text-secondary mb-6'>Enter OTP sent on tour email address.</p>
          <div className='mb-6 flex justify-between items-center'>
            {otp.map((_, index) => {
              return <input 
              ref={activeOTPindex === index ? inputRef : null}
              type="number" key={index}
              onChange={(e) => handleOtpChange(e, index)}
              onKeyDown={(e)=>handleKeyDown(e,index)}
              value={otp[index] || ''} min={0} max={9}
              className='spin-button-none w-12 h-12 outline-none border-2 dark:border-dark-subtle border-light-subtle focus:border-primary dark:focus:border-white bg-transparent rounded text-center dark:text-white text-primary font-semibold text-xl' />
            })}
          </div>
          <Submit value={'Verify'} />
        </form>
      </Container>
    </div>
  )
}
