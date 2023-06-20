import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/users.css";
import { useDispatch, useSelector } from "react-redux";
import { usersActions } from "../states/users";

export default function Users() {
  const mainUser = useSelector((store) => store.user.user);
  const users = useSelector((store) => store.users.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUserDetails = (name) => {
    navigate(`/user/${name}`);
  };

  useEffect(() => {
    fetch("http://localhost:4000/getUsers")
      .then((response) => response.json())
      .then((response) => {
        dispatch(usersActions.addUsers(response.users));
      });
  }, []);

  useEffect(() => {
    const checkToken = localStorage.getItem("token");
    if (!checkToken) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="users-container">
      {users.map(
        (user) =>
          user.username !== mainUser.username && (
            <div
              className="user-card"
              key={user.username}
              onClick={() => getUserDetails(user.username)}
            >
              <img className="user-img" src={user.avatar} alt={user.username} />
              <div className="user-name">{user.username}</div>
            </div>
          )
      )}
    </div>
  );
}
