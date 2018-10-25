import React, {Component} from 'react';
import {Link, BrowserRouter as Router, Route, Redirect, withRouter} from 'react-router-dom';
import axios from 'axios';

//TODO 
//Figure out how to route to the main page :(

class LoginPage extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            showPopup: false,
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

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        const userInfo = {
            'user_name': this.state.username,
            'password': this.state.password,

        };

        axios.post('http://127.0.0.1:3000/api/v1/login', userInfo)

            // On success the data will be printed

            .then(({data}) => {       
                this.setState({
                    user: data
                });
                console.log(data.data);
                
            })

            .catch((err) => {
                if (err.response) {
                    console.log('Error caught');
                    alert('Invalid username and password combination');
                }
            })
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
                            <input type="password" className="form-control" placeholder="Enter Password" onChange={this.updatePassword} />
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