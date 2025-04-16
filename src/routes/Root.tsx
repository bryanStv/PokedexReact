import { Outlet } from "react-router-dom";
import Header from "../pages/fixed/header/Header";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
