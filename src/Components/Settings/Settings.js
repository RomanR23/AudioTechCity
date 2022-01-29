import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import './Settings.css';
import axios from 'axios';

function Settings() {
	const [user, setUser] = useState([]);
	const [username, setUsername] = useState('');
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [password, setPassword] = useState('');

	const history = useHistory();

	function userLogged() {
		axios
			.get('/api/auth/me')
			.then((res) => {
				setUser(res.data);
			})
			.catch((err) => {
				console.log(`Error: ${err}`);
			});
	}

	function updateUsername() {
		if (user.id && username.length >= 3) {
			axios
				.post('/api/updateUsername', { username, user })
				.then((res) => {
					alert('Please Re-Log To Apply Changes!');
					setUsername('');
					history.push('/');
					document.location.reload();
				})
				.catch((err) => {
					console.log(`Error: ${err}`);
				});
		} else {
			alert('Please Enter A Valid Username Or Log In First!');
		}
	}

	function updateFirstname() {
		if (user.id && firstname.length >= 3) {
			axios
				.post('/api/updateFirstname', { firstname, user })
				.then((res) => {
					setUser(res.data);
					setFirstname('');
				})
				.catch((err) => {
					console.log(`Error: ${err}`);
				});
		} else {
			alert('Please Enter A Valid First Name Or Log In First!');
		}
	}

	function updateLastname() {
		if (user.id && lastname.length >= 3) {
			axios
				.post('/api/updateLastname', { lastname, user })
				.then((res) => {
					setUser(res.data);
					setLastname('');
				})
				.catch((err) => {
					console.log(`Error: ${err}`);
				});
		} else {
			alert('Please Enter A Valid Last Name Or Log In First!');
		}
	}

	function updatePassword() {
		if (user.id && password.length >= 3) {
			axios
				.post('/api/updatePassword', { password, user })
				.then((res) => {
					setUser(res.data);
					setPassword('');
				})
				.catch((err) => {
					console.log(`Error: ${err}`);
				});
		} else {
			alert('Please Enter A Valid Password Or Log In First!');
		}
	}

	useEffect(() => {
		userLogged();
		console.log('useEffect fired');
	}, [username, firstname, lastname, password]);

	return (
		<div className="settings-container-main">
			<div className="settings-content-box">
				<div className="settings-settings-box">
					<div className="settings-user-info-title">
						<p>Edit User Info</p>
					</div>

					<div className="settings-input-box">
						<div className="container">
							<input
								className="input-settings"
								placeholder="Username"
								onChange={(e) => setUsername(e.target.value)}
								value={username}
							></input>
							<button
								className="button-settings"
								onClick={() => updateUsername()}
							>
								Update
							</button>
						</div>

						<div className="container">
							<input
								className="input-settings"
								placeholder="First Name"
								onChange={(e) => setFirstname(e.target.value)}
								value={firstname}
							></input>
							<button
								className="button-settings"
								onClick={() => updateFirstname()}
							>
								Update
							</button>
						</div>

						<div className="container">
							<input
								className="input-settings"
								placeholder="Last Name"
								onChange={(e) => setLastname(e.target.value)}
								value={lastname}
							></input>
							<button
								className="button-settings"
								onClick={() => updateLastname()}
							>
								Update
							</button>
						</div>

						<div className="container">
							<input
								className="input-settings"
								placeholder="Password"
								onChange={(e) => setPassword(e.target.value)}
								value={password}
							></input>
							<button
								className="button-settings"
								onClick={() => updatePassword()}
							>
								Update
							</button>
						</div>
					</div>
				</div>

				<div className="settings-user-box">
					<div className="settings-hello-user">
						<p>{`Hello, ${
							user.first_name || 'Guest! Please Log In First'
						}!`}</p>
					</div>

					<div className="settings-current-info">
						<p>
							<b>Current User Info</b>
						</p>
						<p>
							<b>User name:</b>
							{user.username}
						</p>
						<p>
							<b>First name:</b>
							{user.first_name}
						</p>
						<p>
							<b>Last name:</b>
							{user.last_name}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Settings;
