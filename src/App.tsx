import { TaskList } from './features/tasks/TaskList';
import { Layout } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto">
        <header className="flex items-center justify-center mb-12">
          <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-600/20 mr-4">
            <Layout className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Task Manager</h1>
        </header>
        
        <main>
          <TaskList />
        </main>

        <footer className="mt-16 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Task Manager. Built with React & TypeScript.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
