import React, { useState, useContext } from 'react';
import { Form, Button, Card, Col, Row, Image } from 'react-bootstrap';
import LoadingSpinner from '../../utility/LoadingSpinner';
import PetContext from '../../../context/pets/petContext';

const AddPet = () => {
	const petContext = useContext(PetContext);
	const { addPet, currentPet } = petContext;

	const [formData, setFormData] = useState({
		type: currentPet.type || 'Dog',
		name: currentPet.name || '',
		adoptionStatus: currentPet.adoptionStatus || 'Available',
		height: currentPet.height || 0,
		weight: currentPet.weight || 0,
		color: currentPet.color || '',
		bio: currentPet.bio || '',
		dietaryRestrictions: currentPet.dietaryRestrictions || '',
		breed: currentPet.breed || '',
		hypoallergenic: currentPet.hypoallergenic || false,
	});
	const [imageState, setImageState] = useState('');
	const [previewPetImage, setPreviewPetImage] = useState(currentPet.petImage || '');
	const [petImage, setPetImage] = useState();

	const [disabled, setDisabled] = useState(false);
	const [loading, setLoading] = useState(false);

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleImageState = (e) => {
		const file = e.target.files[0];
		previewFile(file);
		setPetImage(file);
	};

	const previewFile = async (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewPetImage(reader.result);
		};
	};

	const onSubmitForm = async (e) => {
		e.preventDefault();
		setLoading(true);
		setDisabled(true);
		const reader = new FileReader();
		reader.readAsDataURL(petImage);
		console.log();
		setTimeout(async () => {
			let newPet = {
				type,
				name,
				adoptionStatus,
				height,
				weight,
				color,
				bio,
				dietaryRestrictions,
				breed,
				hypoallergenic,
				image: reader.result,
			};
			try {
				addPet(newPet);
				setFormData({
					type: 'Dog',
					name: '',
					adoptionStatus: 'Available',
					height: 0,
					weight: 0,
					color: '',
					bio: '',
					dietaryRestrictions: '',
					breed: '',
					hypoallergenic: false,
				});
				setImageState('');
				setPreviewPetImage('');
			} catch (err) {
				console.error(err.response);
			}
			setLoading(false);
			setDisabled(false);
		}, 2000);
	};
	const {
		type,
		name,
		adoptionStatus,
		height,
		weight,
		color,
		bio,
		dietaryRestrictions,
		breed,
		hypoallergenic,
	} = formData;

	return (
		<div className='container'>
			<Card className='width=400px mt-4 p-4'>
				<div className='text-center'>
					<h1>{'Add Pet'}</h1>
				</div>
				<div>
					<Form
						className='p-3'
						method='POST'
						onSubmit={(e) => {
							onSubmitForm(e);
						}}
					>
						<Row>
							<Col>
								<Form.Group>
									<Form.Label>Type :</Form.Label>
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
							<Col>
								<Form.Group>
									<Form.Label>Name :</Form.Label>
									<Form.Control
										type='text'
										name='name'
										placeholder='Pet Name...'
										value={name}
										onChange={(e) => onChange(e)}
									/>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group>
									<Form.Label>Pet Status :</Form.Label>
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
						</Row>
						<Row>
							<Col>
								<Form.Group>
									<Form.Label>Height :</Form.Label>
									<Form.Control
										type='text'
										name='height'
										placeholder='Pet Height...'
										value={height}
										onChange={(e) => onChange(e)}
									/>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group>
									<Form.Label>Weight :</Form.Label>
									<Form.Control
										type='text'
										placeholder='Pet Height...'
										value={weight}
										name='weight'
										onChange={(e) => onChange(e)}
									/>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group>
									<Form.Label>Color :</Form.Label>
									<Form.Control
										type='text'
										placeholder='Pet Color...'
										value={color}
										name='color'
										onChange={(e) => onChange(e)}
									/>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col>
								<Form.Group>
									<Form.Label>Hypoallergenic :</Form.Label>
									<Form.Control
										as='select'
										name='hypoallergenic'
										value={hypoallergenic}
										onChange={(e) => onChange(e)}
									>
										<option value={true}>Yes</option>
										<option value={false}>No</option>
									</Form.Control>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group>
									<Form.Label>Dietary Restrictions :</Form.Label>
									<Form.Control
										type='text'
										name='dietaryRestrictions'
										placeholder='Dietary Restrictions...'
										value={dietaryRestrictions}
										onChange={(e) => onChange(e)}
									/>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group>
									<Form.Label>Breed of animal :</Form.Label>
									<Form.Control
										type='text'
										name='breed'
										placeholder='Poodle, Siamese...'
										value={breed}
										onChange={(e) => onChange(e)}
									/>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col>
								<Form.Group>
									<Form.Label>Bio :</Form.Label>
									<Form.Control
										as='textarea'
										rows={3}
										value={bio}
										name='bio'
										onChange={(e) => onChange(e)}
									/>
								</Form.Group>
							</Col>
						</Row>
						<Row className='justify-content-md-center'>
							<Col md='auto' xs lg='2'>
								<Form.Group>
									<Form.Label>Image :</Form.Label>
									<Form.File
										placeholder='Upload Image'
										value={imageState}
										onChange={handleImageState}
									/>
								</Form.Group>
							</Col>
							{previewPetImage && (
								<Col md='auto'>
									<Image
										src={previewPetImage}
										alt='pet'
										rounded
										style={{ height: '150px' }}
									/>
								</Col>
							)}
						</Row>
						<Row className='justify-content-md-center'>
							<Button
								className='btn btn-primary mt-3 btn-lg btn-block w-50 '
								type='submit'
								disabled={disabled}
							>
								{loading && <LoadingSpinner />}
								Add a pet
							</Button>
						</Row>
					</Form>
				</div>
			</Card>
		</div>
	);
};
export default AddPet;
