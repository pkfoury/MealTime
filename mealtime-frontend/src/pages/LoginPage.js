import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { apiPost } from '../functions/Api';

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

    updateUsername(e) {
        this.setState({ username: e.target.value });
    }

    updatePassword(e) {
        this.setState({ password: e.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const userInfo = {
            'user_name': this.state.username,
            'password': this.state.password,
        };

        apiPost('login', userInfo)
            .then(({ data }) => {
                this.setState({
                    user: data
                });

                if (data.status === "SUCCESS") {
                    sessionStorage.setItem('token', data.data);
                    const expiration = Date.now() + 1200000;
                    sessionStorage.setItem('expiration', expiration);
                    this.props.history.push('/home');
                }
            })
            
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    alert('Invalid username and password combination');
                }
                else {
                    alert("Not a login error, figure it out");
                    console.log(err.message);
                }
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="Username">
                            Username:
                            <input type="text" className="form-control" placeholder="Enter Username" onChange={this.updateUsername} />
                        </label>
                        <div />
                        <label htmlFor="Password">
                            Password:
                            <input type="password" className="form-control" placeholder="Enter Password" onChange={this.updatePassword} />
                        </label>
                        <div />
                        <input className="btn btn-primary btn-lg" type="submit" value="Login" />
                    </div>
                </form>
                <Link to='/register' className="active">Don't have an account?</Link>
            </div>

        );
    }
}

export default LoginPage;
