import React, { Fragment, useContext } from 'react';
import AuthContext from '../../../context/auth/authContext';
import { Link } from 'react-router-dom';

const Home = () => {
	const authContext = useContext(AuthContext);
	const { user } = authContext;

	let name = user ? `${user.firstName} ${user.lastName}` : '';

	return (
		<Fragment>
			<div className='h1 p-0 mt-2 text-center'>{`Welcome ${name}`}</div>
			<div className='row'>
				<div className='h3 mt-3'>
					There are so many loving adoptable pets right in your community waiting for a
					family to call their own. Find your new best friend below
				</div>
			</div>
			<div className='row p-3 align-items-center'>
				<div className='col box-quote '>
					“Dogs have given us their absolute all. We are the center of their universe. We
					are the focus of their love and faith and trust. They serve us in return for
					scraps. It is without a doubt the best deal man has ever made. ” – Roger A.
					Caras
				</div>
				<div className='col box-quote'>
					“Cats have it all: admiration, an endless sleep, and company only when they want
					it. ” - Rod McKuen
				</div>
				<div className='col box-quote '>
					“A DOG is the ONLY THING on earth that LOVE YOU MORE than he loves HIMSELF ” -
					Josh Billings
				</div>
				<div className='col box-quote'>
					“I have felt cats rubbing their faces against mine and touching my cheek with
					claws carefully sheathed. These things, to me, are expressions of love.” – James
					Herriot
				</div>
			</div>
			<div className='text-center mt-5'>
				<Link className='h1' to='/searchPet'>
					Find your new BEST FRIEND!!! :)
				</Link>
			</div>
		</Fragment>
	);
};

export default Home;
