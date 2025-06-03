import { List } from "antd";
import { Link } from "react-router-dom";
import { getAllProjects } from "../../apiClient";
import { useEffect, useState } from "react";
import styles from "./Boards.module.css";

// Компонент Boards отображает страницу со списком всех проектов(досок). Из страницы можно перейти на страницу выбранного проекта
const Boards = () => {
  // Локальное состояние для хранения списка досок
  const [boards, setBoards] = useState([]);

  // При монтировании компонента запрашиваем проекты с сервера
  useEffect(() => {
    const fetchBoards = async () => {
      const data = await getAllProjects();
      setBoards(data); // Обновляем состояние
    };
    fetchBoards();
  }, []);

  return (
    <div className={styles.container}>
      {/* Отображаем список досок */}
      <List
        itemLayout="horizontal"
        size="large"
        dataSource={boards}
        renderItem={(board) => (
          <List.Item className={styles.item} key={board.id}>
            {/* Название доски */}
            <span className={styles.name}>{board.name}</span>

            {/* Ссылка на страницу конкретной доски */}
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
