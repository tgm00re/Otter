import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function NotificationsMiddle() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        console.log("Running");
        const link = "http://localhost:8080/api/notifications/find/" + sessionStorage.getItem("user_id");
        console.log("Link: ", link)
        axios.get(link)
            .then(response => setNotifications(response.data))
            .catch(err => console.log(err));
    }, [])


    return (
        <>
            <h1 className="text-start ps-2">Notifications - {notifications.length}</h1>
            <hr />
            <ul className="text-start ps-0" style={{listStyle: "none"}}>
                {
                    notifications.map((item, index) => {
                        return (
                            <>
                            <li className="h5 d-flex p-0 m-0 justify-content-around align-items-center">
                                <span>
                                    {item.senderName} sent you a friend request!
                                </span>
                                <div>
                                    <button className="btn btn-transparent border-3 border-success rounded-pill text-success me-3" id="friend-accept-btn">Accept</button><button className="btn rounded-pill border-danger border-3 border-danger text-danger btn-transparent" id="friend-decline-btn">Decline</button>
                                </div>
                            </li>
                            <hr />
                            </>
                        )
                    })
                }
            </ul>
        </>
    )
}
