import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import axios from 'axios';
import { LOGIN_USER, LOAD_USER, LOGOUT, SIGNUP_USER } from './authTypes';

const AuthState = (props) => {
	const initialState = {
		token: document.cookie,
		isAuthenticated: false,
		user: null,
	};

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	// Load User ==>

	const loadUser = async () => {
		if (document.cookie) {
			try {
				const res = await axios.get('/api/auth');
				dispatch({ type: LOAD_USER, payload: res.data });
			} catch (err) {
				console.error(err.response);
			}
		}
	};

	// Login User ==>
	const loginUser = async (user) => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const body = JSON.stringify(user);

			const res = await axios.post('/api/auth/login', body, config);
			dispatch({ type: LOGIN_USER, payload: res.data });
		} catch (err) {
			console.error(err.response);
		}
	};

	// Signup User ==>
	const signupUser = async (newUser) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const body = JSON.stringify(newUser);
		const res = await axios.post('/api/auth/signup', body, config);
		dispatch({ type: SIGNUP_USER, payload: res.data });
	};

	// Logout ==>
	const logoutUser = () => {
		document.cookie = 'auth_token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		dispatch({ type: LOGOUT });
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				user: state.user,
				loginUser,
				signupUser,
				loadUser,
				logoutUser,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
