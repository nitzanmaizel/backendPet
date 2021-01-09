import React, { Fragment, useState, useEffect, useContext } from 'react';
import AuthContext from '../../../context/auth/authContext';

const Home = () => {
	const authContext = useContext(AuthContext);
	const { user } = authContext;

	let name = user ? `${user.firstName} ${user.lastName}` : '';

	return (
		<Fragment>
			<div className='h1 p-0 mt-2 text-center'>{`Welcome ${name}`}</div>
		</Fragment>
	);
};

export default Home;
