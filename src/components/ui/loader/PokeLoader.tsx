import styles from "./PokeLoader.module.css";

const PokeLoader = () => {
  return (
    <div className={styles.loaderContainer}>
      <svg
        className={styles.pokeball}
        viewBox="0 0 100 100"
        width="100"
        height="100"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="#ffffff"
          stroke="#000"
          strokeWidth="5"
        />
        <path d="M5 50 H95" stroke="#000" strokeWidth="5" />
        <path d="M5 50 A45 45 0 0 1 95 50" fill="#e60012" />
        <circle
          cx="50"
          cy="50"
          r="15"
          fill="#ffffff"
          stroke="#000"
          strokeWidth="5"
        />
        <circle cx="50" cy="50" r="7" fill="#000000" />
      </svg>
      <p className={styles.text}>Cargando...</p>
    </div>
  );
};

export default PokeLoader;
