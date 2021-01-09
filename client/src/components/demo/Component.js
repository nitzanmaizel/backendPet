// import { useState } from 'react';

// const ContainerForm = () => {
// 	const [form, setForm] = useState({});
// 	function onChange(event) {
// 		const { name, value } = event.target;
// 		setForm({ ...form, [name]: value });
// 	}
// 	function onSubmit(e) {
// 		e.preventDefault();
// 		//
// 	}
// 	return <Form onChange={onChange} onSubmit={onSubmit} />;
// };

// const Form = ({ onChange, onSubmit }) => {
// 	return (
// 		<form onChange={onChange} onSubmit={onSubmit}>
// 			<div>
// 				<label>email</label>
// 				<input name='email' />
// 			</div>
// 			<div>
// 				<label>Password</label>
// 				<input name='password' />
// 			</div>
// 			<div>
// 				<input type='submit' value='send' />
// 			</div>
// 		</form>
// 	);
// };

// export default ContainerForm;

// const CLOUDINARY_NAME = config.get('CLOUDINARY_NAME');
// const CLOUDINARY_API_KEY = config.get('CLOUDINARY_API_KEY');
// const CLOUDINARY_API_SECRET = config.get('CLOUDINARY_API_SECRET');
// const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
