import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { Nav, Task, TaskInput } from './components/container';

class App extends Component {
  state = {
    todo: [
      {
        task: "Buy Milk",
        completed: false,
        id: uuidv4()
      },
      {
        task: "Buy Pizza",
        completed: false,
        id: uuidv4()
      }
    ],
    user: null
  }
  handleSubmit = (task) => {
    let newItem = {
      task: task,
      completed: false, 
      id: uuidv4()
    }
    let currentItem = Object.assign([], this.state.todo);
    currentItem.push(newItem);
    this.setState({
      todo: currentItem
    })
  }

  handleDelete = (id) => {
    let updated = Object.assign([], this.state.todo);
    let updatedList = updated.filter((task) => 
      task.id !== id
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

  render() {
    return (
      <div>
        <Nav 
          handleSignUp={this.handleSignUp} 
          user={this.state.user}
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
