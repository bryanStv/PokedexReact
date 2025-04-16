import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useState } from "react";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.links}>
          <Link to="/">Inicio</Link>
          <Link to="/pokedex">Pokedex</Link>
          <Link to="/about">About</Link>
        </div>
        <input
          type="text"
          placeholder="Buscar pokémon..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
      </nav>
    </header>
  );
};

export default Header;
