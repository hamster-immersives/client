import React, { Component } from 'react'

export default class Nav extends Component {

    state = {
        email: '',
        password: ''
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.props.handleSignUp(this.state);
    }

  render() {

    let isAuth;

    if (this.props.user ) {
        isAuth = (<div>{this.props.user}</div> )
    } else {
        isAuth = (
            <form className="form-inline" onSubmit={this.handleSubmit} ref={(node) => this.form = node}>
            <div className="form-group mb-2">
                <input type="text" className="form-control" name="email" placeholder="Email" onChange={this.handleInput} />
            </div>
            <div className="form-group mx-sm-3 mb-2">
                <input type="text" className="form-control" name="password" placeholder="Password" onChange={this.handleInput}/>
            </div>
            <button type="submit" className="btn btn-primary mb-2">Sign up/ Sign in</button>
         </form>
        )
    }
    return (
        <nav className="navbar navbar-light bg-light justify-content-between">
            <a className="navbar-brand">Navbar</a>

            {isAuth}


        </nav>
    )
  }
}


