import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams,NavLink } from 'react-router-dom';
export default function Todo() {
  const { id } = useParams();
  const [todoDetails, setTodoDetails] = useState({});
  const [todoDetails1, setTodoDetails1] = useState({});
  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res => {
      setTodoDetails(res.data);
    });
  }, []);
  const { id: todoID, userId, title, } = todoDetails;
  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then(res => {
      setTodoDetails1(res.data);
    });
  }, []);
  const { name, email } = todoDetails1;
  return (
    <div>
      <h1 className="user-details">User Details</h1>
      {todoDetails && todoDetails1 ? (
        <div className="todo-container">
          <div className="todo-item">
            <p>ToDo Id</p>
            <p>{`${todoID}`}</p>
          </div>
          <div className="todo-item">
            <p>ToDo Tile</p>
            <p>{`${title}`}</p>
          </div>
          <div className="todo-item">
            <p>User Id</p>
            <p>{`${userId}`}</p>
          </div>
          <div className="todo-item">
            <p>Name</p>
            <p>{`${name}`}</p>
          </div><div className="todo-item">
            <p>Email</p>
            <p>{`${email}`}</p>
          </div>

        </div>
      ) : (
        <h1>Loading</h1>
      )}

<NavLink to="/"><button className="view-btn" style={{marginLeft:'4em'}}>Back to Todos</button></NavLink>
    </div>

    
  );
}
