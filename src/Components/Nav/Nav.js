import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './Nav.css'
import axios from 'axios';

function Nav(){

const [user, setUser ] = useState(false);
const [username, setUsername] = useState("")



function getUser(){
    axios.get('/api/auth/me')
    .then(res => {
        if(res.data.username){
        setUser(true)
        setUsername(res.data.username)
        }
    }).catch(err => {
        console.log(`Error: ${err}`)
    })
}



    let userLogin = 
    <div className = 'nav-login-container'>
        <Link to ='/login'><button className = 'nav-login-button'>Login</button></Link>
        <Link to='/register'><button className='nav-register-button'>Register</button></Link>
    </div>




useEffect(()=> {
    getUser()
},[])

    return (
        <div className = 'nav-container-main'>
            <div className='nav-title-div'>
                <p className='nav-p-welcometo'>Welcome to...</p>
                <p className='nav-p-title-name'>Audio Tech City</p>
            </div>

            <div className='nav-links-container'>
                <div className='nav-links-div'>
                    <Link to='/settings'><button className = 'nav-link-button'>Settings</button></Link>
                    <Link to='/products'><button className = 'nav-link-button'>Shop</button></Link>
                    <Link to='/checkout'><button className = 'nav-link-button'>Cart</button></Link>
                    <Link to='/home'><button className = 'nav-link-button'>Home</button></Link>
                </div>
                
                <div className='nav-user-login-container'>
                    {userLogin}
                </div>
            </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return state; }

export default withRouter(connect(mapStateToProps)(Nav));