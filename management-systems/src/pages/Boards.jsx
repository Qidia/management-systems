import { List } from "antd";
import { Link } from "react-router-dom";
import { getAllProjects } from "../apiClient";

const Boards = () => {
  const boards = getAllProjects();

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
