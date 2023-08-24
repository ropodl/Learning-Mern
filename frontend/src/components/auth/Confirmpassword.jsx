import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword, verifyPasswordResetToken } from "../../api/auth";
import { useNotification } from "../../hooks";
import { commonFormClass, commonParentClass } from "../../utils/theme";
import Container from "../Container";
import Input from "../form/Input";
import Submit from "../form/Submit";
import Title from "../form/Title";

const validate = ({ one, two }) => {
  if (!one.trim()) return { ok: false, error: "Password is missing" };
  if (one.length < 8) return { ok: false, error: "Password must be 8 characters long" };

  if (!two.trim()) return { ok: false, error: "Confirm Password is missing" };
  if (two.length < 8) return { ok: false, error: "Confirm Password must be 8 characters long" };

  return { ok: true };
};

export default function Confirmpassword() {
  const [password, setPassword] = useState({
    one: "",
    two: "",
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  const { updateNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    isValidToken();
  }, []);

  const isValidToken = async () => {
    const { error, valid } = await verifyPasswordResetToken(token, id);
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

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setPassword({ ...password, [name]: value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    const { ok, error } = validate(password);

    if (!ok) return updateNotification("error", error);

    if (password.one !== password.two) return updateNotification("error", "Passwords do not match");

    const { message, error: Error } = await resetPassword({ newPassword: password.one, userId:id, token });

    if (Error) return updateNotification("error", Error);

    updateNotification("success",message)
    navigate("/sign-in",{replace:true})
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
        <form onSubmit={formSubmit} className={commonFormClass + " w-96"}>
          <Title>Enter New Password</Title>
          <Input value={password.one} name={"one"} placeholder={"Enter your new password"} type="password" onChange={handleChange}></Input>
          <Input value={password.two} name={"two"} placeholder={"Confirm password"} type="password" onChange={handleChange}></Input>
          <Submit value={"Change Password"} />
        </form>
      </Container>
    </div>
  );
}
