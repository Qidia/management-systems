import { Button, List } from "antd";
import { useState, useEffect } from "react";

import TaskModal from "../../components/TaskModal/TaskModal";
import TaskSearch from "../../components/TaskSearch/TaskSearch";
import TaskFilter from "../../components/TaskFilter/TaskFilter";

// Импорт контекста задач
import { useTaskContext } from "../../components/TaskContext/TaskContext";

import styles from "./Issues.module.css";

// Количество задач на одну страницу
const PAGE_SIZE = 7;

// Компонент Issues отображает страницу со всеми задачами
const Issues = () => {
  // Получаем задачи, проекты и методы управления задачами из контекста
  const { tasks, projects, addTask, updateTask } = useTaskContext();

  // Состояние управления модалкой
  const [modalOpen, setModalOpen] = useState(false);
  // Выбранная задача для редактирования
  const [selectedTask, setSelectedTask] = useState(null);
  // Отфильтрованный список задач
  const [filteredTasks, setFilteredTasks] = useState([]);
  // Поисковый запрос (строка, введённая пользователем)
  const [searchParams, setSearchParams] = useState("");
  // Параметры фильтрации (status и boardId)
  const [filterParams, setFilterParams] = useState({});
  // Текущая страница пагинации
  const [currentPage, setCurrentPage] = useState(1);

  // Фильтрация задач при изменении задач, фильтров или строки поиска
  useEffect(() => {
    const { status, boardId } = filterParams;
    const lowerQuery = searchParams.toLowerCase();

    const result = tasks.filter((task) => {
      const title = task.title || "";
      const fullName = task.assignee?.fullName || "";

      // Проверяем, начинается ли какое-либо слово в названии задачи с поискового запроса
      const matchTitle = title
        .toLowerCase()
        .split(" ")
        .some((word) => word.startsWith(lowerQuery));

      // Проверяем, начинается ли какое-либо слово в имени исполнителя с поискового запроса
      const matchAssignee = fullName
        .toLowerCase()
        .split(" ")
        .some((word) => word.startsWith(lowerQuery));

      // Проверяем соответствие статуса
      const matchStatus = !status || task.status === status;
      // Проверяем соответствие проекта
      const matchBoard = !boardId || task.boardId === boardId;

      return (matchTitle || matchAssignee) && matchStatus && matchBoard;
    });

    // Обновляем список отфильтрованных задач и сбрасываем текущую страницу
    setFilteredTasks(result);
    setCurrentPage(1);
  }, [searchParams, filterParams, tasks]);

  // Обработка сохранения задачи (обновление или создание)
  const handleSave = async (task) => {
    if (task.id) {
      await updateTask(task);
    } else {
      await addTask(task);
    }
    setModalOpen(false);
    setSelectedTask(null);
  };

  // Выборка задач для текущей страницы
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <>
      <div className={styles.issuesContainer}>
        <div className={styles.filtersRow}>
          {/* Компонент поиска задач */}
          <TaskSearch onSearch={setSearchParams} />
          {/* Компонент фильтрации по статусу и проекту */}
          <TaskFilter onFilter={setFilterParams} />
        </div>

        <div className={styles.taskListContainer}>
          {/* Список задач */}
          <List
            itemLayout="horizontal"
            size="large"
            pagination={{
              current: currentPage,
              pageSize: PAGE_SIZE,
              total: filteredTasks.length,
              onChange: (page) => setCurrentPage(page),
              showSizeChanger: false,
            }}
            dataSource={paginatedTasks}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <Button
                  className={styles.taskItem}
                  onClick={() => {
                    setSelectedTask(item); // Устанавливаем задачу для редактирования
                    setModalOpen(true); // Открываем модалку
                  }}
                >
                  {item.title}
                </Button>
              </List.Item>
            )}
          />

          <div className={styles.createButtonWrapper}>
            {/* Кнопка создания новой задачи */}
            <Button
              type="primary"
              onClick={() => {
                setSelectedTask(null); // Сброс выбранной задачи
                setModalOpen(true); // Открываем модалку
              }}
            >
              Создать задачу
            </Button>
          </div>
        </div>

        {/* Модальное окно для создания или редактирования задачи */}
        <TaskModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          task={selectedTask} // Передаём задачу (null — новая задача)
          projects={projects} // Список проектов для выбора
          readOnlyProject={selectedTask !== null} // Проект нельзя редактировать
        />
      </div>
    </>
  );
};

export default Issues;
