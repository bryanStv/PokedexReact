import './Home.css'
import Card from '../../components/ui/Card/Card';
//import Form from '../../components/ui/Form/Form';

export const Home = () => {
    return (
      <div className="card-container">
        {/*<Form nombre="Pepito" email="a@a.com" />*/}
        <Card
          nombre="Pikachu"
          descripcion="La máscota de Pokemon"
          buttonText="Ver Detalles"
          imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
          url="#"
        />
        <Card
          nombre="Bulbasaur"
          descripcion="La máscota de Pokemon"
          buttonText="Ver Detalles"
          imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
          url="#"
        />
        <Card
          nombre="Charmander"
          descripcion="La máscota de Pokemon"
          buttonText="Ver Detalles"
          imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
          url="#"
        />
        <Card
          nombre="Squirtle"
          descripcion="La máscota de Pokemon"
          buttonText="Ver Detalles"
          imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
          url="#"
        />
      </div>
    );
}
