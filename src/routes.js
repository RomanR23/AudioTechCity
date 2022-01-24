import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Products from './Components/Products/Products'
import Checkout from './Components/Checkout/Checkout';
import Settings from './Components/Settings/Settings';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home'

export default (
    <Switch>
        <Route path='/register' component={Register}/>
        <Route path='/login' component={Login}/>
        <Route path='/products' component={Products}/>
        <Route path='/settings' component={Settings}/>
        <Route path='/checkout' component={Checkout}/>
        <Route path='/' component={Home}/>
    </Switch>
)