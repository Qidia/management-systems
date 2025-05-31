import { data } from "../data";
import { Button, List } from "antd";

const Issues = () => {
  return (
    <>
      <List
        itemLayout="horizontal"
        size="large"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Button>{item.title}</Button>
          </List.Item>
        )}
      />

      <Button type="primary">Создать задачу</Button>
    </>
  );
};

export default Issues;
