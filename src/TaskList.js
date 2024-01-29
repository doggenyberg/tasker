import { useState } from "react";
import Task from "./Task";
import { motion } from "framer-motion";

const TaskList = ({ taskList, onChecked, onDelete, onClear }) => {
  const [clearButtonClicked, setClearButtonClicked] = useState(false);

  const sortedTaskList = taskList
    .slice()
    .sort((a, b) => a.completed - b.completed);

  return (
    <motion.div
      animate={{ opacity: 100, y: 0 }}
      transition={{ duration: 1, delay: 2 }}
      initial={{ opacity: 0, y: -20 }}
      className="panel task-list-container"
    >
      <div className="task-list">
        {sortedTaskList.map((task) => (
          <Task
            key={task.id}
            task={task}
            onChecked={onChecked}
            onDelete={onDelete}
            clearButtonClicked={clearButtonClicked}
            setClearButtonClicked={setClearButtonClicked}
          />
        ))}
      </div>
      {sortedTaskList.filter((task) => !task.completed).length > 0 ? (
        <p>
          {sortedTaskList.filter((task) => !task.completed).length} remaining
        </p>
      ) : (
        <p>All tasks done!</p>
      )}

      <button
        className="button-clear"
        onClick={() => {
          onClear();
          setClearButtonClicked(true);
        }}
      >
        <h4>Clear completed</h4>
      </button>
    </motion.div>
  );
};

export default TaskList;
