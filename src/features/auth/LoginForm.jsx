import React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../utils/firebase";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogic = async () => {
    if (!email || !password) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        alert("가입되지 않은 이메일입니다.");
      } else if (err.code === "auth/wrong-password") {
        alert("비밀번호가 틀렸습니다.");
      } else {
        alert("로그인 실패" + err.message);
      }
    }
  };
  return (
    <section className="login-form form">
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
        <div className="action">
          <Link to="/signup">아이디 | 비밀번호 찾기</Link>
          <Link to="/signup">회원가입</Link>
        </div>
        <button type="submit" onClick={handleLogic}>
          로그인
        </button>
      </form>
    </section>
  );
};

export default LoginForm;
