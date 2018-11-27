import React, { Component } from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
} from 'reactstrap';
import './Nav.css';

import { apiDelete } from '../functions/Api';
import { withRouter } from 'react-router-dom';


class Example extends Component {
	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
		this.toggle = this.toggle.bind(this);
		this.goto_login = this.goto_login.bind(this);

		this.state = {
			isOpen: false
		};
	}

	goto_login(event) {
		event.preventDefault();
		this.props.history.push('/login')
	}

	logout(event) {
		event.preventDefault();

		apiDelete('logout')
			.then(data => {
				console.log(data.data.status);
				if (data.data.status === "SUCCESS") {
					this.props.history.push('/');
					localStorage.removeItem('token');
					this.toggle()
				}
			})

			.catch((err) => {
				console.log(err.message);
			})
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {

		const logout_button = true
		let button;

		if (localStorage.getItem("token") === null){
			button = <NavLink onClick={this.goto_login}>Login</NavLink>
		}
		else {
			button = <NavLink onClick={this.logout}>Logout</NavLink>
		}

		return (
			<div className="Nav">
				<Navbar dark expand="md">
					<NavbarBrand href="/home">MealTime</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink href='/profile'>Profile</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="/favorites">Favorites</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="/enter-daily-data">Today's Items</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="/calendar">Calendar</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="/add-recipe">Add Recipe</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="/find-recipes">Find Recipes</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="/restaurants">Restaurants</NavLink>
							</NavItem>
							<NavItem>									
								{button}
							</NavItem>
					
						</Nav>
					</Collapse>
				</Navbar>
			</div>
		);
	}
}
export default withRouter(Example)