import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Dashboard from '../Components/Dashboard'
import EditAccount from '../Components/EditAccount'
import Home from '../Components/Home'
import Login from '../Components/Login'
import Register from '../Components/Register'
import Account from '../Components/Account'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Explore from '../Components/Explore'
import { useHistory } from 'react-router'


export default function Main() {
    

    return (
        <Switch>
            <Route exact path="/register">
                <Register/>
            </Route>
            <Route exact path="/login">
                <Login/>
            </Route>
            <Route exact path="/editAccount">
                <EditAccount/>
            </Route>
            <Route exact path="/home">
                <div className="container-fluid px-5">
                <div className="row">
                    <Home />
                </div>
                </div>
            </Route>
            <Route exact path="/explore">
                <div className="container-fluid px-5">
                <div className="row">
                    <Explore />
                </div>
                </div>
            </Route>
            <Route exact path="/account">
                <div className="container-fluid px-5">
                    <div className="row">
                    <Account />
                </div>
                </div>
            </Route>
            <Route exact path="/">
                <Redirect to="register"/>
            </Route> 
        </Switch>
    )
}
