import { LOGIN_USER, LOAD_USER, LOGOUT, SIGNUP_USER } from './authTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
	switch (action.type) {
		case SIGNUP_USER:
		case LOGIN_USER:
			return {
				...state,
				token: action.payload.token,
				isAuthenticated: true,
			};
		case LOAD_USER:
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
			};
		case LOGOUT:
			return {
				...state,
				user: null,
				isAuthenticated: false,
				token: null,
			};
		default:
			return state;
	}
};
