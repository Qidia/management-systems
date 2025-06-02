import { createContext, useContext, useEffect, useState } from "react";
import { getAllTasks, getAllProjects, addTask, updateTask } from "../apiClient";

// Создаём контекст задач
const TaskContext = createContext();

// Хук для удобного доступа к контексту задач
export const useTaskContext = () => useContext(TaskContext);

// Провайдер, который оборачивает приложение и предоставляет данные задач и проектов
export const TaskProvider = ({ children }) => {
  // Состояние для хранения всех задач
  const [tasks, setTasks] = useState([]);
  // Состояние для хранения всех проектов
  const [projects, setProjects] = useState([]);

  // При монтировании компонента загружаем задачи и проекты
  useEffect(() => {
    setTasks(getAllTasks()); // Получаем все задачи
    setProjects(getAllProjects()); // Получаем все проекты
  }, []);

  // Функция для добавления новой задачи
  const handleAddTask = (task) => {
    const created = addTask(task);
    setTasks((prev) => [...prev, created]);
    return created;
  };

  // Функция для обновления существующей задачи
  const handleUpdateTask = (task) => {
    const updated = updateTask(task);
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    return updated;
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        projects,
        addTask: handleAddTask,
        updateTask: handleUpdateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
