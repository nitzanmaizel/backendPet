import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const UserItem = (props) => {
	const {
		// image,
		_id,
		firstName,
		lastName,
		email,
		phoneNumber,
	} = props.user;

	return (
		<Card style={{ width: '18rem' }}>
			<Card.Body>
				<Card.Title>{`${firstName} ${lastName}`}</Card.Title>
				<Card.Subtitle className='mb-2 text-muted'>{email}</Card.Subtitle>
				<Card.Text>{phoneNumber}</Card.Text>
				<Card.Text>
					<Link to={`/dashboard/users/${_id}`}>See pets collection</Link>
				</Card.Text>
			</Card.Body>
		</Card>
	);
};
export default UserItem;
