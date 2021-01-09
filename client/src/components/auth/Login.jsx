import React, { Fragment, useState, useContext } from 'react';
import { Form, Button, Card, Col, Row, Modal } from 'react-bootstrap';
import LoadingSpinner from '../utility/LoadingSpinner';
import AuthContext from '../../context/auth/authContext';
import AlertMsg from '../utility/AlertMsg';
const Login = (props) => {
	const authContext = useContext(AuthContext);
	const { loginUser } = authContext;
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [show, setShow] = useState(false);
	const [errors, setErrors] = useState(null);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmitForm = async (e) => {
		e.preventDefault();
		setLoading(true);
		setDisabled(true);
		setTimeout(async () => {
			let user = {
				email,
				password,
			};
			try {
				await loginUser(user);
				setLoading(false);
				setDisabled(false);
			} catch (err) {
				console.error(err);
				// setErrors(err);
			}
		}, 1000);
	};
	const { email, password } = formData;

	return (
		<>
			<Fragment>
				<Button variant='dark' onClick={handleShow}>
					Login
				</Button>
				<Modal show={show} onHide={handleClose}>
					<Card className='p-5'>
						<Form
							method='POST'
							onSubmit={(e) => {
								onSubmitForm(e);
							}}
						>
							{errors !== null && (
								<Row>
									<Col>
										<AlertMsg errors={errors} />
									</Col>
								</Row>
							)}
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
							</Row>
							<Row className='justify-content-md-center'>
								<Button
									className='btn btn-primary mt-3 btn-lg btn-block w-50 '
									type='submit'
									disabled={disabled}
								>
									{loading && <LoadingSpinner />}
									Log In
								</Button>
							</Row>
						</Form>
					</Card>
				</Modal>
			</Fragment>
		</>
	);
};

export default Login;
