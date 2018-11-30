import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { apiPost } from '../functions/Api';

class RegisterPage extends Component {

    constructor(props) { 
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            password_confirmation: '',
        };
        this.updateUsername = this.updateUsername.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updatePasswordConfirm = this.updatePasswordConfirm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateUsername (e) {
        this.setState({ username: e.target.value });
    }

    updateEmail (e) {
        this.setState({ email: e.target.value });
    }

    updatePassword (e) {
        this.setState({ password: e.target.value });
    }

    updatePasswordConfirm (e) {
        this.setState({ password_confirmation: e.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        const userInfo = {
            'user_name': this.state.username,
            'email': this.state.email,
            'password': this.state.password,
            'password_confirmation': this.state.password_confirmation
        };

        axios.post('http://127.0.0.1:3000/api/v1/users', userInfo)
            .then(({data}) => {
                console.log(data);
                this.setState({
                    user: data
                });

                var user_id = data.id;

                if (data.message === "User Created") {

                    apiPost('login', userInfo)
                    .then(({data}) => {
                        if (data.status === "SUCCESS") {
                            sessionStorage.setItem('token', data.data);
                            this.props.history.push('/first-time-user/' + user_id);
                        }
                    })

                }
            })

            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="Username">
                            Username:
                            <input type="text" className="form-control" id="userName" placeholder="Enter Username" onChange={this.updateUsername} />
                        </label>
                        <div />
                        <label htmlFor="Email">
                            Email:
                            <input type="text" className="form-control" id="email" placeholder="Your Email" onChange={this.updateEmail} />
                        </label>
                        <div />
                        <label htmlFor="Password">
                            Password:
                            <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.updatePassword} />
                        </label>
                        <label>
                            Retype Password:
                            <input type="password" className="form-control" id="password_confirmation" placeholder="Retype Password" onChange={this.updatePasswordConfirm} />
                        </label>
                        <div>
                            <input className="btn btn-primary btn-lg" type="submit" value="Submit"/>
                        </div>
                    </div>
                </form>

                <Link to='/login' className="active">Back to login</Link>
            </div>
        );
    }
}

export default RegisterPage;