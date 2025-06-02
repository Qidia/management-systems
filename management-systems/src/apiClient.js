const API_URL = "http://127.0.0.1:8080/api/v1";

// Универсальная функция запроса
const request = async (endpoint, options = {}) => {
  const res = await fetch(`${API_URL}${endpoint}`, options);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`HTTP ${res.status}: ${errorText}`);
  }
  return res.json();
};

// Получить все задачи
export const getAllTasks = async () => {
  const response = await request("/tasks");
  return response.data;
};

// Получить задачу по ID
export const getTaskById = async (id) => {
  const response = await request(`/tasks/${id}`);
  return response;
};

// Получить задачи определенного проекта
export const getTasksByBoardId = async (boardId) => {
  const response = await request(`/boards/${boardId}`);
  return response;
};

// Получить список всех проектов
export const getAllProjects = async () => {
  const response = await request("/boards");
  return response.data;
};

// Получить всех исполнителей (уникальные по email)
export const getAllAssignees = async () => {
  const tasks = await getAllTasks();
  const map = new Map();
  tasks.forEach((task) => {
    const assignee = task.assignee;
    if (assignee && !map.has(assignee.email)) {
      map.set(assignee.email, assignee);
    }
  });
  return Array.from(map.values());
};

// Получить все статусы
export const getAllStatuses = async () => {
  const tasks = await getAllTasks();
  const statuses = new Set(tasks.map((task) => task.status));
  return Array.from(statuses);
};

// Получить все приоритеты
export const getAllPriorities = async () => {
  const tasks = await getAllTasks();
  const priorities = new Set(tasks.map((task) => task.priority));
  return Array.from(priorities);
};

// Обновить статус задачи
export const updateTaskStatus = async (taskId, statusData) => {
  return await request(`/tasks/updateStatus/${taskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(statusData),
  });
};

// Добавить новую задачу
export const addTask = async (taskData) => {
  return await request("/tasks/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  });
};

// Обновить существующую задачу
export const updateTask = async (taskId, updateData) => {
  const updated = await request(`/tasks/update/${taskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData),
  });

  return updated;
};
