import React from 'react';
import './style.css';
import Todos from './Todos';
import Todo from './Todo';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" children={<Todos />} />
          <Route path="/todo/:id" children={<Todo />} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
