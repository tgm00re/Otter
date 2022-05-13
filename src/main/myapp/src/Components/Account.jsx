import React from 'react'
import Links from './Links'
import EditAccount from './EditAccount'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'

export default function Account() {
    let history = useHistory();
    const [loggedInUser, setLoggedInUser] = useState({})

    useEffect(() => {
            if(!sessionStorage.getItem("loggedInUser")){
                history.push("/");
            } else { 
                console.log(JSON.parse(sessionStorage.getItem("loggedInUser")).biography)
                setLoggedInUser(JSON.parse(sessionStorage.getItem("loggedInUser")));
            }
    }, [])

    return (
        <>
            {loggedInUser.firstName ? 
            <>
            <div className="col-sm-3 vh-100 pt-1" id="dashboard-col-left">
                <Links loggedInUser={loggedInUser}/>
            </div>
            <div className="col-sm-9 p-0" style={{borderLeft: "1px solid rgba(245, 248, 250, .25)"}}>
                <EditAccount loggedInUser={loggedInUser}/>
            </div>
            </>
            : 
            <>
            <div className="col-sm-3 vh-100 pt-1" id="dashboard-col-left">
                <Links loggedInUser={loggedInUser}/>
            </div>
            <div className="col-sm-9 p-0" style={{borderLeft: "1px solid rgba(245, 248, 250, .25)"}}>
                <h1>Loading...</h1>
            </div>
            </>
            }
            
        </>
    )
}
