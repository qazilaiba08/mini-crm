'use client'
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { useSelector } from 'react-redux';
import { RootState } from '../store/store'; 

const TaskCalendar = () => {
  const tasks = useSelector((state: RootState) => state.tasks); // or state.tasks
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const filteredTasks = selectedDate
    ? tasks.filter(task => {
        const taskDate = new Date(task.dueDate);
        return (
          taskDate.getFullYear() === selectedDate.getFullYear() &&
          taskDate.getMonth() === selectedDate.getMonth() &&
          taskDate.getDate() === selectedDate.getDate()
        );
      })
    : [];

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Task Calendar</h2>

      <Calendar
        onClickDay={setSelectedDate}
        value={selectedDate}
        className="mx-auto"
      />

      <div className="mt-6">
        <h3 className="text-lg font-bold mb-2">
          Tasks on {selectedDate ? selectedDate.toDateString() : 'No date selected'}
        </h3>
        {filteredTasks.length > 0 ? (
          <ul className="space-y-2">
            {filteredTasks.map(task => (
              <li
                key={task.id}
                className="p-3 bg-blue-50 border border-blue-200 rounded"
              >
                <strong>{task.title}</strong>
                <p className="text-sm text-gray-600">{task.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No tasks for this day.</p>
        )}
      </div>
    </div>
  );
};

export default TaskCalendar;
