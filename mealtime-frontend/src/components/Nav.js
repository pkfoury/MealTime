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
					sessionStorage.removeItem('token');
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
		let button, profile, favorites, today, cal, add, find, rest;

		if (sessionStorage.getItem("token") === null){
			button = <NavLink onClick={this.goto_login}>Login</NavLink>
		}
		else {
			profile = <NavLink href='/profile'>Profile</NavLink>
			favorites = <NavLink href="/favorites">Favorites</NavLink>
			today = <NavLink href="/enter-daily-data">Today's Items</NavLink>
			cal = <NavLink href="/calendar">Calendar</NavLink>
			add = <NavLink href="/add-recipe">Add Recipe</NavLink>
			find = <NavLink href="/find-recipes">Find Recipes</NavLink>
			rest = <NavLink href="/restaurants">Restaurants</NavLink>
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
								{profile}
							</NavItem>
							<NavItem>
								{favorites}
							</NavItem>
							<NavItem>
								{today}
							</NavItem>
							<NavItem>
								{cal}
							</NavItem>
							<NavItem>
								{add}
							</NavItem>
							<NavItem>
								{find}
							</NavItem>
							<NavItem>
								{rest}
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
