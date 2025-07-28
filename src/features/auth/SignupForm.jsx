import React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../utils/firebase";
import {doc, setDoc} from "firebase/firestore";
import {db} from "../../utils/firebase";

const SignupForm = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogic = async () => {
    if (!nickname || !email || !password) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    try {
      // 회원가입
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Firestore에 유저 정보 저장
      await setDoc(doc(db, "users", user.uid), {
        nickname,
        email,
        createdAt: new Date(),
      });

      alert("회원가입 성공");
      navigate("/login");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("이미 사용 중인 이메일입니다.");
      } else if (err.code === "auth/weak-password") {
        alert("비밀번호는 6자 이상이어야 합니다.");
      } else {
        alert("회원가입 실패: " + err.message);
      }
    }
  };
  return (
    <section className="signup-form form">
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="nickname" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
        <button type="submit" onClick={handleLogic}>
          회원가입
        </button>
      </form>
    </section>
  );
};

export default SignupForm;
