import React, { useState, useContext } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import PetContext from '../../../context/pets/petContext';
import AlertMsg from '../../utility/AlertMsg';

const BasicSearch = (props) => {
	const petContext = useContext(PetContext);
	const { searchPetByQueries } = petContext;
	const [type, setType] = useState('Dog');
	const [disable, setDisable] = useState(false);
	const [error, setError] = useState(null);

	const onSubmit = (e) => {
		e.preventDefault();
		try {
			setDisable(true);
			searchPetByQueries({ type });
			setTimeout(() => {
				setDisable(false);
			}, 1000);
		} catch (err) {
			console.log(err);
			setError(err.err);
		}
	};

	return (
		<Form className='mt-3' onSubmit={onSubmit}>
			<Row className='justify-content-md-center'>
				<Col xs={5} className='m-0 p-0'>
					<Form.Group>
						<Form.Control
							as='select'
							name='type'
							value={type}
							onChange={(e) => setType(e.target.value)}
						>
							<option defaultValue>Dog</option>
							<option>Cat</option>
						</Form.Control>
					</Form.Group>
				</Col>
				<Col md='auto'>
					<Button className='btn btn-secondary ' type='submit' disabled={disable}>
						Search
					</Button>
				</Col>
				<Col>{error !== null && <AlertMsg />}</Col>
			</Row>
		</Form>
	);
};

export default BasicSearch;
