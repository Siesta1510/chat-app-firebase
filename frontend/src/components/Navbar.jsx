import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import LogoutIcon from '@mui/icons-material/Logout';

function Navbar() {
  const currentUser = useContext(AuthContext);
  // console.log(currentUser);
  return (
    <div className="navbar">
      <span className="logo">Chats</span>
      <div className="user">
        <img src={currentUser.currentUser.photoURL} alt="" />
        <span>{currentUser.currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}><LogoutIcon/></button>
      </div>
    </div>
  );
}

export default Navbar;
