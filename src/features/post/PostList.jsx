import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {collection, onSnapshot, query, orderBy, where} from "firebase/firestore";
import {db} from "../../utils/firebase";
import {GoTriangleDown} from "react-icons/go";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  const allCategorys = ["all", "quote", "memo"];

  useEffect(() => {
    const q = selectedCategory !== "all" ? query(collection(db, "posts"), where("category", "==", selectedCategory), orderBy("createAt", sortOrder)) : query(collection(db, "posts"), orderBy("createAt", sortOrder));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postList);
    });

    return () => unsubscribe();
  }, [selectedCategory, sortOrder]);

  return (
    <>
      <div className="post-list-action">
        <div className="category">
          <GoTriangleDown />
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {allCategorys.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="sort">
          <button value="desc" onClick={(e) => setSortOrder(e.target.value)} className={sortOrder === "desc" ? "active" : ""}>
            최신순
          </button>
          <button value="asc" onClick={(e) => setSortOrder(e.target.value)} className={sortOrder === "asc" ? "active" : ""}>
            오래된순
          </button>
        </div>
      </div>

      <ul className="post-list">
        {posts.length === 0 && <p>게시글이 없습니다.</p>}
        {posts.map((post) => {
          let date = "날짜 없음";
          const time = post.createAt;

          if (time?.seconds != null && time?.nanoseconds != null) {
            const createAt = new Date(time.seconds * 1000 + time.nanoseconds / 1e6);
            date = createAt.toISOString().split("T")[0];
          }

          return (
            <li key={post.id} className="post-card" onClick={() => navigate(`/post/${post.id}`)}>
              <h3>{post.title}</h3>
              <span>{date}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default PostList;
