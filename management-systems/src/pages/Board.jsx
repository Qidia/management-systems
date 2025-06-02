import { useParams } from "react-router-dom";
import { getTasksByBoardId } from "../apiClient";
import GroupedTasks from "../components/GroupedTasks/GroupedTasks";

const Board = () => {
  // Получаем параметр id из URL
  const { id } = useParams();
  const boardId = Number(id);

  // Получаем задачи, привязанные к данной доске
  const tasks = getTasksByBoardId(boardId);

  // Название доски берем из первой задачи, если она есть, иначе — "Неизвестный проект"
  const name = tasks[0]?.boardName || "Неизвестный проект";

  return (
    <div className="board">
      <h1>{name}</h1>
      {/* Отображаем задачи, сгруппированные по статусу */}
      <GroupedTasks tasks={tasks} />
    </div>
  );
};

export default Board;
