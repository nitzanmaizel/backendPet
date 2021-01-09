import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
const MyPetsBar = () => {
	return (
		<Navbar
			bg='primary'
			variant='dark'
			className='rounded mx-auto mt-2'
			style={{ width: '18%' }}
		>
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='mr-auto text-center'>
					<Link className='navLink p-1 text-dark ' to='/mypets/savedpets'>
						Saved Pets
					</Link>
					<Link className='navLink p-1  text-dark' to='/mypets/userpets'>
						Own Pets
					</Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default MyPetsBar;
