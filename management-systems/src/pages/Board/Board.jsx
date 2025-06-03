import { useParams } from "react-router-dom";
import GroupedTasks from "../../components/GroupedTasks/GroupedTasks";
import { useTaskContext } from "../../components/TaskContext/TaskContext";
import styles from "./Board.module.css";

const Board = () => {
  // Получаем параметр id из URL
  const { id } = useParams();
  const boardId = Number(id);

  // Получаем задачи, привязанные к данной доске
  const { tasks } = useTaskContext();

  // Название доски берем из первой задачи, если она есть, иначе — "Неизвестный проект"
  const filteredTasks = tasks.filter((task) => task.boardId === boardId);
  const name = filteredTasks[0]?.boardName || "Неизвестный проект";

  return (
    <div className={styles.board}>
      <h1 className={styles.title}>{name}</h1>
      {/* Отображаем задачи, сгруппированные по статусу */}
      <GroupedTasks tasks={filteredTasks} />
    </div>
  );
};

export default Board;
