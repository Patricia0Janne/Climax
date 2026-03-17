import { useState } from "react";
import "./styles.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
    setQuery("");
  };

  return (
    <form className="form-search" onSubmit={handleSearch}>
      <label className="search-bar">
        <input
          type="text"
          placeholder="Digite a cidade"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">
          <img src="./search.svg" alt="ícone de busca" />
        </button>
      </label>
    </form>
  );
};

export default SearchBar;
