import { data } from "../data";
import { Button, List } from "antd";
import { Link } from "react-router-dom";

const Boards = () => {
  const boardsMap = new Map();
  data.forEach((item) => {
    if (!boardsMap.has(item.boardId)) {
      boardsMap.set(item.boardId, item.boardName);
    }
  });

  const boards = Array.from(boardsMap.entries()).map(([id, name]) => ({
    id,
    name,
  }));

  return (
    <>
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
    </>
  );
};

export default Boards;
