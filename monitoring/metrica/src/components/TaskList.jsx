import TaskCard from "./TaskCard";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskList() {
  const { tasks } = useContext(TaskContext);

  if (tasks.length === 0) {
    return (
      <h1 className="text-white text-4xl font-bold text-center">
        No hay tareas aun
      </h1>
    );
  }

  return (

      <div className="grid grid-cols-2 gap-2 p-4 rounded-md max-w-2xl mx-auto">
        {tasks.map((tasks) => (
          <TaskCard key={tasks.id} tasks={tasks} />
        ))}
      </div>
  );
}

export default TaskList;
