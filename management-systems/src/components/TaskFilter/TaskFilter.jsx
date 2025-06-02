import { Select, Space } from "antd";
import { useEffect, useState } from "react";
import { getAllProjects, getAllStatuses } from "../../apiClient";

const { Option } = Select;

// Компонент фильтра задач по статусу и проекту (доске)
const TaskFilter = ({ onFilter }) => {
  // Состояния выбранных фильтров
  const [status, setStatus] = useState("");
  const [boardId, setBoardId] = useState("");

  // Списки доступных статусов и проектов для выбора
  const [statuses, setStatuses] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      const statusesData = await getAllStatuses();
      const projectsData = await getAllProjects();
      setStatuses(statusesData);
      setProjects(projectsData);
    };
    fetchFilters();
  }, []);

  // При изменении фильтров вызываем колбек для передачи выбранных значений
  useEffect(() => {
    onFilter({ status, boardId });
  }, [status, boardId]);

  return (
    <Space direction="horizontal">
      {/* Фильтр по статусу */}
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

      {/* Фильтр по проекту */}
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
