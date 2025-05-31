import { Button, List } from "antd";
import { useState, useEffect } from "react";
import TaskModal from "../components/TaskModal/TaskModal";
import TaskSearch from "../components/TaskSearch/TaskSearch";
import { getAllTasks, getAllProjects } from "../apiClient";

const Issues = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [projects, setProjects] = useState([]);

  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchParams, setSearchParams] = useState("");

  useEffect(() => {
    const loadedTasks = getAllTasks();
    setTasks(loadedTasks);

    setProjects(getAllProjects());
  }, []);

  useEffect(() => {
    const lowerQuery = searchParams.toLowerCase();
    const result = tasks.filter((task) => {
      const matchTitle = task.title.toLowerCase().includes(lowerQuery);
      const matchAssignee = task.assignee?.fullName
        .toLowerCase()
        .includes(lowerQuery);
      return matchTitle || matchAssignee;
    });

    setFilteredTasks(result);
  }, [searchParams, tasks]);

  const handleSave = (updatedTask) => {
    console.log("Сохранена задача:", updatedTask);
  };

  return (
    <>
      <TaskSearch onSearch={setSearchParams} />

      <List
        itemLayout="horizontal"
        size="large"
        dataSource={filteredTasks}
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
