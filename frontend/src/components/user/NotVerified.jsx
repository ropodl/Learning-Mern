import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";

export default function NotVerified() {
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;
  const isVerified = authInfo.profile?.isVerified;

  const navigate = useNavigate();

  const navigateToEmailVerfication = () => {
    navigate("/email-verification", { state: { user: authInfo.profile } });
  };

  return (
    <>
      {isLoggedIn && !isVerified ? (
        <p className="text-lg text-center bg-blue-300 p-2">
          Please verify your account,{" "}
          <button onClick={navigateToEmailVerfication} className="text-blue-500 font-semibold hover:underline" to="/email-verification">
            Click here
          </button>
        </p>
      ) : (
        ""
      )}
    </>
  );
}
