import React, { useEffect, useState } from 'react'
import Links from './Links'
import HomeRight from './HomeRight';
import { useHistory } from 'react-router';
import NotificationsMiddle from './NotificationsMiddle';

export default function Notifications(props) {
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
                        <Links loggedInUser={loggedInUser} />
                    </div>
                    <div className="col-sm-6 p-0 middle-content" style={{ borderLeft: "1px solid rgba(245, 248, 250, .25)", borderRight: "1px solid rgba(245, 248, 250, .25)" }}>
                        <NotificationsMiddle loggedInUser={loggedInUser} />
                    </div>
                    <div className="col-sm-3 hide-small" id="dashboard-col-right">
                        <HomeRight loggedInUser={loggedInUser}/>
                    </div>
        </>
    )
}