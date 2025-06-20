import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { useState } from 'react';
import { PokemonService } from '../../../services/PokemonService';

const Header = () => {
  const pokemonService = new PokemonService();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const navigate = useNavigate();

  const fetchPokemon = async () => {
    const response = await pokemonService.getPokemon(searchTerm);
    if (!response) return navigate(`/pokemon/0`);
    navigate(`/pokemon/${response.id}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.length >= 3) {
      const matches = pokemonService.getPokemonNamesFromJson(value);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (name: string) => {
    setSearchTerm(name);
    setSuggestions([]);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.links}>
          <Link to="/">Inicio</Link>
          <Link to="/pokedex">Pokedex</Link>
          <Link to="/about">About</Link>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchPokemon();
          }}
          className={styles.searchForm}
        >
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Buscar pokémon..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
            {suggestions.length > 0 && (
              <ul className={styles.suggestionsList}>
                {suggestions.map((name) => (
                  <li
                    key={name}
                    className={styles.suggestionItem}
                    onClick={() => handleSuggestionClick(name)}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            )}
            <button type="submit" className={styles.searchButton}>
              Buscar
            </button>
          </div>
        </form>
      </nav>
    </header>
  );
};

export default Header;
