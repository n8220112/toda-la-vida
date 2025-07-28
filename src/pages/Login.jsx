import React from "react";
import LoginForm from "../features/auth/LoginForm";

const Login = () => {
  return (
    <div className="login-page">
      <div className="title">
        <h2>로그인</h2>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
