import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/boards">Все задачи</Link>
        <Link to="/issues">Проекты</Link>
      </nav>
    </header>
  );
};

export default Header;
