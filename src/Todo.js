import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams,NavLink } from 'react-router-dom';
export default function Todo() {
  const {id} = useParams();
  const [todoDetails, setTodoDetails] = useState({});
  const [todoDetails1, setTodoDetails1] = useState({});
  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res => {
      setTodoDetails(res.data);
    axios.get(`https://jsonplaceholder.typicode.com/users/${res.data.userId}`).then(res => {
        setTodoDetails1(res.data);
      });
    });
  }, []);
  const {  userId:userID, title, } = todoDetails;
  const { id:ID,name, email } = todoDetails1;
  
  return (
    <div>
      <h1 className="user-details">User Details</h1>
       <div className="todo-container">
         <table>
           <tr>
             <th>Todo Id</th>
             <th>Todo Title</th>
             <th>User Id</th>
             <th>Name</th>
             <th>Email</th>
           </tr>
           <tr>
            <td>{`${id}`}</td>
            <td>{`${title}`}</td>
            <td>{`${userID}`}</td>
            <td>{`${name}`}</td>
            <td>{`${email}`}</td>
           </tr>
         </table>
        </div>
        <div style={{width:'75%',margin:'auto'}}>
         <NavLink to="/"><button className="view-btn" style={{padding:'0.5em 1em'}}>Back to Todos</button></NavLink>
        </div>
    </div>

    
  );
}
