import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import icon from '../Static/Images/otter-icon.png'

export default function Links(props) {
    const [hasNotif, setHasNotif] = useState(false);
    let history = useHistory();

    function reroute(str){
        history.push("/" + str);
    }

    useEffect(() => {
        console.log("Running");
        const link = "http://localhost:8080/api/notifications/find/" + sessionStorage.getItem("user_id");
        console.log("Link: ", link)
        axios.get(link)
            .then(response => {
                    console.log("length: " + response.data.length);
                    if(response.data.length > 0){
                        setHasNotif(true);
                    }           
                }
            )
            .catch(err => console.log(err));
    }, [])


    return (
        <>
                    <img src={icon} alt="Otter" className="mt-1" id="dashboard-icon"/>
                    <nav className="mt-5">
                        <p className="text-start">
                        <button className="h3 rounded-pill pe-5 links-link text-start border-0" onClick={() => reroute("home")}>Home</button>
                        </p>
                        <p className="text-start">
                        <button className="h3 rounded-pill pe-5 links-link text-start border-0" onClick={() => reroute("explore")}>Explore</button>
                        </p>
                        <p className="text-start">
                        <button className="h3 rounded-pill pe-5 links-link text-start border-0" onClick={() => reroute("notifications")}>
                            Notifications
                            {
                                hasNotif ? 
                                "  🔴"
                                :
                                ""
                            }
                        </button>
                        </p>
                        <p className="text-start">
                        <button className="h3 rounded-pill pe-5 links-link text-start border-0">Messages</button>
                        </p>
                        <p className="text-start">
                        <button className="h3 rounded-pill pe-5 links-link text-start border-0">Bookmarks</button>
                        </p>
                        <p className="text-start">
                        <button className="h3 rounded-pill pe-5 links-link text-start border-0">Lists</button>
                        </p>
                        <p className="text-start">
                        <button className="h3 rounded-pill pe-5 links-link text-start border-0" onClick={() => reroute("account")}>Profile</button>
                        </p>
                        <p className="text-start">
                        <button className="h3 rounded-pill pe-5 links-link text-start border-0">More</button>
                        </p>
                    </nav>
                    <p className="mt-2">
                            <button className="btn btn-primary rounded-pill p-3" id="open-tweet-form">Anotter</button>
                    </p>
                    <div className="row mt-4">
                        <div className="col-3"><p className="profile-img-container">
                            <img src={props.loggedInUser.profileImageUrl} className="rounded-circle" className="profile-img" onClick={() => history.push("/p/" + sessionStorage.getItem("user_id"))}/>
                        </p>
                        </div>
                        <div className="col mt-2" style={{height:"25px"}}>
                            {props.loggedInUser.firstName} {props.loggedInUser.lastName}
                        </div>
                    </div>
        </>
    )
}
