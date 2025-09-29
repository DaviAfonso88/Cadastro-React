import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import { BrowserRouter } from "react-router-dom";

import { RoutesLinks } from "./Routes";
import { Footer } from "../components/template/Footer";
import { Nav } from "../components/template/Nav";
import { Logo } from "../components/template/Logo";

const App = (props) => (
  <BrowserRouter>
    <div className="app">
      <Logo />
      <Nav iconHome="home" iconUsers="users" />
      <RoutesLinks />
      <Footer />
    </div>
  </BrowserRouter>
);

export { App };
