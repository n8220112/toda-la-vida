
# 📝 My Diary Web App

React + Firebase 기반으로 구현된 **다이어리 & 메모 웹 앱**입니다.  
**회원 가입 후 자유롭게 글을 쓰고**, 태그와 카테고리로 정리하고, 필터링/정렬을 통해 손쉽게 열람할 수 있습니다.

---

## 🧩 프로젝트 개요

| 항목       | 내용                                                                 |
|----------|----------------------------------------------------------------------|
| 개발 목적  | 사용자 인증 기반 글 작성 및 열람 기능, 실시간 반영되는 메모 플랫폼 구현                  |
| 주요 기능  | 로그인/회원가입, 글 작성·수정·삭제, 태그 관리, 필터/정렬, 다크모드, 라우팅 가드 등 |
| 핵심 기술  | React, Firebase(Auth + Firestore), React Router, SCSS              |

---

## 🧭 라우팅 구조

| 경로             | 설명                          |
|----------------|-----------------------------|
| `/`            | 홈 / 전체 글 보기               |
| `/login`       | 로그인 페이지                   |
| `/signup`      | 회원가입 페이지                 |
| `/post/:id`    | 글 상세 페이지                  |
| `/write`       | 글 작성 (로그인 필요)           |
| `/edit/:id`    | 글 수정 (로그인 필요)           |
| `/myposts`     | 내가 쓴 글 목록 (로그인 필요)    |
| `*`            | 존재하지 않는 페이지 - NotFound |

---

## ✨ 주요 기능

### 🔐 사용자 인증 (Firebase Auth + Context API)
- 이메일/비밀번호 기반 로그인 & 회원가입
- Firestore에 사용자 닉네임 저장 및 불러오기
- `AuthContext`를 통한 로그인 상태 전역 관리

### 📄 게시글 작성 및 관리
- 글 작성, 수정, 삭제
- 카테고리: quote / memo
- 태그 입력 및 표시 (`쉼표` 구분)
- 정렬 기능: 최신순, 오래된순
- 실시간 데이터 반영 (`onSnapshot`)
- 작성자 본인에게만 수정/삭제 버튼 노출

### 🌙 다크모드 지원
- 버튼 클릭 시 `light` ↔ `dark` 전환
- localStorage를 통한 테마 유지

### 🧭 라우팅 보호 (Protected Routes)
- `RequireAuth` 컴포넌트로 로그인하지 않은 유저 차단
- 글쓰기/수정 진입 시 로그인 여부 체크

---

## 🗂️ 폴더 구조 요약

```bash
src/
├── App.js                # 라우팅 설정
├── index.js              # AuthProvider + Router 설정
├── layouts/
│   └── Layout.jsx        # 공통 레이아웃: 사이드 메뉴 + 메인 + 플로팅 버튼
├── components/           # 재사용 가능한 UI 요소들
│   ├── DarkModeToggle.jsx
│   ├── WriteNewPost.jsx
│   ├── GoToLogin.jsx / GoToHome.jsx
│   └── ...
├── features/
│   ├── auth/
│   │   ├── AuthContext.jsx
│   │   ├── LoginForm.jsx
│   │   └── SignupForm.jsx
│   └── post/
│       └── PostList.jsx
├── pages/                # 라우팅되는 실제 페이지 컴포넌트
│   ├── Home.jsx
│   ├── Detail.jsx
│   ├── Login.jsx / Signup.jsx
│   ├── Write.jsx
│   ├── MyPosts.jsx
│   └── NotFound.jsx
├── utils/
│   └── firebase.js       # Firebase 초기화
└── styles/
    ├── reset.scss        # 초기화
    ├── variables.scss    # 색상/폰트 변수
    └── style.scss        # 전체 스타일
```

---

## 🧼 기타 참고 사항

- Firestore의 Timestamp는 `YYYY-MM-DD` 포맷으로 출력
- 글 제목은 80자 제한, 태그는 쉼표로 분리
- 작성 시 유효성 검사 포함 (제목/내용/카테고리 누락 시 경고)
- 작성/수정 완료 후 상세 페이지로 자동 이동

