import React from "react";

import GoToHome from "./GoToHome.jsx";
import GoToLogin from "./GoToLogin.jsx";
import WriteNewPost from "./WriteNewPost.jsx";
import DarkModeToggle from "./DarkModeToggle.jsx";

const FloatingActions = () => {
  return (
    <>
      <GoToHome />
      <GoToLogin />
      <WriteNewPost />
      <DarkModeToggle />
    </>
  );
};

export default FloatingActions;
