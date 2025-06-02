import { List } from "antd";
import { Link } from "react-router-dom";
import { getAllProjects } from "../apiClient";
import { useEffect, useState } from "react";

// Компонент Boards отображает страницу со списком всех проектов(досок). Из страницы можно перейти на страницу выбранного проекта
const Boards = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      const data = await getAllProjects();
      setBoards(data);
    };
    fetchBoards();
  }, []);

  return (
    <List
      itemLayout="horizontal"
      size="large"
      dataSource={boards}
      renderItem={(board) => (
        <List.Item key={board.id}>
          <span>{board.name}</span>
          <Link to={`/boards/${board.id}`}>Перейти к доске</Link>
        </List.Item>
      )}
    />
  );
};

export default Boards;
