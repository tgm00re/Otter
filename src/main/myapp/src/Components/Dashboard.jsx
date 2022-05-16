import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import icon from '../Static/Images/otter-icon.png'
import EditAccount from './EditAccount';
import Explore from './Explore';
import ExploreRight from './ExploreRight';
import Home from './Home'
import HomeRight from './HomeRight';

export default function Dashboard() {
    const [loggedInUser, setLoggedInUser] = useState("");
    const [currentPageNum, setCurrentPageNum] = useState(1);

    const PAGE_NUM_REFERENCE = {
        1: "home",
        2: "editAccount",
        3: "explore"
    }



    let history = useHistory();
    useEffect(() => {
        if (sessionStorage.getItem("user_id") == null) {
            history.push("/register");
        } else {
            const loggedInUserId = sessionStorage.getItem("user_id");
            const link = "http://localhost:8080/api/users/" + loggedInUserId;
            axios.get(link)
                .then(response => setLoggedInUser(response.data))
                .catch(err => console.log(err));
        }
    })

    return (
        <div className="container-fluid px-5"> {/* Start of container */}
            <div className="row">

                <div className="col-sm-3 vh-100 pt-1" id="dashboard-col-left">
                    <img src={icon} alt="Otter" className="mt-1" id="dashboard-icon" />
                    <nav className="mt-5">
                        <p className="text-start">
                            <button className="h3 rounded-pill w-50 text-start border-0" onClick={() => setCurrentPageNum(1)}>Home</button>
                        </p>
                        <p className="text-start">
                            <button className="h3 rounded-pill w-50 text-start border-0" >Explore</button>
                        </p>
                        <p className="text-start">
                            <button className="h3 rounded-pill w-50 text-start border-0">Notifications</button>
                        </p>
                        <p className="text-start">
                            <button className="h3 rounded-pill w-50 text-start border-0">Messages</button>
                        </p>
                        <p className="text-start">
                            <button className="h3 rounded-pill w-50 text-start border-0">Bookmarks</button>
                        </p>
                        <p className="text-start">
                            <button className="h3 rounded-pill w-50 text-start border-0">Lists</button>
                        </p>
                        <p className="text-start">
                            <button className="h3 rounded-pill w-50 text-start border-0">Profile</button>
                        </p>
                        <p className="text-start">
                            <button className="h3 rounded-pill w-50 text-start border-0">More</button>
                        </p>
                    </nav>
                    <p className="mt-2">
                        <button className="btn btn-primary rounded-pill p-3" id="open-tweet-form">Anotter</button>
                    </p>
                    <div className="row mt-4">
                        <p className="profile-img-container">
                            <img src={loggedInUser.profileImageUrl} className="rounded-circle" className="profile-img" onClick={() => setCurrentPageNum(2)} />
                        </p>
                    </div>
                </div>

            </div>
        </div> //End of container
    )
}
