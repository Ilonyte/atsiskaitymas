import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/singleUser.css";

export default function UserProfile() {
  const [user, setUser] = useState({});
  const [sentMessage, setSentMessage] = useState(false);

  const inputRef = useRef();
  const params = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = {
      user: user.username,
      message: inputRef.current.value,
    };
    fetch("http://localhost:4000/sendMessage", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(message),
    }).then(() => {
      setSentMessage(true);
      inputRef.current.value = "";
    });
  };

  useEffect(() => {
    fetch("http://localhost:4000/singleUser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username: params.username }),
    })
      .then((response) => response.json())
      .then((response) => {
        setUser(response.user);
      });
  }, []);

  return (
    <div className="singleUserMain">
      <div className="singeLayout">
        <div className="userProfile">
          <img src={user.avatar} alt="" className="userProfile__image" />
          <h2 className="userProfile__name">{user.username}</h2>
        </div>
        {user.username && (
          <div className="messageForm">
            <form onSubmit={handleSubmit}>
              <label htmlFor="message">Send Message:</label>
              <input type="text" name="message" ref={inputRef} />
              <button type="submit">Send</button>
            </form>
            {sentMessage && <p>Message sent successfully!</p>}
          </div>
        )}
      </div>
    </div>
  );
}
