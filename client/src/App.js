import "./App.css";
import React, { useState, useEffect } from "react";
import { addtodo, deleteTodo, getTodos, updateTodo } from "./api";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState(-1);

  const fetchTodos = async () => {
    const todos = await getTodos();
    setTodos(todos.data);
  }

  const handleAdd = async () => {
    if (!todo) return;
    const body = { content: todo };
    await addtodo(body);

    fetchTodos();
    setTodo("");
  };

  const handleDelete = async (t_id) => {
    await deleteTodo(t_id);
    fetchTodos();
  };

  const handleUpdate = async (t_id) => {
    const body = { content: newTodo };
    await updateTodo(t_id, body);
    fetchTodos();
    setEditTodo(-1);
  };

  const toggleEdit = (todo) => {
    setNewTodo(todo.content);
    setEditTodo(todo.t_id);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="App">
      {todos.map((todo) => (
        <div key={todo.t_id} style={{ "margin": "5px" }}>
          {editTodo === todo.t_id ? (
            <>
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
              />
              <button onClick={() => handleUpdate(todo.t_id)}>save</button>
              <button onClick={() => setEditTodo(-1)}>cancel</button>
            </>
          ) : (
            <>
              <span>{todo.content}</span>
              <button onClick={() => toggleEdit(todo)}>edit</button>
              <button onClick={() => handleDelete(todo.t_id)}>delete</button>
            </>
          )}
        </div>
      ))}
      <input
        type="text"
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
      />
      <button onClick={handleAdd}>Add todo</button>
    </div>
  );
}

export default App;
