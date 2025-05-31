import styles from "./GroupedTasks.module.css";
import { Button } from "antd";

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

  return (
    <div className={styles.columns}>
      {Object.keys(groupedTasks).map((statusKey) => (
        <div key={statusKey} className={styles.column}>
          <h2>{COLUMN_TITLES[statusKey]}</h2>
          {groupedTasks[statusKey].map((task) => (
            <Button key={task.id} className={styles.taskCard} block>
              {task.title}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GroupedTasks;
