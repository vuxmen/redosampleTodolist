import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/Login';
import TodoList from './components/TodoList';

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path = "/" exact component = {Login} />
                <Route path = "/TodoList/:name" component = {TodoList} />
            </Switch>
        </Router>
    );
}