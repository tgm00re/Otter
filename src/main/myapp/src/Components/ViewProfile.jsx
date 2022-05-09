import React, { useEffect } from 'react'
import UserDisplay from './UserDisplay'
import ViewUserPosts from './ViewUserPosts'
import { useParams } from 'react-router';
import Links from './Links';
import { useHistory } from 'react-router';
import { useState } from 'react';
import HomeRight from './HomeRight';

export default function ViewProfile() {
    const { id } = useParams();

    let history = useHistory();
    const [loggedInUser, setLoggedInUser] = useState({})

    useEffect(() => {
        if(!sessionStorage.getItem("loggedInUser")){
            history.push("/");
        } else { 
            setLoggedInUser(JSON.parse(sessionStorage.getItem("loggedInUser")));
        }
    }, [])


    return (
        <>
        <div className="col-sm-3 vh-100 pt-1" id="dashboard-col-left">
            <Links loggedInUser={loggedInUser}/>
        </div>
        <div className="col-sm-6 p-0" style={{ borderLeft: "1px solid rgba(245, 248, 250, .25)", borderRight: "1px solid rgba(245, 248, 250, .25)" }}>
            <UserDisplay id={id}/>
            <ViewUserPosts id={id}/>
        </div>
        <div className="col-sm-3" id="dashboard-col-right">
            <HomeRight />
        </div>
        
        </>
    )
}
