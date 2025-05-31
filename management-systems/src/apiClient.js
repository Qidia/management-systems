import { data } from "./data";

// Получить все задачи
export const getAllTasks = () => {
  return data;
};

// Получить задачу по ID
export const getTaskById = (id) => {
  return data.find((task) => task.id === Number(id));
};

// Получить задачи определенного проекта
export const getTasksByBoardId = (boardId) => {
  return data.filter((task) => task.boardId === Number(boardId));
};

// Получить список всех проектов
export const getAllProjects = () => {
  const map = new Map();
  data.forEach((task) => {
    if (!map.has(task.boardId)) {
      map.set(task.boardId, task.boardName);
    }
  });
  return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
};

// Получить всех исполнителей
export const getAllAssignees = () => {
  const map = new Map();
  data.forEach((task) => {
    const assignee = task.assignee;
    if (!map.has(assignee.id)) {
      map.set(assignee.id, assignee);
    }
  });
  return Array.from(map.values());
};

// Получить все статусы
export const getAllStatuses = () => {
  return [...new Set(data.map((task) => task.status))];
};

// Получить все приоритеты
export const getAllPriorities = () => {
  return [...new Set(data.map((task) => task.priority))];
};
