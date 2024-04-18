import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:1337/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };
  
  const addTodo = async () => {
    if (newTodo.trim() !== '') {
      try {
        await axios.post('http://localhost:1337/todos', { text: newTodo });
        setNewTodo('');
        fetchTodos();
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };
  
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:1337/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };
  
  const updateTodo = async (id, newText) => {
    try {
      await axios.put(`http://localhost:1337/todos/${id}`, { text: newText });
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className="homepage">
      <div className="todo-list">
        <h2>Todo List</h2>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button onClick={addTodo}>Add</button>
        <ul>
          {todos.map((todo) => (
            <li key={todo._id}>
              <input
                type="text"
                defaultValue={todo.text}
                onBlur={(e) => updateTodo(todo._id, e.target.value)}
              />
              <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <Link to="/">
        <h2>Go to login page</h2>
      </Link>
    </div>
  );
}

export default Dashboard;