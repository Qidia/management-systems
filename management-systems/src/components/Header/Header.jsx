import { Link } from "react-router-dom";
import { Button } from "antd";

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/issues">Все задачи</Link>
        <Link to="/boards">Проекты</Link>
      </nav>

      <Button type="primary">Создать задачу</Button>
    </header>
  );
};

export default Header;
