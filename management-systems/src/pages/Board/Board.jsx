import { useParams } from "react-router-dom";
import GroupedTasks from "../../components/GroupedTasks/GroupedTasks";
import { useTaskContext } from "../../components/TaskContext/TaskContext";
import styles from "./Board.module.css";

const Board = () => {
  // Получаем параметр id из URL
  const { id } = useParams();
  const boardId = Number(id);

  // Извлекаем все задачи из контекста
  const { tasks } = useTaskContext();

  // Фильтруем задачи, относящиеся к текущей доске
  const filteredTasks = tasks.filter((task) => task.boardId === boardId);
  // Название доски берём из первой задачи, если она есть
  const name = filteredTasks[0]?.boardName || "Неизвестный проект";

  return (
    <div className={styles.board}>
      {/* Заголовок с названием доски */}
      <h1 className={styles.title}>{name}</h1>

      {/* Отображаем задачи, сгруппированные по статусу */}
      <GroupedTasks tasks={filteredTasks} />
    </div>
  );
};

export default Board;
