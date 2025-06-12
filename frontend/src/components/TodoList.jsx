import axios from '../api/axios';
import { useEffect, useState } from 'react';

function Todos() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const token = localStorage.getItem('token');

    try {
      const res = await axios.get('/todos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(res.data.todos);
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h2>Your Todos</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
