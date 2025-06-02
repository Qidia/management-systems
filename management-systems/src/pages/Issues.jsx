import { Button, List } from "antd";
import { useState, useEffect } from "react";
import TaskModal from "../components/TaskModal/TaskModal";
import TaskSearch from "../components/TaskSearch/TaskSearch";
import TaskFilter from "../components/TaskFilter/TaskFilter";
//import { getAllTasks, getAllProjects } from "../apiClient";
import { useTaskContext } from "../components/TaskContext";

// Компонент Issues отображает страницу со списком всех задач. На любую задачу можно нажать, тем самым вызвав окно редактирования с предзаполненными полями

const Issues = () => {
  const { tasks, projects, addTask, updateTask } = useTaskContext();

  // Состояние управления модалкой
  const [modalOpen, setModalOpen] = useState(false);
  // Выбранная задача для редактирования
  const [selectedTask, setSelectedTask] = useState(null);
  // Список всех проектов (используется в модалке)
 // const [projects, setProjects] = useState([]);
  // Список всех задач
 // const [tasks, setTasks] = useState([]);
  // Отфильтрованный список задач, отображаемый в списке
  const [filteredTasks, setFilteredTasks] = useState([]);
  // Поисковый запрос (строка, введённая пользователем)
  const [searchParams, setSearchParams] = useState("");
  // Параметры фильтрации (status и boardId)
  const [filterParams, setFilterParams] = useState({});


  
  // Загружаем задачи и проекты при монтировании компонента
/*   useEffect(() => {
    const loadedTasks = getAllTasks();
    setTasks(loadedTasks);
    setFilteredTasks(loadedTasks); // Изначально показываем все задачи
    setProjects(getAllProjects());
  }, []);
 */
  // Обновляем отфильтрованные задачи при изменении параметров поиска/фильтра/самих задач
  useEffect(() => {
    const { status, boardId } = filterParams;
    const lowerQuery = searchParams.toLowerCase();

    const result = tasks.filter((task) => {
      // Проверяем, начинается ли какое-либо слово в названии задачи с поискового запроса
      const matchTitle = task.title
        .toLowerCase()
        .split(" ")
        .some((word) => word.startsWith(lowerQuery));

      // Проверяем, начинается ли какое-либо слово в имени исполнителя с поискового запроса
      const matchAssignee = task.assignee?.fullName
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
  }, [searchParams, filterParams, tasks]);

  const handleSave = (task) => {
    if (task.id) {
      updateTask(task);
    } else {
      addTask(task);
    }
  };

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
        dataSource={filteredTasks}
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
        readOnlyProject={selectedTask === null ? false : true} // Проект нельзя редактировать
      />
    </>
  );
};

export default Issues;
