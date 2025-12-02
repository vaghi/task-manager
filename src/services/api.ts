import axios from 'axios';
import type { Task } from '../types';

const API_URL = '/api/tasks';
const USE_MOCK = true; // Set to false when backend is ready

// Mock data for frontend-only development
let mockTasks: Task[] = [
  { id: 1, title: 'Buy groceries', completed: false },
  { id: 2, title: 'Walk the dog', completed: true },
  { id: 3, title: 'Finish frontend', completed: false },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTasks = async (): Promise<Task[]> => {
  if (USE_MOCK) {
    await delay(500);
    return [...mockTasks];
  }
  const response = await axios.get<Task[]>(API_URL);
  return response.data;
};

export const addTask = async (title: string): Promise<Task> => {
  if (USE_MOCK) {
    await delay(500);
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };
    mockTasks = [...mockTasks, newTask];
    return newTask;
  }
  const response = await axios.post<Task>(API_URL, { title });
  return response.data;
};

export const updateTask = async (id: string | number, completed: boolean): Promise<void> => {
  if (USE_MOCK) {
    await delay(300);
    mockTasks = mockTasks.map(t => 
      t.id === id ? { ...t, completed } : t
    );
    return;
  }
  await axios.put(`${API_URL}/${id}`, { completed });
};
