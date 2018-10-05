import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class LoginPage extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateUsername (e) {
        this.setState({ username: e.target.value });
    }

    updatePassword (e) {
        this.setState({ password: e.target.value });
    }

    handleSubmit (event) {
        event.preventDefault()
        console.log(this.state);
    }

    render () {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label for="Username">
                            Username:
                            <input type="text" className="form-control" placeholder="Enter Username" onChange={this.updateUsername} />
                        </label>
                        <div/>
                        <label for="Password">
                            Password:
                            <input type="text" className="form-control" placeholder="Enter Password" onChange={this.updatePassword} />
                        </label>
                        <div/>
                        <input className="btn btn-primary btn-lg" type="submit" value="Submit" />
                    </div>
                </form>
                <Link to='/register' activeClassName="active">Don't have an account?</Link>
            </div>

        );
    }
}

export default LoginPage;