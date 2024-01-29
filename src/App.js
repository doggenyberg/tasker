import { useState, useEffect } from "react";
import CreateTaskForm from "./CreateTaskForm";
import TaskList from "./TaskList";
import { motion } from "framer-motion";

function App() {
  const [newTask, setNewTask] = useState("");
  const [taskList, setTaskList] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(taskList));
  }, [taskList]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newTask === "") {
      alert("Task can't be empty.");
      return;
    }
    setTaskList((currentList) => {
      return [
        ...currentList,
        { id: crypto.randomUUID(), title: newTask, completed: false },
      ];
    });
    filterList();
    setNewTask("");
  };

  const handleChecked = (id) => {
    setTaskList((currentList) => {
      return currentList.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
    });
    filterList();
  };

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleDelete = (id) => {
    setTimeout(() => {
      setTaskList((currentList) =>
        currentList.filter((task) => task.id !== id)
      );
    }, 150);
  };

  const handleClear = () => {
    const checkedTasks = taskList.filter(task => task.completed);

    checkedTasks.forEach(task => {
      task.animation = { opacity: 0, transition: { duration: 0.5 } };
    });
    setTimeout(() => {
      const clearedArray = taskList.filter(task => !task.completed);
      setTaskList(clearedArray);
    }, 200);
  };

  const filterList = () => {
    setTaskList((prevTaskList) => {
      const sortedList = [...prevTaskList].sort(
        (a, b) => a.completed - b.completed
      );
      return sortedList;
    });
  };

  return (
    <div className="App">
      <motion.h1
        className="header"
        animate={{ opacity: 100, y: 0 }}
        transition={{ duration: 1 }}
        initial={{ opacity: 0, y: -20 }}
      >
        <span>task</span>er
      </motion.h1>
      <CreateTaskForm
        task={newTask}
        onSubmit={handleSubmit}
        onChange={handleChange}
      />

      <TaskList
        taskList={taskList}
        onDelete={handleDelete}
        onChecked={handleChecked}
        onClear={handleClear}
      />
    </div>
  );
}

export default App;
