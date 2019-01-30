import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import { Container } from 'reactstrap';
import { Switch, Route } from 'react-router-dom';
import Login from './container/Login';
import Register from './container/Register';
import Main from './container/Main';
class App extends Component {

  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={Main} />
      </Switch>
    );
  }
}

export default App;
