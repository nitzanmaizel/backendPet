import React, { useReducer } from 'react';
import UserContext from './userContext';
import UserReducer from './userReducer';
import axios from 'axios';
import { UPDATE_PROFILE, GET_USER_BY_ID, GET_ALL_USERS } from './userTypes';

const UserState = (props) => {
	const initialState = {
		userList: null,
		userCard: null,
	};

	const [state, dispatch] = useReducer(UserReducer, initialState);

	// Update Profile ==>
	const updateProfile = async (updateUser) => {
		console.log(updateUser);
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const body = JSON.stringify(updateUser);

		const res = await axios.put(`/api/users/${updateUser.id}`, body, config);
		dispatch({ type: UPDATE_PROFILE, payload: res.data });
	};

	// Get user by id ==>
	const getUserById = async (id) => {
		try {
			const res = await axios.get(`/api/users/${id}`);
			dispatch({ type: GET_USER_BY_ID, payload: res.data });
		} catch (err) {
			console.error(err.response);
		}
	};

	// Get all users ==>

	const getAllUsers = async () => {
		try {
			const res = await axios.get('/api/users');
			dispatch({ type: GET_ALL_USERS, payload: res.data });
		} catch (err) {
			console.error(err.massage);
		}
	};

	return (
		<UserContext.Provider
			value={{
				userList: state.userList,
				userCard: state.userCard,
				updateProfile,
				getUserById,
				getAllUsers,
			}}
		>
			{props.children}
		</UserContext.Provider>
	);
};

export default UserState;
