import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../states/user";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

export default function Profile() {
  const user = useSelector((store) => store.user.user);
  const avatar = useRef();
  const password = useRef();
  const username = useRef();
  const dispatch = useDispatch();
  const [getError, setError] = useState("");
  const navigate = useNavigate();

  const changeAvatar = () => {
    const data = { avatar: avatar.current.value };

    fetch("http://localhost:4000/avatarUpdate", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.message === "ok") {
          setError("avatar changed");
          dispatch(userActions.addUser(response.user));
        }
        avatar.current.value = "";
      });
  };

  const changePassword = () => {
    const data = { password: password.current.value };

    fetch("http://localhost:4000/passwordUpdate", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.message === "ok") {
          setError("password changed");
        }
      });
    password.current.value = "";
  };

  const changeUsername = () => {
    const data = {
      username2: username.current.value,
    };

    fetch("http://localhost:4000/usernameUpdate", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.message === "ok") {
          setError("username changed");
          localStorage.setItem("token", response.token);
          dispatch(userActions.addUser(response.user));
        } else {
          setError(response.message);
        }
      });
    username.current.value = "";
  };

  useEffect(() => {
    const checkToken = localStorage.getItem("token");
    if (!checkToken) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/getUserData", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(),
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(userActions.addUser(response.user));
      });
  }, []);

  return (
    <div className="profilePage">
      <div className="profileMain">
        <div className="userInformation">
          <img src={user?.avatar} alt="" className="userImage" />
          <div className="profileUsername">{user?.username}</div>
        </div>
        <div>
          <div>
            <input type="text" placeholder="Change Username" ref={username} />
            <button onClick={changeUsername}>save</button>
          </div>
          <div>
            <input
              type="password"
              placeholder="Change password"
              ref={password}
            />
            <button onClick={changePassword}>save</button>
          </div>
          <div>
            <input type="text" placeholder="Change avatar" ref={avatar} />
            <button onClick={changeAvatar}>save</button>
          </div>
          <div className="loginError">{getError}</div>
        </div>
      </div>
    </div>
  );
}
