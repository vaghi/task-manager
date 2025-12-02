import React, { useEffect, useState } from 'react';
import type { Task } from '../../types';
import { fetchTasks, addTask, updateTask } from '../../services/api';
import { TaskItem } from './TaskItem';
import { AddTaskForm } from './AddTaskForm';
import { Loader2, AlertCircle } from 'lucide-react';

export const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTasks();
      setTasks(data);
    } catch {
      setError('Failed to load tasks. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = async (title: string) => {
    try {
      setSubmitting(true);
      const newTask = await addTask(title);
      setTasks(prev => [...prev, newTask]);
    } catch {
      setError('Failed to add task. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleTask = async (id: string | number, completed: boolean) => {
    // Optimistic update
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, completed } : t
    ));

    try {
      await updateTask(id, completed);
    } catch {
      // Revert on failure
      setTasks(prev => prev.map(t => 
        t.id === id ? { ...t, completed: !completed } : t
      ));
      setError('Failed to update task status.');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading your tasks...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Tasks</h1>
        <p className="text-gray-500">Stay organized and get things done</p>
      </div>

      <AddTaskForm onAdd={handleAddTask} disabled={submitting} />

      {error && (
        <div className="flex items-center p-4 mb-6 text-red-800 bg-red-50 rounded-xl border border-red-100">
          <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div className="space-y-1">
        {tasks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 border-dashed">
            <p className="text-gray-400 text-lg">No tasks yet. Add one above!</p>
          </div>
        ) : (
          tasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onToggle={handleToggleTask} 
            />
          ))
        )}
      </div>
    </div>
  );
};
