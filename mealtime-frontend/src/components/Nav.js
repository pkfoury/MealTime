import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

import { apiDelete } from '../functions/Api';
import { withRouter } from 'react-router';

export default class Example extends Component {
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
			this.history.push('/login');
			localStorage.removeItem('token');
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
					{/* <NavLink onClick={this.logout}>Logout</NavLink> */}
				</NavItem>
				<UncontrolledDropdown nav inNavbar>
					<DropdownToggle nav caret>
					Options
					</DropdownToggle>
					<DropdownMenu right>
					<DropdownItem>
						Option 1
					</DropdownItem>
					<DropdownItem>
						Option 2
					</DropdownItem>
					<DropdownItem divider />
					</DropdownMenu>
				</UncontrolledDropdown>
				</Nav>
			</Collapse>
			</Navbar>
		</div>
		);
	}
}
