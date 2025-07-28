import React from "react";
import SignupForm from "../features/auth/SignupForm";

const Signup = () => {
  return (
    <div className="signup-page">
      <div className="title">
        <h2>회원가입</h2>
      </div>
      <SignupForm />
    </div>
  );
};

export default Signup;
