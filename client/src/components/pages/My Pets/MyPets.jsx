import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import UserPetsBar from '../../layout/UserPetsBar';
import axios from 'axios';
import { Container } from 'react-bootstrap';

import PetItem from './PetItem';
import MyPetsBar from '../../layout/MyPetsBar';
import './Mypets.css';
// import PetItem from '../SearchPet/PetItem';
import { Link, useRouteMatch } from 'react-router-dom';

const MyPets = () => {
	const match = useRouteMatch();
	console.log('/mypets', match);
	const [savedPets, setSavedPets] = useState([]);
	const [userPets, setUserPets] = useState([]);

	useEffect(() => {
		const getSavePets = async () => {
			try {
				const res = await axios.get('/api/pets/mypets/all');
				setSavedPets(res.data.saved);
				setUserPets(res.data.userPet);
			} catch (err) {
				console.error(err.massage);
			}
		};
		getSavePets();
	}, []);
	return (
		<Fragment>
			<Router>
				<MyPetsBar />
				<Container className='mt-2'>
					<Switch>
						<Route path='/mypets/userpets'>
							<div className='displayPetsList'>
								{userPets.map((pet) => (
									<PetItem key={pet._id} pet={pet} />
								))}
							</div>
						</Route>

						<Route path='/mypets/savedpets'>
							<div className='displayPetsList'>
								{savedPets.map((pet) => (
									<PetItem key={pet._id} pet={pet} />
								))}
							</div>
						</Route>
					</Switch>
				</Container>
			</Router>
		</Fragment>
	);
};

export default MyPets;
