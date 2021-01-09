import React, { Fragment, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavBar from './components/layout/NavBar';
import Home from './components/pages/Home/Home';
import SearchPet from './components/pages/Search Pet/SearchPet';
import MyPets from './components/pages/My Pets/MyPets';
import ProfileSettings from './components/pages/Profile Settings/ProfileSettings';
import AddPet from './components/pages/Add Pet/AddPet';
import Dashboard from './components/pages/Dashboard/Dashboard';
import AuthContext from './context/auth/authContext';
import PrivateRoute from './components/routing/PrivateRoute';
import PrivateAdminRoute from './components/routing/PrivateAdminRoute';
import './App.css';
import PetProfile from './components/pages/Pet Profile/PetProfile';

const App = () => {
	const authContext = useContext(AuthContext);
	const { token, loadUser } = authContext;
	useEffect(() => {
		loadUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);

	return (
		<Router>
			<Fragment>
				<NavBar />
				<Container>
					<Switch>
						{/* {routes.map((r) => (
							<Route {...routes} />
						))} */}
						<Route exact path='/' component={Home}></Route>

						<Route exact path='/searchpet' component={SearchPet}></Route>

						<Route path='/petprofile/:id' component={PetProfile} />

						<PrivateRoute path='/mypets' component={MyPets}></PrivateRoute>

						<PrivateRoute
							exact
							path='/profilesettings'
							component={ProfileSettings}
						></PrivateRoute>

						<PrivateAdminRoute
							exact
							path='/addpet'
							component={AddPet}
						></PrivateAdminRoute>

						<PrivateAdminRoute
							path='/dashboard'
							component={Dashboard}
						></PrivateAdminRoute>
					</Switch>
				</Container>
			</Fragment>
		</Router>
	);
};

export default App;
