'use client'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Task } from '../actions/types';
import { RootState } from '../store/store';
import { crmActions } from '../actions/crmSlice.ts';
import TaskItem from '../Components/TaskItem';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);

  const [newTask, setNewTask] = useState<Omit<Task, 'id' | 'completed' | 'clientId' | 'leadId'>>({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
  });

  const handleAddTask = () => {
    if (newTask.title.trim() && newTask.dueDate) {
      const task: Task = {
        ...newTask,
        id: `t${tasks.length + 1}`,
        completed: false,
        clientId: '',  
      
      };

      dispatch(crmActions.addTask(task));
      setNewTask({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium',
      });
      toast.success('Task added successfully');
    }
  };

  return (
    <div className='space-y-4'>
      <div className='bg-white rounded-lg shadow p-4'>
        <h3 className="font-semibold mb-3">Add New Task</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Task['priority'] })}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <button
            onClick={handleAddTask}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Add Task
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Tasks</h3>
        <div className="space-y-3">
          {tasks.length > 0 ? (
            tasks.map(task => <TaskItem key={task.id} task={task} />)
          ) : (
            <p className="text-gray-500 text-center py-4">No tasks yet. Add one above!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
