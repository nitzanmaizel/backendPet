import React, { Fragment, useState, useContext } from 'react';
import { Form, Button, Card, Col, Row, Modal } from 'react-bootstrap';
import LoadingSpinner from '../utility/LoadingSpinner';
import AuthContext from '../../context/auth/authContext';

const SignUp = () => {
	const authContext = useContext(AuthContext);
	const { signupUser } = authContext;
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		userEmail: '',
		password: '',
		password2: '',
		phoneNumber: '',
	});
	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmitForm = async (e) => {
		e.preventDefault();
		setLoading(true);
		setDisabled(true);
		let email = formData.userEmail.toLowerCase();
		setTimeout(async () => {
			let newUser = {
				firstName,
				lastName,
				email,
				password,
				password2,
				phoneNumber,
			};
			try {
				signupUser(newUser);
				setShow(false);
				setLoading(false);
				setDisabled(false);
			} catch (err) {
				console.error(err.response);
			}
			setLoading(false);
			setDisabled(false);
		}, 1000);
	};
	const { firstName, lastName, userEmail, password, password2, phoneNumber } = formData;

	return (
		<>
			<Fragment>
				<Button variant='success' onClick={handleShow}>
					Sign Up
				</Button>
				<Modal show={show} onHide={handleClose}>
					<Card className='p-5'>
						<Form
							method='POST'
							onSubmit={(e) => {
								onSubmitForm(e);
							}}
						>
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
											name='userEmail'
											value={userEmail}
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
							<Row className='justify-content-md-center'>
								<Button
									className='btn btn-primary mt-3 btn-lg btn-block w-50 '
									type='submit'
									disabled={disabled}
								>
									{loading && <LoadingSpinner />}
									Sign Up
								</Button>
							</Row>
						</Form>
					</Card>
				</Modal>
			</Fragment>
		</>
	);
};

export default SignUp;
