import "./Nav.css";
import { NavLink } from "react-router-dom";

const Nav = (props) => (
  <aside className="menu-area">
    <nav className="menu">
      <NavLink to="/" className="nav-link">
        <i className={`fa fa-${props.iconHome}`}></i> Início
      </NavLink>
      <NavLink to="/users" className="nav-link">
        <i className={`fa fa-${props.iconUsers}`}></i> Usuários
      </NavLink>
    </nav>
  </aside>
);

export { Nav };
