import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "antd";
import TaskModal from "../TaskModal/TaskModal";
import { getAllProjects } from "../../apiClient";

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(getAllProjects());
  }, []);

  const handleSave = (newTask) => {
    console.log("Сохранена задача:", newTask);
  };

  return (
    <header>
      <nav>
        <Link to="/issues">Все задачи</Link>
        <Link to="/boards">Проекты</Link>
      </nav>

      <Button type="primary" onClick={() => setModalOpen(true)}>
        Создать задачу
      </Button>

      <TaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        task={null}
        projects={projects}
        readOnlyProject={false}
      />
    </header>
  );
};

export default Header;
