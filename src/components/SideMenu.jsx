import React from "react";
import PostList from "../features/post/PostList";
import {useAuthContext} from "../features/auth/AuthContext";

const SideMenu = () => {
  const {user, nickname} = useAuthContext();
  return (
    <div className="side-menu-inner">
      <span style={{marginBottom: "10px", fontWeight: "700"}}>{user ? <span>💌 안녕 {nickname}!</span> : <span>📫 로그인되지 않았습니다.</span>}</span>
      <PostList />
    </div>
  );
};

export default SideMenu;
