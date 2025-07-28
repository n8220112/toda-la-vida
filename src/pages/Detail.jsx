import React from "react";
import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {doc, getDoc, deleteDoc} from "firebase/firestore";

import {useAuthContext} from "../features/auth/AuthContext";
import {db} from "../utils/firebase";

const Detail = () => {
  const navigate = useNavigate();
  const {postId} = useParams();
  const [post, setPost] = useState(null);
  const {user} = useAuthContext();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "posts", postId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost(docSnap.data());
        } else {
          alert("존재하지 않는 게시글입니다.");
        }
      } catch (err) {
        console.error(err);
        alert("게시글을 불러오는 데 실패했습니다.");
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) return <p>불러오는 중...</p>;

  /* 날짜 변환 */
  const createAt = new Date(post.createAt.seconds * 1000 + post.createAt.nanoseconds / 1e6);
  const date = createAt.toISOString().split("T")[0];

  console.log(post);
  return (
    <section className="detail-page">
      <div className="title detail-title">
        <h2>{post.title}</h2>
        <div className="post-info">
          <span>{post.author}</span>
          <span>{date}</span>
          {post.tags && (
            <ul className="tags">
              {post.tags.map((tag, idx) => (
                <li key={idx}>#{tag}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="post-action">
          {user && user.uid === post.uid && (
            <>
              <button onClick={() => navigate(`/edit/${postId}`)} className="edit">
                수정
              </button>
              <button
                onClick={async () => {
                  const confirm = window.confirm("정말 삭제하시겠습니까?");
                  if (!confirm) return;
                  try {
                    await deleteDoc(doc(db, "posts", postId));
                    alert("삭제되었습니다.");
                    navigate("/");
                  } catch (err) {
                    console.error(err);
                    alert("삭제 실패: " + err.message);
                  }
                }}
              >
                삭제
              </button>
            </>
          )}
        </div>
      </div>
      <div className="post-body detail-body">
        <p>{post.content}</p>
      </div>
    </section>
  );
};

export default Detail;
