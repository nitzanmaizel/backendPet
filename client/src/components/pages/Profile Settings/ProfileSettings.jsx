import React, { useState, useContext } from 'react';
import { Form, Button, Card, Spinner, Col, Row, Container } from 'react-bootstrap';
import AuthContext from '../../../context/auth/authContext';
import UserContext from '../../../context/users/userContext';

const ProfileSettings = () => {
	const authContext = useContext(AuthContext);
	const userContext = useContext(UserContext);
	const { user } = authContext;
	const { updateProfile } = userContext;
	const [formData, setFormData] = useState({
		firstName: user.firstName || '',
		lastName: user.lastName || '',
		email: user.email || '',
		password: '',
		password2: '',
		phoneNumber: user.phoneNumber || '',
		bio: user.bio || '',
	});

	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(false);

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmitForm = (event) => {
		event.preventDefault();
		setLoading(true);
		setDisabled(true);
		const id = user._id;

		let updateUser = {
			id,
			firstName,
			lastName,
			email,
			password,
			password2,
			phoneNumber,
			bio,
		};
		setTimeout(async () => {
			try {
				updateProfile(updateUser);
				setLoading(false);
				setDisabled(false);
				setFormData({
					firstName: user.firstName || '',
					lastName: user.lastName || '',
					email: user.email || '',
					password: '',
					password2: '',
					phoneNumber: user.phoneNumber || '',
					bio: user.bio || '',
				});
			} catch (err) {
				console.error(err.response);
			}
		}, 2000);
	};

	const { firstName, lastName, email, password, password2, phoneNumber, bio } = formData;

	return (
		<Container>
			<Card className='width=400px p-4 mt-2'>
				<Form
					method='POST'
					onSubmit={(e) => {
						onSubmitForm(e);
					}}
				>
					<Row>
						<Col>
							<h1 className='text-center'>Update your profile</h1>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Label>First Name:</Form.Label>
							<Form.Control
								type='text'
								placeholder='First Name...'
								name='firstName'
								value={firstName}
								onChange={(e) => onChange(e)}
								required
							></Form.Control>
						</Col>
						<Col>
							<Form.Label>Last Name:</Form.Label>
							<Form.Control
								type='text'
								name='lastName'
								value={lastName}
								onChange={(e) => onChange(e)}
								placeholder='Last Name...'
								required
							></Form.Control>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Group id='email'>
								<Form.Label>Email:</Form.Label>
								<Form.Control
									type='email'
									name='email'
									value={email}
									onChange={(e) => onChange(e)}
									placeholder='Email...'
									required
								></Form.Control>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Group id='password'>
								<Form.Label>password:</Form.Label>
								<Form.Control
									type='password'
									name='password'
									value={password}
									onChange={(e) => onChange(e)}
									placeholder='password...'
									required
								></Form.Control>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group id='password2'>
								<Form.Label>Confirm Password:</Form.Label>
								<Form.Control
									type='password'
									name='password2'
									value={password2}
									onChange={(e) => onChange(e)}
									placeholder='Confirm Password...'
									required
								></Form.Control>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Group id='phoneNumber'>
								<Form.Label>Phone Number:</Form.Label>
								<Form.Control
									type='text'
									name='phoneNumber'
									value={phoneNumber}
									onChange={(e) => onChange(e)}
									placeholder='Phone Number...'
									required
								></Form.Control>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Group id='bio'>
								<Form.Label>Bio:</Form.Label>
								<Form.Control
									as='textarea'
									rows={4}
									name='bio'
									value={bio}
									onChange={(e) => onChange(e)}
									placeholder='Tell us about yourself...'
								></Form.Control>
							</Form.Group>
						</Col>
					</Row>
					<Row className='justify-content-md-center'>
						<Button
							className='btn btn-primary mt-3 btn-lg btn-block w-50 '
							type='submit'
							disabled={disabled}
						>
							{loading && (
								<Spinner
									animation='border'
									role='status'
									style={{ margin: '0px 5px 0px 0px' }}
								>
									<span className='sr-only mr-2'></span>
								</Spinner>
							)}
							Update Profile
						</Button>
					</Row>
				</Form>
			</Card>
		</Container>
	);
};

export default ProfileSettings;
