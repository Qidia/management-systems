import { Input, Space } from "antd";
import { useEffect, useState } from "react";

const TaskSearch = ({ onSearch }) => {
  const [searchParams, setQuery] = useState("");

  useEffect(() => {
    onSearch(searchParams);
  }, [searchParams]);

  return (
    <Space direction="vertical">
      <Input
        placeholder="Поиск по названию или исполнителю"
        value={searchParams}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: 300 }}
      />
    </Space>
  );
};

export default TaskSearch;