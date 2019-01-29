import React, { Component } from 'react'
import TaskView from '../view/TaskView';

export default class Task extends Component {


	handleDelete = (id) => {
		this.props.handleDelete(id);
	}

	handleEdit = (id, updatedValue) => {
		this.props.handleEdit(id, updatedValue)
	}

  handleChecked = (id) => {
    this.props.handleChecked(id)
  }


  render() {
    
    const tasks = this.props.todo;

    let task = tasks.map(element => {
        return (
            <TaskView 
								key={element.id}
								id={element.id}
                todo={element}
								handleDelete={this.handleDelete}
                handleEdit={this.handleEdit}
                handleChecked={this.handleChecked}
            />
        )
    })

    return (
      <div>
        {task}
      </div>
    )
  }
}
