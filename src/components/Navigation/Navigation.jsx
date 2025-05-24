import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

const activeClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
    <div>
      <nav className={css.wrapper}>
        <NavLink to="/" className={activeClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={activeClass}>
          Movies
        </NavLink>
      </nav>
    </div>
  );
}
