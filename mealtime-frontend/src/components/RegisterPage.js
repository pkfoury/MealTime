import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class RegisterPage extends Component {

    registerUser() {
/*        const userInfo = {};
        for (const entry in this.refs) {
            userInfo[entry] = this.refs[entry].value;
        }

        axios.post('../../../../Mealtime/app/controllers/api/v1/users', userInfo)
        .then ((res) => {
            this.state.data.push(userInfo);
            this.setState({
                data: this.state.data
            });
            return axios.post('../../../../Mealtime/app/controllers/api/v1/users', userInfo);
        })

        .then((res) => {
            console.log('second request is okay');
        })

        .catch((err) => {
            console.log(err);
        })*/
    }

    render() {
        return (
            <div>
                <form onSubmit = {this.registerUser}>
                    <div class="form-group">
                        <label for="Username">
                            Username:
                            <input type="text" class="form-control" id="userName" placeholder="Enter Username" />
                        </label>
                        <div/>
                        <label for="Email">
                            Email:
                            <input type="text" class="form-control" id="email" placeholder="Your Email" />
                        </label>
                        <div/>
                        <label for="Password">
                            Password:
                            <input type="text" class="form-control" id="password" placeholder="Password" />
                        </label>
                        <label>
                            Retype Password:
                            <input type="text" class="form-control" id="password_confirmation" placeholder="Retype Password" />
                        </label>
                        <div>
                            <input class="btn btn-primary btn-lg" type="submit" value="Submit" onClick="get_info()"/>
                        </div>
                    </div>
                </form>

                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
                integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
                crossorigin="anonymous" ></ link>

                <Link to='/login' activeClassName="active">Back to login</Link>
            </div>    
        );
    }
}

export default RegisterPage;