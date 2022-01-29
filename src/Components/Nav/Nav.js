import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useHistory } from 'react-router';
import { updateUser, logout } from '../../redux/reducer';
import { useSelector, useDispatch } from 'react-redux';
import './Nav.css';
import axios from 'axios';

function Nav() {
	const [user, setUser] = useState(false);
	const history = useHistory();

	const currUser = useSelector((state) => state.username);
	const dispatch = useDispatch();

	function getUser() {
		axios
			.get('/api/auth/me')
			.then((res) => {
				if (res.data.username) {
					dispatch(updateUser(res.data));
					setUser(true);
				}
			})
			.catch((err) => {
				console.log(`Error: ${err}`);
			});
	}

	function logoutUser() {
		axios
			.post('/api/auth/logout')
			.then((_) => {
				alert('You Have Been Logged Out!');
				dispatch(logout());
				setUser(false);
				history.push('/');
			})
			.catch((err) => {
				console.log(`Error: ${err}`);
			});
	}

	let userLogin = (
		<div className="nav-login-container">
			<Link to="/login">
				<button className="nav-login-button">Login</button>
			</Link>
			<Link to="/register">
				<button className="nav-register-button">Register</button>
			</Link>
		</div>
	);

	useEffect(() => {
		getUser();
	}, []);

	return (
		<div className="nav-container-main">
			<div className="nav-title-div">
				<p className="nav-p-welcometo">Welcome to...</p>
				<p className="nav-p-title-name">Audio Tech City</p>
			</div>

			<div className="nav-links-container">
				<div className="nav-links-div">
					<Link to="/settings">
						<button className="nav-link-button">Settings</button>
					</Link>
					<Link to="/products">
						<button className="nav-link-button">Shop</button>
					</Link>
					<Link to="/checkout">
						<button className="nav-link-button">Cart</button>
					</Link>
					<Link to="/home">
						<button className="nav-link-button">Home</button>
					</Link>
				</div>

				<div className="nav-user-login-container">
					{!user ? (
						userLogin
					) : (
						<div className="nav-user-logout-container">
							<div>
								<p className="nav-text-logout">{`Welcome, ${currUser}`}</p>
							</div>
							<button className="logout-button" onClick={() => logoutUser()}>
								Logout
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default withRouter(Nav);
