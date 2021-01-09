import React, { useState, useContext } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import PetContext from '../../../context/pets/petContext';
export default function AdvanceSearch(props) {
	const petContext = useContext(PetContext);
	const { searchPetByQueries } = petContext;
	const [formData, setFormData] = useState({
		adoptionStatus: 'Available',
		height: '',
		weight: '',
		type: 'Dog',
		name: '',
	});
	const [disable, setDisable] = useState(false);

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmitForm = (e) => {
		e.preventDefault();
		setDisable(true);
		searchPetByQueries(formData);
		setTimeout(() => {
			setDisable(false);
		}, 1000);
	};

	const { type, name, adoptionStatus, height, weight } = formData;

	return (
		<Form
			onSubmit={(e) => {
				onSubmitForm(e);
			}}
		>
			<Row className='m-0 p-0'>
				<Col className='col'>
					<Form.Group>
						<Form.Control
							as='select'
							value={adoptionStatus}
							name='adoptionStatus'
							placeholder='Adopted, Fostered, Available'
							onChange={(e) => onChange(e)}
						>
							<option>Available</option>
							<option>Fostered</option>
							<option>Adopted</option>
						</Form.Control>
					</Form.Group>
				</Col>
				<Col className='col'>
					<Form.Group className='m-0'>
						<Form.Control
							type='text'
							value={height}
							name='height'
							placeholder='Height'
							onChange={(e) => onChange(e)}
						></Form.Control>
					</Form.Group>
				</Col>
				<Col className='col'>
					<Form.Group className='m-0'>
						<Form.Control
							type='text'
							name='weight'
							placeholder='Weight'
							value={weight}
							onChange={(e) => onChange(e)}
						></Form.Control>
					</Form.Group>
				</Col>
				<Col className='col'>
					<Form.Group className='m-0'>
						<Form.Control
							as='select'
							name='type'
							value={type}
							onChange={(e) => onChange(e)}
						>
							<option defaultValue>Dog</option>
							<option>Cat</option>
						</Form.Control>
					</Form.Group>
				</Col>
				<Col className='col'>
					<Form.Group className='m-0'>
						<Form.Control
							type='text'
							name='name'
							placeholder='Name'
							value={name}
							onChange={(e) => onChange(e)}
						></Form.Control>
					</Form.Group>
				</Col>
				<Col className='col' md='auto'>
					<Button className='btn btn-primary' type='submit' disabled={disable}>
						Search
					</Button>
				</Col>
			</Row>
		</Form>
	);
}
