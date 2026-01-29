import { useState } from "react";
import api from "../services/api";
import type { Task } from "../types/Task";

interface TaskFormProps {
  onTaskAdded: (task: Task) => void;
}

const TaskForm = ({ onTaskAdded }: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      setLoading(true);
      const response = await api.post("tasks/", {
        title,
        description: "",
      });

      onTaskAdded(response.data);
      setTitle("");
    } catch {
      console.error("Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleAddTask}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
