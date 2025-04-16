import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import RootLayout from "./Root";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Pokedex from "../pages/pokedex/Pokedex";
import PokemonPage from "../pages/pokemon/Pokemon";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="pokedex" element={<Pokedex />} />
      <Route path="about" element={<About />} />
      <Route path="pokemon/:id" element={<PokemonPage />} />
    </Route>
  )
);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
