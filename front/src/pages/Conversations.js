import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../states/user";
import "../styles/conversations.css";

export default function Conversations() {
  const user = useSelector((store) => store.user.user);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (user) => {
    fetch("http://localhost:4000/deleteMessage", {
      method: "post",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ user: user }),
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(userActions.addUser(response.user));
      });
  };

  useEffect(() => {
    const users = [];
    if (user.messages) {
      user?.messages?.forEach((message) => {
        users.push(message.from);
      });
      let filteredUsers = [...new Set(users)];
      setUsers(filteredUsers);
      setSelectedUser(filteredUsers[0]);
    }
  }, [user]);

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

  useEffect(() => {
    if (user.messages?.length > 0) {
      const userMessages = user.messages.filter(
        (message) => message.from === selectedUser
      );

      setMessages(userMessages);
    } else {
      setMessages([]);
    }
  }, [selectedUser, user]);

  return (
    <div className="conversations-container">
      <div className="conversations-main">
        <div className="users-list">
          {users?.map((user, index) => (
            <div
              className="user-item"
              key={index}
              onClick={() => {
                setSelectedUser(user);
              }}
            >
              {user}
              <button
                onClick={() => {
                  handleDelete(user);
                }}
              >
                X
              </button>
            </div>
          ))}
        </div>
        <div className="messages-list">
          {messages?.map((message, index) => (
            <div className="message-item" key={index}>
              <div>{message.time}</div>
              <div>{message.message}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
