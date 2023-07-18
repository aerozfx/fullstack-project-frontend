import { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import axios from "axios"
import PlayerCard from "./PlayerCard"
import { UserContext } from "../../../../context/userContext";

const Players = ({search}) => {

  const [isCheckedByName, setIsCheckedByName] = useState(false)
  const [isCheckedByCostDesc, setIsCheckedByCostDesc] = useState(false)
  const [isCheckedByCostAsc, setIsCheckedByCostAsc] = useState(false)
  const [isCheckedByPos, setIsCheckedByPos] = useState(false)
  
  const {initialPlayersContext} = useContext(UserContext)
  const [filteredPlayers, setFilteredPlayers] = useState([])
  // Crea el estado inicial de los jugadores, o de la búsqueda
  useEffect(() => {
    if (search === "") setFilteredPlayers([])
    let filteredPlayers = [...initialPlayersContext].filter(ele => {
      let regex = new RegExp(search, "gi")
      return ele.link.match(regex)})
    setFilteredPlayers([...filteredPlayers])
  }, [search])

  const filteredPlayersByName = 
    isCheckedByName 
    ? 
      [...initialPlayersContext].sort((a, b) => {
        let firstFullName = a.firstName + " " + a.surname
        let secondFullName = b.firstName + " " + b.surname
        return firstFullName.localeCompare(secondFullName)
      }) 
    : initialPlayersContext

  const filteredPlayersByCostDesc =
    isCheckedByCostDesc ?
      [...initialPlayersContext].sort((a,b) => a.price - b.price) 
    :
      initialPlayersContext
  
  const filteredPlayersByCostAsc = 
    isCheckedByCostAsc ?
      [...initialPlayersContext].sort((a,b) => b.price - a.price) 
    : 
      initialPlayersContext

  const filteredPlayersByPosition =
      isCheckedByPos ?
        [...initialPlayersContext].sort((a, b) => a["datos-personales"]["posición-juego"].localeCompare(b["datos-personales"]["posición-juego"]))
      : 
        initialPlayersContext

  const handleSortByName = () => setIsCheckedByName(!isCheckedByName)
  const handleSortByCostDesc = () => setIsCheckedByCostDesc(!isCheckedByCostDesc)
  const handleSortByCostAsc = () => setIsCheckedByCostAsc(!isCheckedByCostAsc)
  const handleFilterByPos = () => setIsCheckedByPos(!isCheckedByPos)

  return (
    <>
      <section className="filters">
        <p>Filtros</p>
        <label htmlFor="name">
          <span>Ordenar alfabéticamente</span>
          <input type="checkbox" name="name" onChange={handleSortByName}/>
        </label>
        <label htmlFor="cost">
          <span>Ordenar por precio</span>
          <input type="checkbox" name="cost" onChange={handleSortByCostDesc}/>
          <input type="checkbox" name="cost" onChange={handleSortByCostAsc}/>
        </label>
        <label htmlFor="pos">
          <span>Ordenar por posición</span>
          <input type="checkbox" name="pos" onChange={handleFilterByPos}/>
        </label>
      </section>
      <section className="players-filter">
        {
          isCheckedByName ?
            filteredPlayersByName.length ? filteredPlayersByName.map((ele) => <PlayerCard key={v4()} player={ele} isBuyable={true}/>) 
            : <p>Buscando jugadores</p>
          :
          isCheckedByCostDesc ?
            filteredPlayersByCostDesc.length ? filteredPlayersByCostDesc.map((ele) => <PlayerCard key={v4()} player={ele} isBuyable={true}/>) 
            : <p>Buscando jugadores</p>
          :
          isCheckedByCostAsc ? 
            filteredPlayersByCostAsc.length ? filteredPlayersByCostAsc.map((ele) => <PlayerCard key={v4()} player={ele} isBuyable={true}/>)
            : <p>Buscando jugadores</p>
          :
          isCheckedByPos ?
            filteredPlayersByPosition.length ? filteredPlayersByPosition.map((ele) => <PlayerCard key={v4()} player={ele} isBuyable={true}/>)
            : <p>Buscando jugadores</p> 
          :
            (search != "") ?
              filteredPlayers.length ? filteredPlayers.map(ele => <PlayerCard key={v4()} player={ele} isBuyable={true}/>)
              : <p>No hay jugadores que coincidan con la búsqueda</p> 
            :
            initialPlayersContext.map(ele => <PlayerCard key={v4()} player={ele} isBuyable={true}/>)
        }

      </section>
    </>
  );
};

export default Players;
