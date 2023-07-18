import debounce from "just-debounce-it";
import { useEffect, useState } from "react";
import {FaSearch} from "react-icons/fa";
const Search = ({updateSearch}) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    let query = e.target.jugador.value;
    query = query.replace(/ /gi, "-")
    updateSearch(query)
    e.target.jugador.value = ""
  }

  const handleDebounce = debounce(updateSearch, 1000)

  const handleInput = (e) => {
    let query = e.target.value;
    query = query.replace(/ /gi, "-")
    handleDebounce(query)
  }
  
  return (
    <>
      <form onSubmit={handleSubmit} className="search-form">
        <input type="text" name="jugador" onInput={handleInput} placeholder="Busca un jugador..."/>
        <button><FaSearch /></button>
      </form>
    </>
  )
};

export default Search;
