import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
export default function Todos() {

  const [todos, setTodos] = useState();
  const [searchTodo, setSearchTodo] = useState('');
  const { id } = useParams();
  useEffect(() => {
    axios.get(` https://jsonplaceholder.typicode.com/todos`).then(res => {
      setTodos(res.data);
    });
  }, []);
  let history = useHistory();

  return (
    <>
      <div className="search-div ">
        <h1>Todos</h1>
        <input type="text" placeholder="Search by title.." onChange={(e) => {
          setSearchTodo(e.target.value);
        }} />
      </div>

      <div className="main-content">
        {todos ? (
          <div>
            <table>
              <tbody>
                <tr>
                  <th>Todo ID</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
                {todos.filter((item) => {
                  if (searchTodo == "") {
                    return item;
                  }
                  else if (item.title.toLowerCase().includes(searchTodo.toLowerCase())) {
                    return item;
                  }
                }).map((item,index )=> (
                  <>
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.completed ? <p>Completed</p>:<p>Not Completed</p>}</td>
                      <td>
                        <button
                          onClick={() => history.push(`/todo/${item.id}`)}
                          className="view-btn "
                        >
                          View User
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h1>Loading..</h1>
        )}
      </div>

    </>
  );
}