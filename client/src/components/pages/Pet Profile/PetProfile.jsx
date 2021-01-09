import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Col, Row, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import PetContext from '../../../context/pets/petContext';
import { Link } from 'react-router-dom';

const PetProfile = () => {
	const petContext = useContext(PetContext);
	const { getPetById, currentPet, savePet } = petContext;
	const [status, setStatus] = useState(null);

	let { id } = useParams();
	let petID = id;
	console.log(currentPet);
	console.log(petID);
	// const name = currentPet
	// 	? currentPet.name.charAt(0).toUpperCase() + currentPet.name.slice(1)
	// 	: null;
	const loadPet = async () => {
		getPetById(petID);
		if (currentPet && currentPet.adoptionStatus === 'Available') {
			setStatus('success');
		} else {
			setStatus('danger');
		}
	};

	useEffect(() => {
		if (!currentPet) {
			loadPet();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPet, id]);

	const onClickSave = async (petID) => {
		try {
			console.log(petID);
			await axios.post(`/api/pets/save/${petID}`);
			savePet(petID);
		} catch (err) {
			console.error(err.massage);
		}
	};

	const {
		petImage,
		name,
		type,
		adoptionStatus,
		height,
		hypoallergenic,
		weight,
		color,
		bio,
		dietaryRestrictions,
		breed,
	} = currentPet || {};

	return (
		<Card className=' w-100 mt-5 p-4'>
			<Row>
				<Col className='text-center text-decoration p-2 h2'>
					<u>{`Name: ${name}`}</u>
				</Col>
			</Row>
			<Row>
				<Col>
					<Row>
						<Col lg='7'>
							<Image src={petImage} rounded style={{ width: '500px' }} />
						</Col>
						<Col md='auto' className='h4'>
							{' '}
							<Row>
								<Col>
									<b>Type: </b>
									{type}
								</Col>
							</Row>
							<Row>
								<Col>
									{' '}
									<b>color: </b>
									{color}
								</Col>
							</Row>
							<Row>
								<Col>
									<b>Adoption Status: </b>
									<span className={`text-${status}`}>{adoptionStatus}</span>
								</Col>
							</Row>
							<Row>
								<Col>
									{' '}
									<b>Height: </b>
									{height}
								</Col>
							</Row>
							<Row>
								<Col>
									{' '}
									<b>Weight: </b>
									{weight}
								</Col>
							</Row>
							<Row>
								<Col>
									{' '}
									<b>Hypoallergenic: </b>
									{hypoallergenic ? 'Yes' : 'No'}
								</Col>
							</Row>
							<Row>
								<Col>
									{' '}
									<b>Dietary Restrictions: </b>
									{dietaryRestrictions}
								</Col>
							</Row>
							<Row>
								<Col>
									{' '}
									<b>Breed Of Animal: </b>
									{breed}
								</Col>
							</Row>
							<Row>
								<Col>
									{' '}
									<b>Bio: </b>
									{bio}
								</Col>
							</Row>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row>
				<Col>
					<Button variant='danger' className='m-4 '>
						Return pet
					</Button>
				</Col>
				<Col>
					<Button variant='primary' className='m-4 '>
						Adopt Pet
					</Button>
				</Col>
				<Col>
					<Button variant='success' className='m-4 '>
						Foster Pet
					</Button>
				</Col>
				<Col>
					<Button variant='warning' className='m-4  ' onClick={onClickSave}>
						Save
					</Button>
				</Col>
				<Col>
					<Button variant='info' className='m-4  '>
						<Link className='navLink p-1 ' to={`/addpet`}>
							Edit
						</Link>
					</Button>
				</Col>
			</Row>
		</Card>
	);
};
export default PetProfile;
