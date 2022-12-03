import React, { useContext, useState } from "react";
import Image from "../img/kurumi.jpg";
import {
  collection,
  getDoc,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const currentUser = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        console.log(user);
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  // console.log(user)

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.currentUser.uid > user.uid
        ? currentUser.currentUser.uid + user.uid
        : user.uid + currentUser.currentUser.uid;
        // console.log(currentUser.currentUser.uid)
        // console.log(user.uid)
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        // create a chat in chats collection
        console.log("abc");
        await setDoc(doc(db, "chats", combinedId), { message: [] });
        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.currentUser.uid,
            displayName: currentUser.currentUser.displayName,
            photoURL: currentUser.currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
      console.log("bcd")
    }
    setUser(null)
    setUsername("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        {err && <span>User not found</span>}
        {user && (
          <div className="userChat" onClick={handleSelect}>
            <img src={user.photoURL} alt="" />
            <div className="userChatInfo">
              <span>{user.displayName}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
