import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RegistrationForm from './Registration';
import NavBar from './NavBar';
import Users from './UserList'
import UserList from './UserList';
import Landing from "./Landing";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./Login";

class App extends Component {

  render() {
    return (
      <Router>
        <div class="App">
          <NavBar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={RegistrationForm} />
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
      // <div>
      //   <NavBar />
      //   {/* <UserList /> */}
      //   {/* <RegistrationForm /> */}
      //   <Landing />
      // </div>

    );
  }
}
export default App;
