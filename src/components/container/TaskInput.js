import React, { Component } from 'react'

export default class TaskInput extends Component {
	state = {
		task: ''
	}

	handleInput = (event) => {
		this.setState({
			task: event.target.value
		})
	}

	handleSubmit = (event) => {
			event.preventDefault();

			this.props.handleSubmit(this.state.task)
			
			this.formSubmit.reset();
	}

  render() {
    return (
        <form onSubmit={this.handleSubmit} ref={ (el) => this.formSubmit = el }>
            <input 
           		 text="task" 
           			onChange={this.handleInput}
            	/>
            <button>Submit</button>
      </form>
    )
  }
}
