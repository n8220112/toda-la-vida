import React from "react";
import {useNavigate} from "react-router-dom";

import {useAuthContext} from "../features/auth/AuthContext";

import {IoPencil} from "react-icons/io5";

const WriteNewPost = () => {
  const {user} = useAuthContext();
  const navigate = useNavigate();

  const handleGoToWrite = async () => {
    if (user) {
      navigate("/write");
    } else {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  };

  return (
    <button onClick={handleGoToWrite}>
      <IoPencil />
    </button>
  );
};

export default WriteNewPost;
