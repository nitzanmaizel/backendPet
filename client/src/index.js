import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthState from './context/auth/AuthState';
import PetState from './context/pets/PetState';
import UserState from './context/users/UserState';
import reportWebVitals from './reportWebVitals';
import AlertState from './context/alert/AlertState';

ReactDOM.render(
	<AuthState>
		<PetState>
			<UserState>
				<AlertState>
					<App />
				</AlertState>
			</UserState>
		</PetState>
	</AuthState>,
	document.getElementById('root')
);

reportWebVitals();
