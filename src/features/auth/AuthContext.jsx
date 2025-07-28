import React from "react";
import {createContext, useContext, useEffect, useState} from "react";
import {auth} from "../../utils/firebase";
import {onAuthStateChanged} from "firebase/auth";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../utils/firebase";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Firestore에서 닉네임 조회
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setNickname(userDoc.data().nickname);
        }
        setUser(currentUser);
      } else {
        setUser(null);
        setNickname("");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{user, nickname}}>{!loading && children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
