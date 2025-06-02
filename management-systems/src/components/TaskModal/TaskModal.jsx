import { useEffect, useState } from "react";
import { Modal, Input, Select, Form, Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getAllAssignees,
  getAllPriorities,
  getAllStatuses,
} from "../../apiClient";
import styles from "./TaskModal.module.css";

const { TextArea } = Input;
const { Option } = Select;

const TaskModal = ({
  open, // Флаг открытия модального окна
  onClose, // Функция закрытия модального окна
  onSave, // Функция сохранения задачи
  task, // Задача для редактирования (null для создания новой)
  readOnlyProject = false, // Флаг, блокирующий выбор проекта
  projects,
}) => {
  const [form] = Form.useForm(); // Экземпляр формы Ant Design
  const boardId = Form.useWatch("boardId", form);
  const navigate = useNavigate();
  const location = useLocation(); // получаем текущий маршрут
  const isEditMode = !!task; // Проверяем, режим редактирования или создания

  const isOnIssuesPage = location.pathname === "/issues"; // проверка на страницу Issues

  // Локальные состояния для списков выбора
  const [assignees, setAssignees] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);

  // Загружаем данные для селектов
  useEffect(() => {
    const fetchData = async () => {
      const assigneesData = await getAllAssignees();
      const prioritiesData = await getAllPriorities();
      const statusesData = await getAllStatuses();
      setAssignees(assigneesData);
      setPriorities(prioritiesData);
      setStatuses(statusesData);
    };
    fetchData();
  }, []);

  // При изменении задачи заполняем форму либо сбрасываем
  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        ...task,
        assignee: task.assignee?.email || null,
        boardId: task.boardId, // на всякий случай ID проекта
      });
    } else {
      form.resetFields();
    }
  }, [task, form]);

  // Сброс формы при закрытии модалки
  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open, form]);

  // Обработчик сабмита формы
  const handleSubmit = () => {
    form.validateFields().then((values) => {
      // Находим объект исполнителя по email
      const assigneeObj = assignees.find((a) => a.email === values.assignee);

      // Создаем обновленный объект задачи, подставляя выбранного исполнителя
      const updatedTask = {
        ...task,
        ...values,
        AssigneeID: assigneeObj ? assigneeObj.id : null,
      };
      delete updatedTask.assignee;

      onSave(updatedTask); // Вызываем сохранение
      onClose(); // Закрываем модалку
    });
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={isEditMode ? "Редактирование задачи" : "Создание задачи"}
      footer={null}
    >
      <Form form={form} layout="vertical">
        {/* Название задачи */}
        <Form.Item
          name="title"
          label="Название задачи"
          rules={[{ required: true, message: "Введите название задачи" }]}
        >
          <Input />
        </Form.Item>

        {/* Описание задачи */}
        <Form.Item name="description" label="Описание задачи">
          <TextArea rows={3} />
        </Form.Item>

        {/* Выбор проекта */}
        <Form.Item
          name="boardId"
          label="Проект"
          rules={[{ required: true, message: "Выберите проект" }]}
        >
          <Select disabled={readOnlyProject} placeholder="Выберите проект">
            {projects.map((project) => (
              <Option key={project.id} value={project.id}>
                {project.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Приоритет задачи */}
        <Form.Item
          name="priority"
          label="Приоритет"
          rules={[{ required: true, message: "Выберите приоритет" }]}
        >
          <Select placeholder="Выберите приоритет">
            {priorities.map((priority) => (
              <Option key={priority} value={priority}>
                {priority}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Статус задачи */}
        <Form.Item
          name="status"
          label="Статус"
          rules={[{ required: true, message: "Выберите статус" }]}
        >
          <Select placeholder="Выберите статус">
            {statuses.map((status) => (
              <Option key={status} value={status}>
                {status}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Исполнитель */}
        <Form.Item name="assignee" label="Исполнитель">
          <Select placeholder="Выберите исполнителя" allowClear>
            {assignees.map((user) => (
              <Option key={user.email} value={user.email}>
                {user.fullName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Кнопки внизу: переход на доску и сохранение */}
        <div className={styles.button}>
          {/* Кнопка перехода на доску, если выбран проект */}
          {isEditMode && isOnIssuesPage && boardId && (
            <Button type="link" onClick={() => navigate(`/boards/${boardId}`)}>
              Перейти на доску
            </Button>
          )}
          {/* Кнопка сохранения */}
          <Button type="primary" onClick={handleSubmit}>
            {isEditMode ? "Обновить" : "Создать"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default TaskModal;
