import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class LoginPage extends Component {
    constructor () {
        super()
        this.state = {
            userName: '',
            password: ''
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick () {
        
    }

    render () {
        return (
            <div>
                <form>
                    <div className="form-group">
                        <label for="Username">
                            Username:
                            <input type="text" className="form-control" id="exampleUsername" placeholder="Enter Username" userName="Username"/>
                        </label>
                        <div/>
                        <label for="Password">
                            Password:
                            <input type="text" className="form-control" id="password" placeholder="Enter Password" password="Password"/>
                        </label>
                        <div/>
                        <input className="btn btn-primary btn-lg" type="submit" value="Submit" />
                    </div>
                </form>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
                integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
                crossorigin="anonymous" ></ link>

                <Link to='/register' activeClassName="active">Don't have an account?</Link>
            </div>

        );
    }
}

export default LoginPage;