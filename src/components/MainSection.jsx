
import React, { useState } from 'react';

// Initial tasks data
const initialTasks = [
  { id: 'task-1', title: 'Brainstorming', status: 'todo', priority: 'Low', description: 'Brainstorming brings team members diverse experience into play.' },
  { id: 'task-2', title: 'Design System', status: 'done', priority: 'Completed', description: 'Creatvie Upaay task.' },
  { id: 'task-3', title: 'Brainstorming', status: 'inProgress', priority: 'High', description: 'Brainstorming brings team members diverse experience into play.' },
  { id: 'task-4', title: 'Brainstorming', status: 'todo', priority: 'Low', description: 'Brainstorming brings team members diverse experience into play.' },
  { id: 'task-5', title: 'Design System', status: 'done', priority: 'Completed', description: 'Creatvie Upaay task.' },
  { id: 'task-6', title: 'Brainstorming', status: 'inProgress', priority: 'Low', description: 'Brainstorming brings team members diverse experience into play.' },
];

// MainSection component
function MainSection() {
  const [tasks, setTasks] = useState(initialTasks);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', priority: 'Low', description: '' });

  // Handle drag start
  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  // Handle drop
  const handleDrop = (e, status) => {
    const taskId = e.dataTransfer.getData('taskId');
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status } : task
    );
    setTasks(updatedTasks);
  };

  // Add task
  const handleAddTask = () => {
    setShowForm(true);
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTaskId = `task-${tasks.length + 1}`;
    const newTaskObj = { id: newTaskId, title: newTask.title, status: 'todo', priority: newTask.priority, description: newTask.description };
    setTasks([...tasks, newTaskObj]);
    setShowForm(false);
    setNewTask({ title: '', priority: 'Low', description: '' });
  };

  // Remove task
  const handleRemoveTask = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  };

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-4">Mobile App</h1>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        {['todo', 'inProgress', 'done'].map((status) => (
          <div
            key={status}
            className="w-full md:w-1/3 bg-gray-100 p-4 rounded-lg"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
          >
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold mb-2">
                {status === 'todo' ? 'To Do' : status === 'inProgress' ? 'On Progress' : 'Done'}
              </h2>
              {status === 'todo' && (
                <button className="text-gray-800 text-lg font-bold hover" onClick={handleAddTask}>
                  +
                </button>
              )}
            </div>
            <div className={`border-t-4 ${status === 'todo' ? 'border-purple-500' : status === 'inProgress' ? 'border-orange-500' : 'border-green-500'} mb-2`}></div>
            {status === 'todo' && showForm && (
              <form onSubmit={handleSubmit} className="mb-4">
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full p-2 mb-2 border border-gray-400 rounded"
                  placeholder="Task title"
                />
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full p-2 mb-2 border border-gray-400 rounded"
                  placeholder="Task description"
                />
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  className="w-full p-2 mb-2 border border-gray-400 rounded"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
                  Add Task
                </button>
              </form>
            )}
            <div>
              {tasks .filter((task) => task.status === status).map((task) => (
                  <div key={task.id} draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    className="bg-white p-3 rounded-lg shadow border-2 my-4 flex justify-between"
                    style={{ borderColor: status === 'todo' ? 'red' : status === 'inProgress' ? 'blue' : 'green' }}
                  >
                    <div>
                      <span className={`text-xs ${task.priority === 'Low' ? 'bg-orange-200' : task.priority === 'Medium' ? 'bg-yellow-200' : 'bg-red-200'} px-2 py-1 rounded`}>
                        {task.priority}
                      </span>
                      <h3 className="font-semibold mt-2">{task.title}</h3>
                      <p className="text-sm text-gray-600">{task.description}</p>
                    </div>
                    <div>
                      {status !== 'done' && (
                        <button
                          className="text-gray-800 text-lg font-bold hover mr-2"
                          onClick={() => {
                            const updatedTasks = tasks.map((t) =>
                              t.id === task.id ? { ...t, status: status === 'todo' ? 'inProgress' : 'done' } : t
                            );
                            setTasks(updatedTasks);
                          }}
                        >
                          →
                        </button>
                      )}
                      <button
                        className="text-gray-800 text-lg font-bold hover"
                        onClick={() => handleRemoveTask(task.id)}
                      >
                        -
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainSection;
