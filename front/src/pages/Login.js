import "../styles/login.css";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../states/user";

export default function LoginForm() {
  const nameRef = useRef();
  const passRef = useRef();
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    const user = {
      username: nameRef.current.value,
      password1: passRef.current.value,
    };

    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.user) {
          dispatch(userActions.addUser(response.user));
          localStorage.setItem("token", response.userToken);
          navigate("/profile");
        } else {
          setErrorMsg(response.message);
        }
      });
  };

  return (
    <div className="login-main">
      <div className="login-form-wrapper">
        <div className="login-heading">Login</div>
        <div className="login-error">{errorMsg}</div>
        <input
          type="text"
          placeholder="Username"
          ref={nameRef}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          ref={passRef}
          className="input-field"
        />
        <button onClick={handleLogin}>Sign in</button>
        <div onClick={() => navigate("/")} className="create-account-link">
          Create an account
        </div>
      </div>
    </div>
  );
}
