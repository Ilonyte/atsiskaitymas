import { Route, Routes, BrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import Conversations from "./pages/Conversations";
import Navigation from "./components/Navigation";
import SingleUser from "./pages/SingleUser";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user/:username" element={<SingleUser />} />
        <Route path="/users" element={<Users />} />
        <Route path="/conversations" element={<Conversations />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
