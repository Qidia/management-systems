import { useEffect, useState } from "react";
import { Modal, Input, Select, Form, Button } from "antd";
import { useNavigate } from "react-router-dom";
import {
  getAllProjects,
  getAllAssignees,
  getAllPriorities,
  getAllStatuses,
} from "../../apiClient";
import styles from "./TaskModal.module.css";

const { TextArea } = Input;
const { Option } = Select;

const TaskModal = ({
  open,
  onClose,
  onSave,
  task,
  readOnlyProject = false,
}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const isEditMode = !!task;

  const [projects, setProjects] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    setProjects(getAllProjects());
    setAssignees(getAllAssignees());
    setPriorities(getAllPriorities());
    setStatuses(getAllStatuses());
  }, []);

  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        ...task,
        assignee: task.assignee?.email || null,
        boardId: task.boardId, // на всякий случай
      });
    } else {
      form.resetFields();
    }
  }, [task, form]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const assigneeObj = assignees.find((a) => a.email === values.assignee);
      const updatedTask = {
        ...task,
        ...values,
        assignee: assigneeObj || null,
      };
      onSave(updatedTask);
      onClose();
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
        <Form.Item
          name="title"
          label="Название задачи"
          rules={[{ required: true, message: "Введите название задачи" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Описание задачи">
          <TextArea rows={3} />
        </Form.Item>

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

        <Form.Item name="assignee" label="Исполнитель">
          <Select placeholder="Выберите исполнителя" allowClear>
            {assignees.map((user) => (
              <Option key={user.email} value={user.email}>
                {user.fullName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <div className={styles.button}>
          {form.getFieldValue("boardId") && (
            <Button
              type="link"
              onClick={() =>
                navigate(`/boards/${form.getFieldValue("boardId")}`)
              }
            >
              Перейти на доску
            </Button>
          )}
          <Button type="primary" onClick={handleSubmit}>
            {isEditMode ? "Обновить" : "Создать"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default TaskModal;
