import {
	ADD_PET,
	UPDATE_PET,
	SAVE_PET,
	UNSAVE_PET,
	GET_ALL_PETS,
	GET_USER_PETS,
	SEARCH_PETS,
	GET_PET_BY_ID,
} from './petTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
	switch (action.type) {
		case ADD_PET:
			return {
				...state,
				currentPet: action.payload,
			};
		case UPDATE_PET:
			return {
				...state,
				currentPet: action.payload,
			};
		case SAVE_PET:
			return {
				...state,
				currentPet: action.payload,
			};
		case UNSAVE_PET:
			return {
				...state,
				currentPet: null,
			};
		case GET_ALL_PETS:
			return {
				...state,
				petsList: action.payload,
			};
		case GET_PET_BY_ID:
			return {
				...state,
				currentPet: action.payload,
			};
		case GET_USER_PETS:
			return {
				...state,
				userPets: action.payload,
			};
		case SEARCH_PETS:
			return {
				...state,
				petsList: action.payload,
			};
		default:
			return state;
	}
};
