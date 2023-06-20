import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../states/user";
import "../styles/navigation.css";

export default function Navigation() {
  const reduxUser = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let user = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(userActions.deleteUser());
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      user = {};
    }
  }, [reduxUser]);

  return (
    user && (
      <div className="navigation">
        <Link to={"/profile"}>Profile</Link>
        <Link to={"/users"}>All Users</Link>
        <Link to={"/conversations"}>Conversations</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    )
  );
}
