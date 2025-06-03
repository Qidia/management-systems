import { createContext, useContext, useEffect, useState } from "react";
import { getAllTasks, getAllProjects, addTask, updateTask } from "../../apiClient";

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
    const fetchData = async () => {
      const tasks = await getAllTasks();
      const projects = await getAllProjects();
      setTasks(tasks); // Получаем все задачи
      setProjects(projects); // Получаем все проекты
    };
    fetchData();
  }, []);

  // Функция для добавления новой задачи
  const handleAddTask = async (task) => {
    await addTask(task);
    const updatedTasks = await getAllTasks();
    setTasks(updatedTasks);
  };

  // Функция для обновления существующей задачи
  const handleUpdateTask = async (task) => {
    await updateTask(task.id, task);
    const updatedTasks = await getAllTasks();
    setTasks(updatedTasks);
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
