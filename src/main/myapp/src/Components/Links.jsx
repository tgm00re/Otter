import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import icon from '../Static/Images/otter-icon.png'
import homeIcon from "../Static/Images/link-icon/home-button.png"
import exploreIcon from "../Static/Images/link-icon/explore-button.png"
import notificationsIcon from "../Static/Images/link-icon/notifications-button.png"
import messagesIcon from "../Static/Images/link-icon/messages-button.png"
import profileIcon from "../Static/Images/link-icon/profile-button.png"
import moreIcon from "../Static/Images/link-icon/more-button.png"
import bookmarkIcon from "../Static/Images/link-icon/bookmark-button.png"
import listIcon from "../Static/Images/link-icon/list-button.png"

export default function Links(props) {
    const [hasNotif, setHasNotif] = useState(false);
    let history = useHistory();

    function reroute(str){
        history.push("/" + str);
    }

    useEffect(() => {
        const link = "http://localhost:8080/api/notifications/find/received/" + sessionStorage.getItem("user_id");
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
                        <p className="text-start link-container">
                        
                        <button className="h3 rounded-pill p-2 pe-4 links-link text-start border-0" onClick={() => reroute("home")}><img src={homeIcon} alt="" className="link-icon rounded bg-transparent me-2"/> <span className="link-btn-text bg-transparent">Home</span> </button>
                        </p>
                        <p className="text-start link-container">
                        <button className="h3 rounded-pill p-2 pe-4 links-link text-start border-0" onClick={() => reroute("explore")}><img src={exploreIcon} alt="" className="link-icon rounded bg-transparent me-2"/> <span className="link-btn-text bg-transparent">Explore</span> </button>
                        </p>
                        <p className="text-start link-container">
                        <button className="h3 rounded-pill p-2 pe-4 links-link text-start border-0" onClick={() => reroute("notifications")}>
                        <img src={notificationsIcon} alt="" className="link-icon rounded bg-transparent me-1"/> <span className="link-btn-text bg-transparent">Notifications</span> 
                            {
                                hasNotif ? 
                                "  🔴"
                                :
                                ""
                            }
                        </button>
                        </p>
                        <p className="text-start link-container"> 
                        <button className="h3 rounded-pill p-2 pe-4 links-link text-start border-0"><img src={messagesIcon} alt="" className="link-icon rounded bg-transparent me-2"/> <span className="link-btn-text bg-transparent">Messages</span> </button>
                        </p>
                        <p className="text-start link-container">
                        <button className="h3 rounded-pill p-2 pe-4 links-link text-start border-0"><img src={bookmarkIcon} alt="" className="link-icon rounded bg-transparent me-2"/> <span className="link-btn-text bg-transparent">Bookmarks</span> </button>
                        </p>
                        <p className="text-start link-container">
                        <button className="h3 rounded-pill p-2 pe-4 links-link text-start border-0"><img src={listIcon} alt="" className="link-icon rounded bg-transparent me-2"/> <span className="link-btn-text bg-transparent">Lists</span> </button>
                        </p>
                        <p className="text-start link-container">
                        <button className="h3 rounded-pill p-2 pe-4 links-link text-start border-0" onClick={() => reroute("account")}><img src={profileIcon} alt="" className="link-icon rounded bg-transparent me-2"/> <span className="link-btn-text bg-transparent">Profile</span> </button>
                        </p>
                        <p className="text-start link-container">
                        <button className="h3 rounded-pill p-2 pe-4 links-link text-start border-0"><img src={moreIcon} alt="" className="link-icon rounded bg-transparent me-2"/> <span className="link-btn-text bg-transparent">More</span> </button>
                        </p>
                    </nav>
                    {/* <p className="mt-2">
                            <button className="btn btn-primary rounded-pill p-3" id="open-tweet-form">Anotter</button>
                    </p> */}
                    <div className="row mt-4">
                        <div className="col-3 w-100" id="links-user-container"><p className="profile-img-container profile-img-container-nav">
                            <img src={props.loggedInUser.profileImageUrl} className="rounded-circle" className="profile-img" onClick={() => history.push("/p/" + sessionStorage.getItem("user_id"))}/>
                        </p>
                        </div>
                        <div className="col bg-transparent" id="links-name-display" style={{height:"25px"}}>
                            {props.loggedInUser.firstName} {props.loggedInUser.lastName}
                        </div>
                    </div>
        </>
    )
}
