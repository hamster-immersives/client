import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { Nav, Task, TaskInput } from './components/container';

class App extends Component {
  state = {
    todo: [],
    user: null
  }

  componentDidMount() {
    let token = localStorage.getItem('jwtToken');
    if (token) {
      const currentTime = Date.now() / 1000;
      const decoded = jwt_decode(token);
      if (decoded.exp < currentTime) {
        localStorage.removeItem('jwtToken');
        this.setState({
          user: null
        })
      }

      this.setState({
        user: decoded.email
      }, () => {
        this.handleGetData(decoded.id)
      })

    }
  }

  handleGetData = (decodedID) => {
    axios.get(`http://localhost:3001/todo/getalltodos/${decodedID}`)
    .then( result => {
      console.log(result.data.todos)
      this.setState({
        todo: result.data.todos
      })

    })
    .catch(err => {
      console.log(err)
    })
  }

  handleSubmit = (task) => {
    
    let token = localStorage.getItem('jwtToken');
    const decoded = jwt_decode(token);

    let newTask = {
      todo: task,
      completed: false, 
      id: decoded.id
    }

    let axiosConfig = {
      headers: {
        "content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
      }
    }

    axios.post('http://localhost:3001/todo/createtodo', newTask, axiosConfig)
      .then(result => {
        let currentItem = Object.assign([], this.state.todo);
        currentItem.push(result.data);
        this.setState({
          todo: currentItem
        })
      })
      .catch(err => {
        console.log(err)
      })




  }

  handleDelete = (id) => {

    let updated = Object.assign([], this.state.todo);

    let updatedList = updated.filter((task) => 
      task._id !== id
    );
    this.setState({
      todo: updatedList
    })
  }
  handleToggle = () => {
    this.setState({
      toggle: !this.state.toggle
    })
  }
  handleEdit = (id, updatedValue) => {
    let updated = Object.assign([], this.state.todo);
    updated.map(todo => (todo.id === id ? todo.task = updatedValue : todo))
    this.setState({
      todo: updated
    })
  }

  handleChecked = (id) => {
    
    let updatedTasks = this.state.todo.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    })

    this.setState({
      todo: updatedTasks
    })

  }

  handleSignUp = (data) => {

    let axiosConfig = {
      headers: {
        "content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
      }
    }

    axios.post('http://localhost:3001/users/auth', data, axiosConfig)
      .then(result => {
        
        let { token } = result.data;

        const decoded = jwt_decode(token);

        localStorage.setItem('jwtToken', token);

        this.setState({
          user: decoded.email
        })

      })
      .catch(err => {
        console.log(err)
      })

  }

  logout = () => {
    localStorage.removeItem('jwtToken');
    this.setState({
      user: null
    })
  }

  render() {
    return (
      <div>
        <Nav 
          handleSignUp={this.handleSignUp} 
          user={this.state.user}
          logout={this.logout}
        />
        <TaskInput 
          handleSubmit={this.handleSubmit} 
        />
        <Task 
          {...this.state}
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
          handleChecked={this.handleChecked}
        />
      </div>
    );
  }
}

export default App;
