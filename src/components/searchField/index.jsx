import React from "react";
import "./index.css";

export default function SearchField({ value = "", onChange = () => {} }) {
  return (
    <div className="searchField">
      <img src="/svgs/SearchIcon.svg" alt="Ícone de Pesquisa" />
      <input
        type="text"
        placeholder="Pesquise..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
