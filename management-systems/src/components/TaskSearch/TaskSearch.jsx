import { Input, Space } from "antd";
import { useEffect, useState } from "react";
import styles from "./TaskSearch.module.css";

const TaskSearch = ({ onSearch }) => {
  const [searchParams, setQuery] = useState("");

  // Вызываем onSearch при каждом изменении searchParams
  useEffect(() => {
    onSearch(searchParams);
  }, [searchParams, onSearch]);

  return (
    <Space direction="vertical">
      <Input
        placeholder="Поиск по названию или исполнителю"
        value={searchParams}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.searchInput}
      />
    </Space>
  );
};

export default TaskSearch;
