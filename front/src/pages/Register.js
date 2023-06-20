import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/registration.css";

export default function RegistrationForm() {
  const usernameRef = useRef();
  const password1Ref = useRef();
  const password2Ref = useRef();
  const avatarRef = useRef();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegistration = () => {
    const registration = {
      username: usernameRef.current.value,
      password1: password1Ref.current.value,
      password2: password2Ref.current.value,
      avatar: avatarRef.current.value,
    };

    fetch("http://localhost:4000/registration", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(registration),
    })
      .then((response) => response.json())
      .then((response) => {
        setErrorMessage(response.message);
        if (response.message === "") {
          navigate("/login");
        }
      });
  };

  return (
    <div className="registration-main">
      <div className="registration">
        <div className="login-heading">Register</div>
        <div className="error">{errorMessage}</div>
        <input type="text" placeholder="Username" ref={usernameRef} />
        <input type="password" placeholder="Password" ref={password1Ref} />
        <input
          type="password"
          placeholder="Confirm Password"
          ref={password2Ref}
        />
        <input type="text" placeholder="Profile picture" ref={avatarRef} />
        <button onClick={handleRegistration}>Register</button>
        <div onClick={() => navigate("/login")} className="login-link">
          Login
        </div>
      </div>
    </div>
  );
}
