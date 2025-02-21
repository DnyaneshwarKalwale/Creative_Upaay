import React, { useState, useEffect } from 'react';
import axios from 'axios';

// MainSection component
function MainSection() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', priority: 'Low', description: '' });
  const [editingTask, setEditingTask] = useState(null); // Track the task being edited

  // Fetch tasks from the backend
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://gyaan.onrender.com/');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Handle drag start
  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  // Handle drop
  const handleDrop = async (e, status) => {
    const taskId = e.dataTransfer.getData('taskId');
    try {
      await axios.patch(`https://gyaan.onrender.com/update_todo/${taskId}`, { status });
      fetchTasks(); // Refresh tasks after update
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  // Add task
  const handleAddTask = () => {
    setShowForm(true);
    setEditingTask(null); // Reset editing task when adding a new one
  };

  // Form submission for adding/editing a task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        // Update existing task
        await axios.patch(`https://gyaan.onrender.com/update_todo/${editingTask._id}`, {
          title: newTask.title,
          priority: newTask.priority,
          description: newTask.description,
        });
      } else {
        // Add new task
        await axios.post('https://gyaan.onrender.com/todo_send', {
          no: `task-${tasks.length + 1}`,
          title: newTask.title,
          status: 'todo',
          priority: newTask.priority,
          description: newTask.description,
        });
      }
      fetchTasks(); // Refresh tasks after adding/updating
      setShowForm(false);
      setNewTask({ title: '', priority: 'Low', description: '' });
      setEditingTask(null); // Reset editing task
    } catch (error) {
      console.error('Error adding/updating task:', error);
    }
  };

  // Remove task
  const handleRemoveTask = async (taskId) => {
    try {
      await axios.delete(`https://gyaan.onrender.com/delete/${taskId}`);
      fetchTasks(); // Refresh tasks after deletion
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Edit task
  const handleEditTask = (task) => {
    setEditingTask(task); // Set the task being edited
    setNewTask({ title: task.title, priority: task.priority, description: task.description });
    setShowForm(true); // Show the form
  };

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-4">TODO APP</h1>
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
            {(status === 'todo' && showForm) && (
              <form onSubmit={handleSubmit} className="mb-4">
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full p-2 mb-2 border border-gray-400 rounded"
                  placeholder="Task title"
                  required
                />
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full p-2 mb-2 border border-gray-400 rounded"
                  placeholder="Task description"
                  required
                />
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  className="w-full p-2 mb-2 border border-gray-400 rounded"
                  required
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
                  {editingTask ? 'Update Task' : 'Add Task'}
                </button>
              </form>
            )}
            <div>
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <div
                    key={task._id} // Use _id from MongoDB
                    draggable
                    onDragStart={(e) => handleDragStart(e, task._id)}
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
                          onClick={async () => {
                            try {
                              await axios.patch(`https://gyaan.onrender.com/update_todo/${task._id}`, {
                                status: status === 'todo' ? 'inProgress' : 'done',
                              });
                              fetchTasks(); // Refresh tasks after update
                            } catch (error) {
                              console.error('Error updating task status:', error);
                            }
                          }}
                        >
                          →
                        </button>
                      )}
                      <button
                        className="text-gray-800 text-lg font-bold hover mr-2"
                        onClick={() => handleEditTask(task)} // Edit task
                      >
                        ✎
                      </button>
                      <button
                        className="text-gray-800 text-lg font-bold hover"
                        onClick={() => handleRemoveTask(task._id)} // Use _id from MongoDB
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
