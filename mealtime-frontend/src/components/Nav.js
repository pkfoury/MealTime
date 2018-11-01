import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem 
} from 'reactstrap';

import { apiDelete } from '../functions/Api';
import { withRouter } from 'react-router-dom';

<<<<<<< HEAD
class Example extends Component {
=======

export default class Example extends Component {
>>>>>>> master
	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this)
		this.toggle = this.toggle.bind(this);

		this.state = {
			isOpen: false
		};
	}
	
	logout (event) {
		event.preventDefault();

		apiDelete('logout')
		.then( data => {
			console.log(data.data.status);
			if (data.data.status === "SUCCESS") {
<<<<<<< HEAD
				this.props.history.push('/');
				localStorage.removeItem('token');
				this.toggle()
=======
				this.history.push('/login');
				localStorage.removeItem('token');
>>>>>>> master
			}
		})

		.catch((err) =>{
			console.log(err.message);
		})
	}

	toggle() {
		this.setState({
		isOpen: !this.state.isOpen
		});
	}

	render() {
		return (
		<div>
			<Navbar color="light" light expand="md">
			<NavbarBrand href="/mainpage">MealTime</NavbarBrand>
			<NavbarToggler onClick={this.toggle} />
			<Collapse isOpen={this.state.isOpen} navbar>
				<Nav className="ml-auto" navbar>
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
					<NavLink href="/restaurants">Restaurants</NavLink>
				</NavItem>
				<NavItem>
					<NavLink onClick={this.logout}>Logout</NavLink>
				</NavItem>
				</Nav>
			</Collapse>
			</Navbar>
		</div>
		);
	}
}
export default withRouter(Example)