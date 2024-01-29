import { motion } from "framer-motion";

const CreateTaskForm = ({ task, onSubmit, onChange }) => {
  return (
    <motion.form
      onSubmit={onSubmit}
      className="panel"
      animate={{ opacity: 100 }}
      initial={{ opacity: 0 }}
      transition={{duration: 1, delay: 1}}
    >
      <input
        placeholder="Add task"
        type="text"
        value={task}
        onChange={(e) => {
          onChange(e);
        }}
      />
      <button type="submit">
        <span className="material-symbols-outlined">add</span>
      </button>
    </motion.form>
  );
};

export default CreateTaskForm;
