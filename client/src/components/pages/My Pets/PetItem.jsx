import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ListGroup, ListGroupItem, Card, Image, Collapse, Col, Row } from 'react-bootstrap';
import './PetItem.css';

export default function PetItem(props) {
	const [open, setOpen] = useState(false);
	const [status, setStatus] = useState(null);
	const [name, setName] = useState(null);
	const [hypoallergenic, setHypoallergenic] = useState(null);
	console.log(props);

	const history = useHistory();
	const goToProfile = () => {
		history.push(`/petprofile/${_id}`);
	};

	const { _id, petImage, type, adoptionStatus, height, weight } = props.pet;

	useEffect(() => {
		const setPetData = () => {
			let petHypoallergenic = props.pet;
			let petName = props.pet.name;
			setName(petName.charAt(0).toUpperCase() + petName.slice(1));
			setHypoallergenic(petHypoallergenic);
			if (adoptionStatus === 'Available') {
				setStatus('success');
			} else {
				setStatus('danger');
			}
			if (hypoallergenic) {
				setHypoallergenic('Yes');
			} else {
				setHypoallergenic('No');
			}
		};
		setPetData();
	}, []);

	return (
		<>
			<Card style={{ width: '18rem' }}>
				<Card.Img variant='top' src={`${petImage}`} />
				<Card.Body className='pb-0 pr-0'>
					<Row>
						<Col>
							<Card.Title>
								<b>Name:</b>
								{name}
							</Card.Title>
						</Col>
						<Col>
							{' '}
							<Card.Text>
								<b>Type :</b>
								{type}
							</Card.Text>
						</Col>
					</Row>
				</Card.Body>
				<ListGroup className='list-group-flush'>
					<ListGroupItem>
						<b>Adoption Status: </b>
						<span className={`text-${status}`}>{adoptionStatus}</span>
					</ListGroupItem>
					<ListGroupItem>
						<Row>
							<Col>
								{' '}
								<b>Height: </b>
								{height}
							</Col>
							<Col>
								{' '}
								<b>Weight: </b>
								{weight}
							</Col>
						</Row>
					</ListGroupItem>
				</ListGroup>
				<Card.Body>
					<Link className='navLink p-1 ' to={`/petprofile/${_id}`}>
						See Profile
					</Link>
				</Card.Body>
			</Card>
		</>
	);
}
