import { List } from "antd";
import { Link } from "react-router-dom";
import { getAllProjects } from "../../apiClient";
import { useEffect, useState } from "react";
import styles from "./Boards.module.css";

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
    <div className={styles.container}>
      <List
        itemLayout="horizontal"
        size="large"
        dataSource={boards}
        renderItem={(board) => (
          <List.Item className={styles.item} key={board.id}>
            <span className={styles.name}>{board.name}</span>
            <Link className={styles.link} to={`/boards/${board.id}`}>
              Перейти к доске
            </Link>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Boards;
