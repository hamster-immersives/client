import React, { Component } from 'react';
import './TaskView.css'
import { checkboxStyle } from './TaskStyle';

class TaskView extends Component {

    state = {
        toggle: false,
        currentState: ''
    }

    componentDidMount () {
        this.setState({
            currentState: this.props.todo.task
        })
    }

    handleDelete = (id) => {
        this.props.handleDelete(id)
    }

    handleEdit = (id) => {
        this.setState(prevState => ({    // prevState?
            toggle: !prevState.toggle
        }), () => {
            this.props.handleEdit(id, this.state.currentState)
        });
    }
    
    handleInputChange = () => {
        this.setState({
            currentState: this.refs.updatedText.value
        })
    }

    handleChecked = (id) => {
        this.props.handleChecked(id)
    }

    render(){
      
        return (
            <li className="list-group-item">
                  { this.state.toggle ? <input 
                    type="text" 
                    ref="updatedText"
                    value={this.state.currentState} 
                    style={{textAlign: 'center'}} 
                    onChange={this.handleInputChange.bind(this)}
                    />  : `Something I need to do: ${this.props.todo.task}` }
                <input 
                    type="button" 
                    className="float-right btn btn-danger btn-sm" 
                    value="delete" 
                    style={{textAlign: 'center', marginLeft: 5}} 
                    onClick={this.handleDelete.bind(this, this.props.todo.id)}
                    />
                <input 
                    type="button" 
                    className="float-right btn btn-info btn-sm" 
                    value="edit" 
                    style={{textAlign: 'center'}} 
                    onClick={this.handleEdit.bind(this, this.props.id)}
                    />   

                <input 
                    type="checkbox"
                    className="float-right"
                    style={checkboxStyle}
                    checked={true}
                    onChange={this.handleChecked.bind(this, this.props.id)}
                    />
              
            </li>
        )
    }
}

const styles = {
    checkboxStyle: {
        margin: '7px 5px'
    }
}

export default TaskView;