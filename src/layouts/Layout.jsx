import React from "react";
import {Outlet} from "react-router-dom";

/* components */
import SideMenu from "../components/SideMenu.jsx";
import FloatingActions from "../components/FloatingActions.jsx";

const Layout = () => {
  return (
    <>
      <div className="wrap">
        <h1>𓇼🧉❀🐚𓆉︎ ࿔*:･ﾟ☾</h1>
        <div className="main-container">
          <aside className="side-menu">
            <SideMenu />
          </aside>
          <main>
            <Outlet />
          </main>
          <aside className="floating-menu">
            <FloatingActions />
          </aside>
        </div>
      </div>
    </>
  );
};

export default Layout;
