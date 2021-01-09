import React, { Fragment, useContext } from 'react';
import { Navbar, Nav, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import Login from '../auth/Login';
import Logout from '../auth/Logout';
import SignUp from '../auth/SignUp';

const NavBar = () => {
	const authContext = useContext(AuthContext);
	const { user } = authContext;
	let admin = user ? user.isAdmin : false;

	return (
		<Fragment>
			<Navbar bg='primary' variant='dark'>
				<Navbar.Brand href='/'>Pet-Adoption</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='mr-auto'>
						<Link className='text-dark p-3' to='/'>
							Home
						</Link>
						{user && (
							<Link className='text-dark p-3' to='/searchpet'>
								Search Pet
							</Link>
						)}
						{user && (
							<Link className='text-dark p-3' to='/mypets/savedpets'>
								My Pets
							</Link>
						)}
						{user && (
							<Link className='text-dark p-3' to='/profilesettings'>
								Profile Setting
							</Link>
						)}
					</Nav>
					<Form inline>
						{admin && (
							<Link className='text-dark p-1 ml-1' to='/addpet'>
								Add pet
							</Link>
						)}
					</Form>
					<Form inline>
						{admin && (
							<Link className='text-dark p-3' to='/dashboard'>
								Dashboard
							</Link>
						)}
					</Form>
					<Form inline>{!user && <SignUp />}</Form>
					<Form inline>{!user && <Login />}</Form>
					<Form inline>{user && <Logout />}</Form>
				</Navbar.Collapse>
			</Navbar>
		</Fragment>
	);
};

export default NavBar;
