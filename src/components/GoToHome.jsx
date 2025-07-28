import React from "react";
import {useNavigate} from "react-router-dom";
import {IoHome} from "react-icons/io5";

const GoToLogin = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("/")}>
      <IoHome />
    </button>
  );
};

export default GoToLogin;
