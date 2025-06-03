import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Button } from "antd";
import TaskModal from "../TaskModal/TaskModal";
import { useTaskContext } from "../TaskContext/TaskContext";
import styles from "./Header.module.css";

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
    <header className={styles.header}>
      {/* Навигация по приложению */}
      <nav className={styles.nav}>
        <NavLink
          to="/issues"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Все задачи
        </NavLink>
        <NavLink
          to="/boards"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Проекты
        </NavLink>
      </nav>

      {/* Кнопка открытия модального окна создания задачи */}
      <Button
        className={styles.right}
        type="primary"
        onClick={() => setModalOpen(true)}
      >
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
