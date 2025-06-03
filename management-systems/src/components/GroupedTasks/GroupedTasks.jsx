import styles from "./GroupedTasks.module.css";
import { useState, useEffect } from "react";
import { Button } from "antd";
import TaskModal from "../TaskModal/TaskModal";
import { getAllProjects } from "../../apiClient";
import { useTaskContext } from "../TaskContext/TaskContext";

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
  // Список проектов
  const [projects, setProjects] = useState([]);

  const { updateTask } = useTaskContext();

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
    if (!updatedTask.id) return; // игнорируем новые задачи, это не наша зона ответственности
    updateTask(updatedTask);
    setModalOpen(false);
    setSelectedTask(null);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getAllProjects();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  return (
    <>
      {/* Колонки с задачами по статусам */}
      <div className={styles.columns}>
        {Object.keys(groupedTasks).map((statusKey) => (
          <div key={statusKey} className={styles.column}>
            <h2>{COLUMN_TITLES[statusKey]}</h2>
            <div className={styles.containerTasks}>
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
          </div>
        ))}
      </div>

      {/* Модальное окно для создания/редактирования задачи */}
      {selectedTask && (
        <TaskModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedTask(null);
          }}
          onSave={handleSave}
          task={selectedTask}
          projects={projects}
          readOnlyProject={true}
        />
      )}
    </>
  );
};

export default GroupedTasks;
