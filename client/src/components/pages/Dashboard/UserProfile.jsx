import React, { Fragment, useContext, useState, useEffect } from 'react';
import { Switch, Route, useParams, useRouteMatch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import UsersPetsBar from '../../layout/UsersPetsBar';
import UserContext from '../../../context/users/userContext';
import PetItem from '../My Pets/PetItem';

const UserProfile = () => {
	const userContext = useContext(UserContext);
	const { getUserById, userCard } = userContext;

	let { id } = useParams();
	const match = useRouteMatch();
	console.log(match);

	const userID = id;

	useEffect(() => {
		const callUser = async () => {
			getUserById(userID);

			console.log(userCard);
		};
		callUser();
	}, []);

	return (
		<Fragment>
			<UsersPetsBar />
			<Container className='mt-2'>
				<Switch>
					<Route exact path={`${match.path}/saved`}>
						<div className='displayPetsList'>
							{userCard !== null &&
								userCard.userPets.map((pet) => <PetItem key={pet._id} pet={pet} />)}
						</div>
					</Route>

					<Route exact path={`${match.path}/own`}>
						<div className='displayPetsList'>
							{userCard !== null &&
								userCard.savedPets.map((pet) => <PetItem key={pet._id} pet={pet} />)}
						</div>
					</Route>
				</Switch>
			</Container>
		</Fragment>
	);
};

export default UserProfile;
