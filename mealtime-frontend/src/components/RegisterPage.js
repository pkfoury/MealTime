import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class RegisterPage extends Component {

    constructor(props) { 
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        };
        this.updateUsername = this.updateUsername.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
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


    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        // const userInfo = {};
        // for (const entry in this.refs) {
        //     userInfo[entry] = this.refs[entry].value;
        // }

        // axios.post('http://0.0.0.0:3000/api/v1/users', userInfo)
        //     .then(({data}) => {
        //         console.log(data);
        //         // this.state.data.push(userInfo);
        //         // this.setState({
        //         //     data: this.state.data
        //         // });
        //     })

        //     .then((res) => {
        //         console.log('second request is okay');
        //     })

        //     .catch((err) => {
        //         console.log(err);
        //     })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label for="Username">
                            Username:
                            <input type="text" className="form-control" id="userName" placeholder="Enter Username" onChange={this.updateUsername} />
                        </label>
                        <div />
                        <label for="Email">
                            Email:
                            <input type="text" className="form-control" id="email" placeholder="Your Email" onChange={this.updateEmail} />
                        </label>
                        <div />
                        <label for="Password">
                            Password:
                            <input type="text" className="form-control" id="password" placeholder="Password" onChange={this.updatePassword} />
                        </label>
                        <label>
                            Retype Password:
                            <input type="text" className="form-control" id="password_confirmation" placeholder="Retype Password" />
                        </label>
                        <div>
                            <input className="btn btn-primary btn-lg" type="submit" value="Submit"/>
                        </div>
                    </div>
                </form>

                <Link to='/login' activeClassName="active">Back to login</Link>
            </div>
        );
    }
}

export default RegisterPage;