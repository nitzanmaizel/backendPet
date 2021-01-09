import { UPDATE_PROFILE, GET_USER_BY_ID, GET_ALL_USERS } from './userTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
	switch (action.type) {
		case UPDATE_PROFILE:
			return {
				...state,
				userCard: action.payload,
			};
		case GET_USER_BY_ID:
			return {
				...state,
				userCard: action.payload,
			};
		case GET_ALL_USERS:
			return {
				...state,
				userList: action.payload,
			};
		default:
			return state;
	}
};
