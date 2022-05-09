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
import UserDisplay from '../Components/UserDisplay'
import ViewProfile from '../Components/ViewProfile'

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
            <div className="container-fluid px-5" id="main-container">
                    <div className="row">
            <Route exact path="/home">
                        <Home />
            </Route>
            <Route exact path="/explore">
                        <Explore />
            </Route>
            <Route exact path="/account">
                        <Account />
            </Route>
            <Route exact path="/p/:id">
                        <ViewProfile/>
            </Route>
            </div>
            </div>
            <Route exact path="/">
                <Redirect to="/register"/>
            </Route> 
        </Switch>
    )
}
