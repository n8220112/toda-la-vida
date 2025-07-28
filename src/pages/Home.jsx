import React from "react";

const Home = () => {
  return (
    <section className="home-page">
      <div className="title">
        <h2>Buenos días ^^</h2>
      </div>
      <div className="post-body">
        <img style={style.img} src="https://i.pinimg.com/1200x/ba/64/ae/ba64aefbdd5ece824d1a68db316ece11.jpg" alt="홈 이미지" />
        <p style={style.text}>게시글 작성은 회원가입 및 로그인 후에 가능합니다.</p>
      </div>
    </section>
  );
};

const style = {
  text: {textAlign: "center"},
  img: {marginBottom: "10px"},
};

export default Home;
