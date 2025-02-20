import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";

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
              <h1>LOGO</h1>
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
              <Link to="/categories">Topics</Link>
            </li>
            <li>
              <Link to="/users">User</Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );

}