import React, { useState, useEffect, useContext } from 'react';
import { Alert } from 'react-bootstrap';
import AlertContext from '../../context/alert/alertContext';

const AlertMsg = (props) => {
	const alertContext = useContext(AlertContext);
	const { alert, show } = alertContext;

	return (
		alert !== null && (
			<Alert show={show} variant={alert.type} className='p-1'>
				<span>{alert.msg}</span>
			</Alert>
		)
	);
};

export default AlertMsg;
