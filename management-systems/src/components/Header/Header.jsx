import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "antd";
import TaskModal from "../TaskModal/TaskModal";
import { getAllProjects } from "../../apiClient";

// Компонент верхнего меню с навигацией и кнопкой создания задачи
const Header = () => {
  // Состояние открытия модального окна создания задачи
  const [modalOpen, setModalOpen] = useState(false);
  // Список проектов для выбора при создании задачи
  const [projects, setProjects] = useState([]);

  // Загрузка списка проектов при монтировании компонента
  useEffect(() => {
    setProjects(getAllProjects());
  }, []);

  const handleSave = (newTask) => {
    console.log("Сохранена задача:", newTask);
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
