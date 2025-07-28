import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../features/auth/AuthContext.jsx";

/***** 로그인 여부를 체크하는 컴포넌트 *****/
// 로그인하지 않은 경우: /login으로 리다이렉트

const RequireAuth = () => {
  const { user } = useAuthContext(); // 로그인된 유저 정보

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;
