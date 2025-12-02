import React from 'react';
import { Check, Circle } from 'lucide-react';
import type { Task } from '../../types';
import clsx from 'clsx';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string | number, completed: boolean) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => {
  return (
    <div
      onClick={() => onToggle(task.id, !task.completed)}
      className={clsx(
        "group flex items-center p-4 mb-3 bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-200 cursor-pointer hover:shadow-md hover:border-blue-100",
        task.completed && "bg-gray-50 opacity-75"
      )}
    >
      <div className={clsx(
        "flex items-center justify-center w-6 h-6 rounded-full border-2 mr-4 transition-colors duration-200",
        task.completed ? "bg-green-500 border-green-500" : "border-gray-300 group-hover:border-blue-400"
      )}>
        {task.completed ? (
          <Check className="w-4 h-4 text-white" />
        ) : (
          <Circle className="w-0 h-0 opacity-0" /> 
        )}
      </div>
      
      <span className={clsx(
        "text-lg font-medium transition-all duration-200",
        task.completed ? "text-gray-400 line-through" : "text-gray-700"
      )}>
        {task.title}
      </span>
    </div>
  );
};
