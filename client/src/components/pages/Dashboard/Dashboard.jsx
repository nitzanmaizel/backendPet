import React, { Fragment, useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminBar from '../../layout/AdminBar';
import PetContext from '../../../context/pets/petContext';
import UserContext from '../../../context/users/userContext';
import PetItem from '../My Pets/PetItem';
import { Container } from 'react-bootstrap';
import './Dashboard.css';
import UserItem from './userItem';
import UserProfile from './UserProfile';
const Dashboard = () => {
	const userContext = useContext(UserContext);
	const petContext = useContext(PetContext);
	const { getAllPets, petsList } = petContext;
	const { getAllUsers, userList } = userContext;

	useEffect(() => {
		const callData = async () => {
			getAllPets();
			getAllUsers();
		};
		callData();
	}, []);

	return (
		<Fragment>
			<Router>
				<AdminBar />
				<Container className='mt-3'>
					<Switch>
						<Route exact path='/dashboard/pets'>
							<div className='displayPetsList'>
								{petsList !== null &&
									petsList.map((pet) => <PetItem key={pet._id} pet={pet} />)}
							</div>
						</Route>
						<Route exact path='/dashboard/users'>
							<div className='displayPetsList'>
								{userList !== null &&
									userList.map((user) => <UserItem key={user._id} user={user} />)}
							</div>
						</Route>
						<Route path='/dashboard/users/:id' component={UserProfile} />
					</Switch>
				</Container>
			</Router>
		</Fragment>
	);
};
export default Dashboard;
