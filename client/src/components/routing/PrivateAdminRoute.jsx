import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateAdminRoute = ({ component: Component, ...rest }) => {
	const authContext = useContext(AuthContext);
	const { isAuthenticated, user } = authContext;
	let Admin = false;
	if (user) {
		Admin = user.isAdmin;
	}
	return (
		<Route
			{...rest}
			render={(props) =>
				!isAuthenticated && !Admin ? <Redirect to='/' /> : <Component {...props} />
			}
		/>
	);
};

export default PrivateAdminRoute;
