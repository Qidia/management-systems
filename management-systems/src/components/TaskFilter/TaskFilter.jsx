import { Select, Space } from "antd";
import { useEffect, useState } from "react";
import { getAllProjects, getAllStatuses } from "../../apiClient";
import styles from "./TaskFilter.module.css";

const { Option } = Select;

// Компонент фильтра задач по статусу и проекту (доске)
const TaskFilter = ({ onFilter }) => {
  // Состояния выбранных фильтров
  const [status, setStatus] = useState("");
  const [boardId, setBoardId] = useState("");

  // Списки доступных статусов и проектов для выбора
  const [statuses, setStatuses] = useState([]);
  const [projects, setProjects] = useState([]);

  // Загружаем статусы и проекты при монтировании компонента
  useEffect(() => {
    const fetchFilters = async () => {
      const statusesData = await getAllStatuses();
      const projectsData = await getAllProjects();
      setStatuses(statusesData);
      setProjects(projectsData);
    };
    fetchFilters();
  }, []);

  // При изменении фильтров вызываем переданный колбек onFilter с текущими значениями
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
        className={styles.selectInput}
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
        className={styles.selectInput}
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
