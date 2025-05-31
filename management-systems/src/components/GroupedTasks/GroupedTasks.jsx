import styles from "./GroupedTasks.module.css";
import { useState } from "react";
import { Button } from "antd";
import TaskModal from "../TaskModal/TaskModal";
import { getAllProjects } from "../../apiClient";

const STATUS = {
  Backlog: "todo",
  InProgress: "inProgress",
  Done: "done",
};

const COLUMN_TITLES = {
  todo: "To do",
  inProgress: "In progress",
  done: "Done",
};

const GroupedTasks = ({ tasks }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [projects] = useState(getAllProjects());

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
    console.log("Сохранена задача:", updatedTask);
  };

  return (
    <>
      <div className={styles.columns}>
        {Object.keys(groupedTasks).map((statusKey) => (
          <div key={statusKey} className={styles.column}>
            <h2>{COLUMN_TITLES[statusKey]}</h2>
            {groupedTasks[statusKey].map((task) => (
              <Button
                key={task.id}
                className={styles.taskCard}
                block
                onClick={() => {
                  setSelectedTask(task);
                  setModalOpen(true);
                }}
              >
                {task.title}
              </Button>
            ))}
          </div>
        ))}
      </div>

      <TaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        task={selectedTask}
        projects={projects}
        readOnlyProject={false}
      />
    </>
  );
};

export default GroupedTasks;
