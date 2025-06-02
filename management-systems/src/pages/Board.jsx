import { useParams } from "react-router-dom";
//import { getTasksByBoardId } from "../apiClient";
import GroupedTasks from "../components/GroupedTasks/GroupedTasks";
import { useTaskContext } from "../components/TaskContext";

const Board = () => {
  // Получаем параметр id из URL
  const { id } = useParams();
  const boardId = Number(id);

  // Получаем задачи, привязанные к данной доске
  //const tasks = getTasksByBoardId(boardId);
  const { tasks } = useTaskContext();

  // Название доски берем из первой задачи, если она есть, иначе — "Неизвестный проект"
  const filteredTasks = tasks.filter((task) => task.boardId === boardId);
  //const name = tasks[0]?.boardName || "Неизвестный проект";
  const name = filteredTasks[0]?.boardName || "Неизвестный проект";

  return (
    <div className="board">
      <h1>{name}</h1>
      {/* Отображаем задачи, сгруппированные по статусу */}
      {/* <GroupedTasks tasks={tasks} /> */}
      <GroupedTasks tasks={filteredTasks} />
    </div>
  );
};

export default Board;
