import React, { useEffect, useState } from 'react';
import { Card, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default function SearchResults(props) {
	const [status, setStatus] = useState(null);

	let petName = props.pet.name;

	const name = petName.charAt(0).toUpperCase() + petName.slice(1);
	const { petImage, _id, type, adoptionStatus, height, weight, color } = props.pet;
	useEffect(() => {
		if (adoptionStatus === 'Available') {
			setStatus('success');
		} else {
			setStatus('danger');
		}
	}, []);

	return (
		<Card className='p-3 mt-3'>
			<Row className='d-flex align-items-center justify-content-between '>
				<Image src={petImage} rounded style={{ width: '130px' }} />
				<span>
					<b>Name: </b> {name}
				</span>
				<span>
					<b>Type: </b> {type}
				</span>
				<span>
					<b>color: </b>
					{color}
				</span>
				<span>
					<b>Height: </b>
					{height}
				</span>
				<span>
					<b>Weight: </b>
					{weight}
				</span>
				<span>
					<b>Status: </b>
					<span className={`text-${status}`}>{adoptionStatus}</span>
				</span>
				<Link className='navLink p-1 ' to={`/petprofile/${_id}`}>
					See profile
				</Link>
			</Row>
		</Card>
	);
}
