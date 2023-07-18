import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {FcCurrencyExchange} from "react-icons/fc"
import { RiLogoutBoxRLine } from "react-icons/ri"
import axios from "axios";
import { UserContext } from "../../../context/userContext";

const UserOptions = () => {
  const {updateUserId, userData} = useContext(UserContext)

  const navigate = useNavigate()

  const handleClick= async () => {
    await axios.post("/api/logout")
    updateUserId(null)
    navigate("/")
  }
  return (
    <article className="user-options">
      <p className="user-name">Hola, {userData.name}</p>
      <p className="user-currency">
        <FcCurrencyExchange />
        {userData["user_currency"]}
      </p>
      <button onClick={handleClick} className="button logout"><RiLogoutBoxRLine /></button>
    </article>
  );
};

export default UserOptions;
