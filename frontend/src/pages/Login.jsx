import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Add from "../img/kurumi.jpg";
import { auth } from "../firebase";

function Login() {
  const [err, setEff] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    console.log(email);

    try {
      // Signed in
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      // ...
      setEff(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <span className="logo"></span>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Login</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You don't have a account ?<Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
