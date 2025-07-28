import React, {useEffect} from "react";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {collection, addDoc, serverTimestamp} from "firebase/firestore";
import {db} from "../utils/firebase";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {useAuthContext} from "../features/auth/AuthContext";
import {GoTriangleDown} from "react-icons/go";

const Write = ({isEdit}) => {
  const {postId} = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const {user, nickname} = useAuthContext();

  useEffect(() => {
    if (!isEdit) return;
    const fetchPost = async () => {
      const docRef = doc(db, "posts", postId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCategory(data.category);
        setTitle(data.title);
        setContent(data.content);
        setTags(data.tags.join(","));
      } else {
        alert("글이 존재하지 않습니다.");
        navigate("/");
      }
    };
    fetchPost();
  }, [isEdit, postId, navigate]);

  const getTitle = (e) => {
    const titleValue = e.target.value;
    if (title.length > 79) {
      alert("80자 이하로 작성해주세요.");
    }
    setTitle(titleValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }
    if (!category || category === "default") {
      alert("카테고리를 선택해주세요.");
      return;
    }
    const tagList = tags
      .split(",") /* 쉼표로 구분한 태그를 짤름 */
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    try {
      if (isEdit) {
        // 수정
        const docRef = doc(db, "posts", postId);
        await updateDoc(docRef, {
          category,
          title,
          content,
          tags: tagList,
          author: nickname,
          uid: user.uid,
          createAt: serverTimestamp(),
        });
        alert("수정 완료!");
        navigate(`/post/${postId}`);
      } else {
        // 새 글
        const docRef = await addDoc(collection(db, "posts"), {
          category,
          title,
          content,
          tags: tagList,
          author: nickname,
          uid: user.uid,
          createAt: serverTimestamp(),
        });
        alert("게시되었습니다.");
        navigate(`/post/${docRef.id}`);
      }
    } catch (err) {
      console.log(err);
      alert("저장 실패: " + err.message);
    }
  };
  return (
    <section className="post-write">
      <form onSubmit={handleSubmit}>
        <div className="title">
          <div className="category">
            <GoTriangleDown />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="default">카테고리</option>
              <option value="quote">quote</option>
              <option value="memo">memo</option>
            </select>
          </div>
          <input className="title-input" type="text" value={title} onChange={getTitle} maxlength={80} placeholder="제목을 입력하세요." spellcheck="false" />
          <input className="tag-input" type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="태그를 쉼표로 구분해 입력" spellcheck="false" />
        </div>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용을 입력하세요." spellcheck="false" />
        <button type="submit">작성 완료</button>
      </form>
    </section>
  );
};

export default Write;
