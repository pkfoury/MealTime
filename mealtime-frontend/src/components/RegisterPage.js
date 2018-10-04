import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class RegisterPage extends Component {

    constructor(props) { 
        super(props);
        this.state = {};
        this.registerUser = this.registerUser.bind(this);
    }

    registerUser(event) {
        event.preventDefault();
        console.log(this.state.test);
        const userInfo = {};
        for (const entry in this.refs) {
            userInfo[entry] = this.refs[entry].value;
        }

        axios.post('http://0.0.0.0:3000/api/v1/users', userInfo)
            .then(({data}) => {
                console.log(data);
                // this.state.data.push(userInfo);
                // this.setState({
                //     data: this.state.data
                // });
            })

            .then((res) => {
                console.log('second request is okay');
            })

            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.registerUser}>
                    <div className="form-group">
                        <label for="Username">
                            Username:
                            <input type="text" className="form-control" id="userName" placeholder="Enter Username" />
                        </label>
                        <div />
                        <label for="Email">
                            Email:
                            <input type="text" className="form-control" id="email" placeholder="Your Email" />
                        </label>
                        <div />
                        <label for="Password">
                            Password:
                            <input type="text" className="form-control" id="password" placeholder="Password" />
                        </label>
                        <label>
                            Retype Password:
                            <input type="text" className="form-control" id="password_confirmation" placeholder="Retype Password" />
                        </label>
                        <div>
                            <input className="btn btn-primary btn-lg" type="submit" value="Submit" onClick={this.registerUser} />
                        </div>
                    </div>
                </form>

                <Link to='/login' activeClassName="active">Back to login</Link>
            </div>
        );
    }
}

export default RegisterPage;