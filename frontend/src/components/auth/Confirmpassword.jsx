import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyPasswordResetToken } from "../../api/auth";
import { useNotification } from "../../hooks";
import { commonFormClass, commonParentClass } from "../../utils/theme";
import Container from "../Container";
import Input from "../form/Input";
import Submit from "../form/Submit";
import Title from "../form/Title";

export default function Confirmpassword() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const userId = searchParams.get("id");

  const { updateNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    isValidToken();
  }, []);

  const isValidToken = async () => {
    const { error, valid } = await verifyPasswordResetToken(token, userId);
    setIsVerifying(false);

    if (error) {
      navigate("/reset-password", { replace: true });
      return updateNotification("error", error);
    }

    if (!valid) {
      setIsValid(false);
      updateNotification("error", "Invalid Token");
      return navigate("/reset-password", { replace: true });
    }

    setIsValid(true);
  };

  if (isVerifying)
    return (
      <div className={commonParentClass}>
        <Container>
          <h1 className="text-4xl dark:text-white text-primary font-semibold">Please wait while we verify your request.</h1>
        </Container>
      </div>
    );

  if (!isValid)
    return (
      <div className={commonParentClass}>
        <Container>
          <h1 className="text-4xl dark:text-white text-primary font-semibold">Sorry the token is invalid.</h1>
        </Container>
      </div>
    );

  return (
    <div className={commonParentClass}>
      <Container>
        <form className={commonFormClass + " w-96"}>
          <Title>Enter New Password</Title>
          <Input name={"password"} placeholder={"Enter your new password"} type="password"></Input>
          <Input name={"confirmpassword"} placeholder={"Confirm password"} type="password"></Input>
          <Submit value={"Change Password"} />
        </form>
      </Container>
    </div>
  );
}
