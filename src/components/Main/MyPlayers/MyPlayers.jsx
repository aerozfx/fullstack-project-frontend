import React, {useState, useEffect} from "react"
import axios from "axios";
import PlayerCard from "../SearchPlayers/Players/PlayerCard"
const MyPlayers = () => {
  const [userPlayers, setUserPlayers] = useState([])
  useEffect(() => {
    const getUserPlayers = async () => {
      let data = await axios.get(`/api/buy`)
      let {data:res} = data
      if(res?.error){
        setUserPlayers([])
        return
      }
      let {message} = data.data
      setUserPlayers([...message])
    }
    getUserPlayers()
  }, [])
  return (
    <section className="my-players">
      <h2 className="title">Jugadores adquiridos</h2>
      <section className="my-players-section">
      {userPlayers.length ? userPlayers.map((player, i) => <PlayerCard key={i} player={player} isBuyable={false}/> ) : "No hay jugadores"}
      </section>
    </section>
  );
};

export default MyPlayers;
