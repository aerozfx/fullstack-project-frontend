import { Routes, Route } from "react-router-dom";
import SearchPlayers from "./SearchPlayers";
import MyPlayers from "./MyPlayers"
import Home from "./Home"
import Login from "./Login"
import Register from "./Register"
const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/players" element={<SearchPlayers />}/>
        <Route path="/my-players" element={<MyPlayers/>}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </main>
  )
};

export default Main;
