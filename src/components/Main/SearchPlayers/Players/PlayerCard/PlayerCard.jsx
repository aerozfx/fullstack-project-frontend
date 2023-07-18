import Swal from "sweetalert2";
import axios from "axios";
import { useContext, useState } from "react";
import {UserContext} from "../../../../../context/userContext"
import { useNavigate } from "react-router-dom";

const PlayerCard = ({player, isBuyable}) => {
  const navigate = useNavigate()
  const {isLogged, updateCurrency} = useContext(UserContext)
  const [isActive, setIsActive] = useState(false)
  const  handleClick = async () => {
    let {link} = player
    if(isLogged){
      Swal.fire({
        title: `¿Quieres comprar a este jugador por ${player.price} monedas?`,
        html: 
        `<p>${player.firstName} ${player.surname}</p>
        <img src=${player.image} />`,
        showDenyButton: true,
        showCloseButton: true,
        confirmButtonText: 'Sí!',
        denyButtonText: 'Me lo voy a pensar...',
        customClass: {
          actions: 'my-actions',
          cancelButton: 'order-1 right-gap',
          confirmButton: 'order-2',
          denyButton: 'order-3',
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          try{
            const result = await axios.post("/api/buy", {link})
            updateCurrency(result["user_currency"])
            Swal.fire({
              title: `Has adquirido a ${player.firstName} ${player.surname}`,
              html: `<img src=${player.image} />
              <p>Puedes ver tus jugadores en la sección <bold>Mis jugadores</bold></p>`,
              icon: "success"
            })
            navigate("/my-players")
          }catch(err){
            Swal.fire({
              title: err.response.data.message,
              text: err.response.data.error,
              icon: "error",
            })
          }
        }
      })
    } else {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Debes iniciar sesión!",
        timer: 3000
      })
    }
  }

  const handleActivePlayer =async () => {
    setIsActive(!isActive)
    console.log("Has activado este jugador")
  }
  return (
    <>
    <article className={isActive ? "player-card active" : "player-card"}>
      <article className="player-info">
        <article className="player-data">
          <p>{player.firstName}</p>
          <p>{player.surname}</p>
        </article>
        <article className="player-position">
          <p>{player["datos-personales"]["posición-juego"]}</p>
        </article>
      </article>
      <img src={player.image} alt={`${player.firstName} ${player.surname}`}/>
      {
      isBuyable ?
        <button onClick={handleClick}>Comprar jugador {player.price}</button>
      : 
        <button onClick={handleActivePlayer}>Activar jugador</button>
      }
    </article> 
    </>
  );
};

export default PlayerCard;
