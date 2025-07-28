import {Routes, Route} from "react-router-dom";

/* layouts */
import Layout from "./layouts/Layout";

/* pages */
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Detail from "./pages/Detail";
import Write from "./pages/Write";
import NotFound from "./pages/NotFound";

import RequireAuth from "./components/RequireAuth"; // 로그인 체크용

/* styles */
import "./styles/style.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* 메인 */}
        <Route index element={<Home />} />

        {/* 회원 */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        {/* 글 상세 */}
        <Route path="post/:postId" element={<Detail />} />

        {/* 로그인 후에만 가능한 영역 */}
        <Route element={<RequireAuth />}>
          <Route path="write" element={<Write />} />
          <Route path="edit/:postId" element={<Write isEdit={true} />} />
          {/* isEdit={true} : URL이나 상태에서 오는 게 아니라 라우팅 코드에서 수동으로 주입한 props */}
        </Route>

        {/* 없는 페이지 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
