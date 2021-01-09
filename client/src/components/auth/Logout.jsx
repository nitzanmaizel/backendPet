import React, { Fragment, useState, useContext } from 'react';
import { Container, Button, Col, Row, Modal } from 'react-bootstrap';
import AuthContext from '../../context/auth/authContext';
const Logout = () => {
	const authContext = useContext(AuthContext);
	const { logoutUser } = authContext;
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const onClick = () => {
		logoutUser();
		handleClose();
	};

	return (
		<Fragment>
			<Button variant='outline-dark' onClick={handleShow}>
				Logout
			</Button>
			<Modal show={show} onHide={handleClose} size='sm'>
				<Container className='text-canter p-1'>
					<Row className='justify-content-md-center m-0 p-2'>
						<Col className='d-flex align-items-center' md='auto'>
							<div>You sure?</div>
						</Col>

						<Col md='auto'>
							<Button variant='primary' onClick={onClick}>
								Yes
							</Button>
						</Col>
						<Col md='auto'>
							<Button variant='danger' onClick={handleClose}>
								No
							</Button>
						</Col>
					</Row>
				</Container>
			</Modal>
		</Fragment>
	);
};

export default Logout;
