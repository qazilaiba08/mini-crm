'use client'
import { useDispatch } from 'react-redux';
import { Task } from '../actions/types';
import { crmActions } from '../actions/crmSlice.ts';

type Props = {
  task: Task;
};

const priorityColors: Record<Task['priority'], string> = {
  high: 'bg-red-200 text-red-800',
  medium: 'bg-yellow-200 text-yellow-800',
  low: 'bg-green-200 text-green-800',
};

const TaskItem: React.FC<Props> = ({ task }) => {
  const dispatch = useDispatch();

  const toggleComplete = () => {
    dispatch(crmActions.toggleTaskComplete(task.id));
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-3">
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-400' : ''}`}>
            {task.title}
          </h3>
          <p className="text-sm text-gray-600">{task.description}</p>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-2 md:mt-0">
          <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={toggleComplete}
            className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
