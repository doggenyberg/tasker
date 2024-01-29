import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Task = ({ task, onChecked, onDelete, clearButtonClicked, setClearButtonClicked }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    if (clearButtonClicked && isChecked) {
      setIsDeleted(true);
    }
    setClearButtonClicked(false);
  }, [clearButtonClicked]);

  const animateDelete = () => {
    setIsDeleted(true);
  };

  return (
    <motion.div
      animate={{ y: 0, opacity: isDeleted ? 0 : 100, x: isDeleted ? -250 : 0 }}
      initial={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={`task ${isChecked || task.completed ? "checked" : ""}`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => {
          onChecked(task.id);
          setIsChecked(!isChecked);
        }}
      />
      <h5>{task.title}</h5>
      <button
        onClick={() => {
          onDelete(task.id);
          animateDelete();
        }}
      >
        <span className="material-symbols-outlined">delete</span>
      </button>
    </motion.div>
  );
};

export default Task;
