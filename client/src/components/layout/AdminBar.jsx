import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

export default function AdminBar() {
	return (
		<Navbar
			bg='primary'
			variant='dark'
			className='rounded mx-auto mt-3'
			style={{ width: '11%' }}
		>
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='mr-auto text-center'>
					<Link className='navLink p-1 text-dark' to='/dashboard/users'>
						Users
					</Link>
					<Link className='navLink p-1 text-dark ' to='/dashboard/pets'>
						Pets
					</Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}
