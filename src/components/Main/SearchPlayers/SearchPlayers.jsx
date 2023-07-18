import { useState } from "react";
import Search from "./Search";
import Players from "./Players";

const SearchPlayers = () => {
  const [search, setSearch ] = useState("")
  const updateSearch = (newQuery) => setSearch(newQuery)
  return (
    <section className="search-players">
      <Search updateSearch={updateSearch}/>
      <Players search={search}/>
    </section>
  );
};

export default SearchPlayers;
