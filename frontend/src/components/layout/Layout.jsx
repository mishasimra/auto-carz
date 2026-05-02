import { Outlet } from "react-router-dom";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";
import WhatsAppFloat from "./WhatsAppFloat.jsx";

const Layout = () => (
  <>
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
    <WhatsAppFloat />
  </>
);

export default Layout;
