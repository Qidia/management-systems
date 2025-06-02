import styles from "./GroupedTasks.module.css";
import { useState } from "react";
import { Button } from "antd";
import TaskModal from "../TaskModal/TaskModal";
import { getAllProjects } from "../../apiClient";

// Соответствие статусов из данных ключам для группировки
const STATUS = {
  Backlog: "todo",
  InProgress: "inProgress",
  Done: "done",
};

// Заголовки колонок для отображения
const COLUMN_TITLES = {
  todo: "To do",
  inProgress: "In progress",
  done: "Done",
};

// Компонент для отображения задач, сгруппированных по статусу в колонки
const GroupedTasks = ({ tasks }) => {
  // Состояние открытия модального окна задачи
  const [modalOpen, setModalOpen] = useState(false);
  // Выбранная задача для редактирования
  const [selectedTask, setSelectedTask] = useState(null);
  // Список проектов (загружается один раз при инициализации)
  const [projects] = useState(getAllProjects());

  // Группируем задачи по статусу в объект с тремя массивами
  const groupedTasks = tasks.reduce(
    (acc, task) => {
      const statusKey = STATUS[task.status];
      if (statusKey) {
        acc[statusKey].push(task);
      }
      return acc;
    },
    {
      todo: [],
      inProgress: [],
      done: [],
    }
  );

  const handleSave = (updatedTask) => {
    console.log("Сохранена задача:", updatedTask);
  };

  return (
    <>
      {/* Колонки с задачами по статусам */}
      <div className={styles.columns}>
        {Object.keys(groupedTasks).map((statusKey) => (
          <div key={statusKey} className={styles.column}>
            <h2>{COLUMN_TITLES[statusKey]}</h2>
            {groupedTasks[statusKey].map((task) => (
              <Button
                key={task.id}
                className={styles.taskCard}
                block
                onClick={() => {
                  setSelectedTask(task);
                  setModalOpen(true); // открыть модалку для редактирования задачи
                }}
              >
                {task.title}
              </Button>
            ))}
          </div>
        ))}
      </div>

      {/* Модальное окно для создания/редактирования задачи */}
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

export default GroupedTasks;
