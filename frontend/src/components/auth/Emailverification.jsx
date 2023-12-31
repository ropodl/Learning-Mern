import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { resendEmailVerificationToken, verifyEmailOTP } from "../../api/auth";
import { useAuth, useNotification } from "../../hooks";
import { commonFormClass, commonParentClass } from "../../utils/theme";
import Container from "../Container";
import Submit from "../form/Submit";
import Title from "../form/Title";

const OTP_LENGTH = 6;

export default function Emailverification() {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [activeOTPindex, setActiveOTPindex] = useState(0);
  const inputRef = useRef();

  const { state } = useLocation();
  const navigate = useNavigate();
  const { updateNotification } = useNotification();
  const { isAuth, authInfo } = useAuth();
  const { isLoggedIn, profile } = authInfo;
  const isVerified = profile?.isVerified;

  const user = state?.user;

  const handleOtpChange = ({ target }, index) => {
    const { value } = target;
    const newOTP = [...otp];
    newOTP[index] = value.substring(value.length - 1, value.length);

    if (!value) focusPreviousInput(index);
    else focusNextInput(index);

    setOtp([...newOTP]);
  };

  const focusNextInput = (index) => {
    setActiveOTPindex(index + 1);
  };
  const focusPreviousInput = (index) => {
    let nextIndex;
    const diff = index - 1;
    nextIndex = diff !== 0 ? diff : 0;
    setActiveOTPindex(nextIndex);
  };

  const handleKeyDown = ({ key }, index) => {
    if (key === "Backspace") {
      focusPreviousInput(index);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateOTP(otp)) return updateNotification("error", "Invalid OTP");

    const { success, user: userResponse, message, error } = await verifyEmailOTP({ userId: user.id, OTP: otp.join("") });

    if (error) return updateNotification("error", error);

    if (success) updateNotification("success", message);

    localStorage.setItem("auth_token", userResponse.token);
    isAuth();

    navigate("/");
  };

  const validateOTP = (otp) => {
    let valid = false;
    for (let val of otp) {
      valid = !isNaN(parseInt(val));
      if (!valid) break;
    }
    return valid;
  };

  const resendVerification = async () => {
    const { error, message } = await resendEmailVerificationToken(user.id);

    if (error) return updateNotification("error", error);

    updateNotification("success", message);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPindex]);

  useEffect(() => {
    if (!user) navigate("/not-found");
    if (isLoggedIn && isVerified) navigate("/");
  }, [user, isLoggedIn, isVerified]);

  return (
    <div className={commonParentClass}>
      <Container>
        <form onSubmit={handleSubmit} className={commonFormClass + " w-96"}>
          <Title>Email Verification</Title>
          <p className="text-center dark:text-dark-subtle text-secondary mb-6">Enter OTP sent on to your email address.</p>
          <div className="mb-6 flex justify-between items-center">
            {otp.map((_, index) => {
              return <input ref={activeOTPindex === index ? inputRef : null} type="number" key={index} onChange={(e) => handleOtpChange(e, index)} onKeyDown={(e) => handleKeyDown(e, index)} value={otp[index] || ""} min={0} max={9} className="spin-button-none w-12 h-12 outline-none border-2 dark:border-dark-subtle border-light-subtle focus:border-primary dark:focus:border-white bg-transparent rounded text-center dark:text-white text-primary font-semibold text-xl" />;
            })}
          </div>
          <Submit value={"Verify"} />
          <button onClick={resendVerification} type="button" className="mx-auto w-full mt-3 p-2 dark:text-white hover:text-blue-500 text-center cursor-pointer hover:underline">
            Don't have OTP
          </button>
        </form>
      </Container>
    </div>
  );
}
