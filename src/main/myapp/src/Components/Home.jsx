import React, { useEffect, useState } from 'react'
import Links from './Links'
import HomeMid from './HomeMid'
import HomeRight from './HomeRight';
import { useHistory } from 'react-router';

export default function Home(props) {
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
                    <div className="col-sm-6 p-0" style={{ borderLeft: "1px solid rgba(245, 248, 250, .25)", borderRight: "1px solid rgba(245, 248, 250, .25)" }}>
                        <HomeMid loggedInUser={loggedInUser} />
                    </div>
                    <div className="col-sm-3" id="dashboard-col-right">
                        <HomeRight />
                    </div>
        </>
    )
}
