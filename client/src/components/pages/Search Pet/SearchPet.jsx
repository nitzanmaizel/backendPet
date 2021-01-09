import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Button, Col, Row, Collapse, Alert } from 'react-bootstrap';
import PetContext from '../../../context/pets/petContext';
import AdvanceSearch from './AdvanceSearch';
import BasicSearch from './BasicSearch';
import SearchResults from './SearchResults';

const SearchPet = () => {
	const petContext = useContext(PetContext);
	const { petsList } = petContext;

	const [open, setOpen] = useState(false);

	useEffect(() => {}, [petsList]);

	const openAdvanceSearch = () => {
		setOpen(open ? false : true);
	};

	return (
		<Fragment>
			<div className='text-center mt-2'>
				<h1>Search Pet</h1>
			</div>
			<Row className='justify-content-md-center'>
				<BasicSearch />
				<div className='ml-2 d-flex align-items-center'>
					<Button
						className='btn btn-info'
						aria-controls='AdvanceSearch'
						onClick={openAdvanceSearch}
					>
						Advance Search
					</Button>
				</div>
			</Row>
			<Collapse in={open}>
				<div id='AdvanceSearch'>
					<AdvanceSearch />
				</div>
			</Collapse>
			<Fragment>
				{petsList !== null &&
					petsList.map((pet) => <SearchResults key={pet._id} pet={pet} />)}
			</Fragment>
		</Fragment>
	);
};

export default SearchPet;
