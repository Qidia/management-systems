import { Button, List } from "antd";
import { useState, useEffect } from "react";
import TaskModal from "../components/TaskModal/TaskModal";
import TaskSearch from "../components/TaskSearch/TaskSearch";
import TaskFilter from "../components/TaskFilter/TaskFilter";
import { useTaskContext } from "../components/TaskContext";

const PAGE_SIZE = 7;

// Компонент Issues отображает страницу со списком всех задач. На любую задачу можно нажать, тем самым вызвав окно редактирования с предзаполненными полями
const Issues = () => {
  const { tasks, projects, addTask, updateTask } = useTaskContext();

  // Состояние управления модалкой
  const [modalOpen, setModalOpen] = useState(false);
  // Выбранная задача для редактирования
  const [selectedTask, setSelectedTask] = useState(null);
  // Отфильтрованный список задач, отображаемый в списке
  const [filteredTasks, setFilteredTasks] = useState([]);
  // Поисковый запрос (строка, введённая пользователем)
  const [searchParams, setSearchParams] = useState("");
  // Параметры фильтрации (status и boardId)
  const [filterParams, setFilterParams] = useState({});

  const [currentPage, setCurrentPage] = useState(1);

  // Обновляем отфильтрованные задачи при изменении параметров поиска/фильтра/самих задач
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

    // Обновляем список отфильтрованных задач
    setFilteredTasks(result);
    setCurrentPage(1);
  }, [searchParams, filterParams, tasks]);

  const handleSave = async (task) => {
    if (task.id) {
      await updateTask(task);
    } else {
      await addTask(task);
    }
    setModalOpen(false);
    setSelectedTask(null);
  };

  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <>
      {/* Компонент поиска задач */}
      <TaskSearch onSearch={setSearchParams} />
      {/* Компонент фильтрации по статусу и проекту */}
      <TaskFilter onFilter={setFilterParams} />

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

      {/* Модальное окно для создания или редактирования задачи */}
      <TaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        task={selectedTask} // Передаём задачу (null — новая задача)
        projects={projects} // Список проектов для выбора
        readOnlyProject={selectedTask !== null} // Проект нельзя редактировать
      />
    </>
  );
};

export default Issues;
