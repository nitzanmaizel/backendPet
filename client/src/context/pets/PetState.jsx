import React, { useReducer } from 'react';
import PetContext from './petContext';
import PetReducer from './petReducer';
import axios from 'axios';
import {
	ADD_PET,
	UPDATE_PET,
	SAVE_PET,
	UNSAVE_PET,
	GET_ALL_PETS,
	GET_USER_SAVED_PETS,
	SEARCH_PETS,
	GET_USER_PETS,
	GET_PET_BY_ID,
} from './petTypes';

const PetState = (props) => {
	const initialState = {
		petsList: null,
		userPets: null,
		currentPet: null,
	};

	const [state, dispatch] = useReducer(PetReducer, initialState);

	// Get all pets ==>

	const getAllPets = async () => {
		try {
			const res = await axios.get(`/api/pets/all`);
			dispatch({ type: GET_ALL_PETS, payload: res.data });
		} catch (err) {
			console.error(err.massage);
		}
	};

	// Get pet by ID  ==>

	const getPetById = async (petID) => {
		try {
			const res = await axios.get(`/api/pets/${petID}`);
			dispatch({ type: GET_PET_BY_ID, payload: res.data });
		} catch (err) {
			console.error(err.response);
		}
	};

	// Get user Saved pets ==>

	const getUserPets = async () => {
		try {
			const res = await axios.get('/api/pets/mypets/all');
			dispatch({ type: GET_USER_PETS, payload: res.data });
		} catch (err) {
			console.error(err.massage);
		}
	};
	// Get user own pets ==>

	// Add pet ==>
	const addPet = async (newPet) => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const body = JSON.stringify(newPet);
			await axios.post('/api/pets/addpet', body, config);
		} catch (err) {
			console.error(err.response);
		}
	};

	// Update pet ==>

	// Save pet to savedPets collection ==>
	const savePet = async (petID) => {
		try {
			await axios.get(`/api/pets/save/${petID}`);
		} catch (err) {
			console.error(err.response);
		}
	};

	// UnSave pet from savedPets collection ==>

	// Search pets by query ==>
	const searchPetByQueries = async ({
		adoptionStatus = '',
		height = '',
		weight = '',
		name = '',
		type = '',
	}) => {
		// const { adoptionStatus, height, weight, name } = searchQueries;
		const res = await axios.get(
			`/api/pets/search?adoptionStatus=${adoptionStatus}&height=${height}&weight=${weight}&type=${type}&name=${name}`
		);
		dispatch({ type: SEARCH_PETS, payload: res.data });
	};

	return (
		<PetContext.Provider
			value={{
				petsList: state.petsList,
				userPets: state.userPets,
				currentPet: state.currentPet,
				getAllPets,
				getPetById,
				searchPetByQueries,
				getUserPets,
				addPet,
				savePet,
			}}
		>
			{props.children}
		</PetContext.Provider>
	);
};

export default PetState;
