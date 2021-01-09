import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, useRouteMatch } from 'react-router-dom';

const UsersPetsBar = () => {
	const match = useRouteMatch();

	return (
		<Navbar
			bg='primary'
			variant='dark'
			className='rounded mx-auto mt-2'
			style={{ width: '19%' }}
		>
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='mr-auto text-center'>
					<Link className='navLink p-1 text-dark ' to={`${match.url}/saved`}>
						Saved Pets
					</Link>
					<Link className='navLink p-1  text-dark' to={`${match.url}/own`}>
						Own Pets
					</Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default UsersPetsBar;
