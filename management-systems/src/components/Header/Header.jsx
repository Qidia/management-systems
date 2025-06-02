import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "antd";
import TaskModal from "../TaskModal/TaskModal";
import { useTaskContext } from "../TaskContext";

// Компонент верхнего меню с навигацией и кнопкой создания задачи
const Header = () => {
  const { addTask, projects } = useTaskContext();
  // Состояние открытия модального окна создания задачи
  const [modalOpen, setModalOpen] = useState(false);

  const handleSave = (task) => {
    addTask(task);
    setModalOpen(false);
  };

  return (
    <header>
      {/* Навигация по приложению */}
      <nav>
        <Link to="/issues">Все задачи</Link>
        <Link to="/boards">Проекты</Link>
      </nav>

      {/* Кнопка открытия модального окна создания задачи */}
      <Button type="primary" onClick={() => setModalOpen(true)}>
        Создать задачу
      </Button>

      {/* Модальное окно для создания или редактирования задачи */}
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
