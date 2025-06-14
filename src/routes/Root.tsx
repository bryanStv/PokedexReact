import { Outlet } from "react-router-dom";
import Header from "../pages/fixed/header/Header";
import Footer from "../pages/fixed/footer/Footer";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
