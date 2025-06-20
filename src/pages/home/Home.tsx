import style from './Home.module.css';
import PokeClicker from '../../components/pokeclicker/PokeClicker';

const Home = () => {
  return (
    <>
      <div className={style.homePageContainer}>
        <PokeClicker />
      </div>
    </>
  );
};

export default Home;
