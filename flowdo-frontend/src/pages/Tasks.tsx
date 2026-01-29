import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import api from "../services/api";
import type { Task } from "../types/Task";
import "../styles/tasks.css";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await api.get("tasks/");
      setTasks(response.data);
    } catch {
      console.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Navbar />

      <div className="tasks-container">
        <TaskForm
          onTaskAdded={(task) =>
            setTasks((prevTasks) => [task, ...prevTasks])
          }
        />

        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <div className="tasks-list">
            {tasks.length === 0 ? (
              <p>No tasks yet</p>
            ) : (
             tasks.map((task) => (
  <TaskItem
    key={task.id}
    task={task}
    onTaskUpdated={(updatedTask) =>
      setTasks((prev) =>
        prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      )
    }
    onTaskDeleted={(taskId) =>
      setTasks((prev) => prev.filter((t) => t.id !== taskId))
    }
  />
))

            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Tasks;
