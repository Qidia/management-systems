import { Select, Space } from "antd";
import { useEffect, useState } from "react";
import { getAllProjects, getAllStatuses } from "../../apiClient";

const { Option } = Select;

const TaskFilter = ({ onFilter }) => {
  const [status, setStatus] = useState("");
  const [boardId, setBoardId] = useState("");
  const [statuses, setStatuses] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setStatuses(getAllStatuses());
    setProjects(getAllProjects());
  }, []);

  useEffect(() => {
    onFilter({ status, boardId });
  }, [status, boardId]);

  return (
    <Space direction="horizontal">
      <Select
        placeholder="Фильтр по статусу"
        allowClear
        value={status || undefined}
        onChange={setStatus}
        style={{ width: 300 }}
      >
        {statuses.map((s) => (
          <Option key={s} value={s}>
            {s}
          </Option>
        ))}
      </Select>
      <Select
        placeholder="Фильтр по доске"
        allowClear
        value={boardId || undefined}
        onChange={setBoardId}
        style={{ width: 300 }}
      >
        {projects.map((p) => (
          <Option key={p.id} value={p.id}>
            {p.name}
          </Option>
        ))}
      </Select>
    </Space>
  );
};

export default TaskFilter;
