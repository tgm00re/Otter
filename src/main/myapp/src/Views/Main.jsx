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
import Notifications from '../Components/Notifications'

import homeIcon from "../Static/Images/link-icon/home-button.png"
import exploreIcon from "../Static/Images/link-icon/explore-button.png"
import notificationsIcon from "../Static/Images/link-icon/notifications-button.png"
import messagesIcon from "../Static/Images/link-icon/messages-button.png"
import RegisterFormMobile from '../Components/RegisterFormMobile'

export default function Main() {
    let history = useHistory();
    const [loggedInUser, setLoggedInUser] = useState({});

    useEffect(() => {
        if (sessionStorage.getItem("loggedInUser")) {
            setLoggedInUser(JSON.parse(sessionStorage.getItem("loggedInUser")));
        }
    }, [])

    function reroute(str) {
        history.push("/" + str);
    }


    return (
        <Switch>
            <Route exact path="/">
                <Redirect to="/register" />
            </Route>
            <Route exact path="/register">
                <Register />
            </Route>
            <Route exact path="/mobilereg">
                <RegisterFormMobile/>
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/editAccount">
                <EditAccount />
            </Route>
            <div className="d-flex justify-content-center vw-100" id="centered-content">
                <div className="container-fluid px-5" id="main-container">
                <nav class="navbar navbar-expand-lg navbar-light" id="mobile-nav">
                    <button class="navbar-toggler ms-2" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav bg-light">
                            <li class="nav-item active  text-center text-light py-2 mobile-nav-item" style={{cursor:"pointer"}}>
                                <span className="bg-transparent text-light">Messages</span>
                            </li>
                            <li class="nav-item  py-2 mobile-nav-item" style={{cursor:"pointer"}}>
                            <span className="bg-transparent text-light">Bookmarks</span>
                            </li>
                            <li class="nav-item py-2 mobile-nav-item" style={{cursor:"pointer"}}>
                                <span className="bg-transparent text-light">Lists</span>
                            </li>
                            <li class="nav-item py-2 mobile-nav-item" onClick={() => reroute("account")} style={{cursor:"pointer"}}>
                                <span className="bg-transparent text-light">Profile</span>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="row px-1">
                    <Route exact path="/home">
                        <Home />
                    </Route>
                    <Route exact path="/explore">
                        <Explore />
                    </Route>
                    <Route exact path="/account">
                        <Account />
                    </Route>
                    <Route exact path="/notifications">
                        <Notifications />
                    </Route>
                    <Route exact path="/p/:id">
                        <ViewProfile />
                    </Route>
                </div>
                <div id="mobile-bottom-bar">

                    <img src={loggedInUser.profileImageUrl} className="profile-img bottom-bar-icon" onClick={() => reroute("p/" + loggedInUser.id)} />

                    <img src={homeIcon} onClick={() => reroute("home")} className="link-icon bottom-bar-icon bg-transparent" />
                    <img src={exploreIcon} onClick={() => reroute("explore")} className="link-icon bottom-bar-icon bg-transparent" />
                    <img src={notificationsIcon} onClick={() => reroute("notifications")} className="link-icon bottom-bar-icon bg-transparent" />
                </div>
            </div>
            </div>
            
        </Switch>
    )
}
