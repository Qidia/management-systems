import { useParams } from "react-router-dom";
import { getTasksByBoardId } from "../apiClient";
import GroupedTasks from "../components/GroupedTasks/GroupedTasks";

const Board = () => {
  const { id } = useParams();
  const boardId = Number(id);

  const tasks = getTasksByBoardId(boardId);
  const name = tasks[0]?.boardName || "Неизвестный проект";

  return (
    <div className="board">
      <h1>{name}</h1>
      <GroupedTasks tasks={tasks} />
    </div>
  );
};

export default Board;
