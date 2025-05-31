import { Button, List } from "antd";
import { useState, useEffect } from "react";
import TaskModal from "../components/TaskModal/TaskModal";
import { getAllTasks, getAllProjects } from "../apiClient";

const Issues = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [projects, setProjects] = useState([]);

  const tasks = getAllTasks(); // заменить на useEffect

  useEffect(() => {
    setProjects(getAllProjects());
  }, []);

  const handleSave = (updatedTask) => {
    console.log("Сохранена задача:", updatedTask);
  };

  return (
    <>
      <List
        itemLayout="horizontal"
        size="large"
        dataSource={tasks}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Button
              onClick={() => {
                setSelectedTask(item);
                setModalOpen(true);
              }}
            >
              {item.title}
            </Button>
          </List.Item>
        )}
      />

      <Button
        type="primary"
        onClick={() => {
          setSelectedTask(null);
          setModalOpen(true);
        }}
      >
        Создать задачу
      </Button>

      <TaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        task={selectedTask}
        projects={projects}
        readOnlyProject={false}
      />
    </>
  );
};

export default Issues;
