import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../src/assets/mindarticles-logo.png"

export function Header() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  return (
    <header>
      <div className="navBar">
        <nav>
          <ul className="navList">
            <li className="left">
              <FontAwesomeIcon onClick={handleMenu} icon={faBars} />
            </li>
            <li className="logo">
            <img src={logo} alt="mindarticles logo" className="mindarticles-logo" />
            </li>
            <li className="right">
              <Link to="/">
              <FontAwesomeIcon icon={faUser} />
              </Link>
         
            </li>
          </ul>
        </nav>
      </div>
      {isOpenMenu && (
        <div className="menu">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );

}