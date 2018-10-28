import React, {Component} from 'react';
import {Link, BrowserRouter as Router, Route, Redirect, withRouter} from 'react-router-dom';
import axios from 'axios';
import { apiPost } from '../functions/Api';

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

    checkLogin () {
        axios.get('http://127.0.0.1:3000/api/v1/login')

        .then (({data}) => {
            console.log(data);
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const userInfo = {
            'user_name': this.state.username,
            'password': this.state.password,
        };


        apiPost('login', userInfo)
            .then(({data}) => {
                this.setState({
                    user: data
                });

                if (data.status == "SUCCESS") {
                    window.location = "/mainpage";
                    localStorage.setItem('token', data.data)
                }
            })

            .catch((err) => {
                if (err.response.status == 401) {
                    alert('Invalid username and password combination');
                }
                
                else {
                    alert("Not a login error, figure it out");
                }
            })
    }


    render () {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="Username">
                            Username:
                            <input type="text" className="form-control" placeholder="Enter Username" onChange={this.updateUsername} />
                        </label>
                        <div/>
                        <label htmlFor="Password">
                            Password:
                            <input type="password" className="form-control" placeholder="Enter Password" onChange={this.updatePassword} />
                        </label>
                        <div/>
                        <input className="btn btn-primary btn-lg" type="submit" value="Login" />
                    </div>
                </form>
                <Link to='/register' activeClassName="active">Don't have an account?</Link>
            </div>

        );
    }
}

export default LoginPage;