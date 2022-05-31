import React from 'react'
import { useHistory } from 'react-router'
import ExploreRight from './ExploreRight'
import ExploreMid from './ExploreMid'
import Links from './Links'
import { useEffect, useState } from 'react'

export default function Explore() {
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
            <div className="col-sm-6 p-0 middle-content" style={{borderLeft: "1px solid rgba(245, 248, 250, .25)", borderRight: "1px solid rgba(245, 248, 250, .25)"}}>
                <ExploreMid loggedInUser={loggedInUser}/>
            </div>
            <div className="col-sm-3 hide-small" id="dashboard-col-right">
                <ExploreRight loggedInUser={loggedInUser}/>
            </div>
        </>
    )
}
