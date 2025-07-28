import React from "react";
import {useNavigate} from "react-router-dom";
import {signOut} from "firebase/auth";
import {auth} from "../utils/firebase";

import {useAuthContext} from "../features/auth/AuthContext";

import {IoLogIn, IoLogOut} from "react-icons/io5";

const GoToLogin = () => {
  const {user} = useAuthContext();
  const navigate = useNavigate();

  const handleLogInOut = async () => {
    if (user) {
      try {
        await signOut(auth);
        navigate("/");
      } catch (err) {
        alert("로그아웃 실패: " + err.message);
      }
    } else {
      navigate("/login");
    }
  };

  return <button onClick={handleLogInOut}>{user ? <IoLogOut /> : <IoLogIn />}</button>;
};

export default GoToLogin;
