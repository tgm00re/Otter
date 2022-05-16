import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function NotificationsMiddle() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        console.log("Running");
        const link = "http://localhost:8080/api/notifications/find/received/" + sessionStorage.getItem("user_id");
        console.log("Link: ", link)
        axios.get(link)
            .then(response => setNotifications(response.data))
            .catch(err => console.log(err));
    }, [])

    function deleteNotification(notification, index){
        axios.delete("http://localhost:8080/api/notifications/delete/" + notification.id)
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    function deleteNotificationFromArray(index){
        let newNotifArr = [...notifications];
        newNotifArr.splice(index, 1);
        setNotifications(newNotifArr);
    }

    function handleAccept(notification, index){
        //Create a friendship between the two ids
        const addFriendship = {
            firstUserId: notification.recipientId,
            secondUserId: notification.senderId
        }
        axios.post("http://localhost:8080/api/friendships/create", addFriendship)
            .then(response => {
                console.log(response)
            })
            .catch(error => console.log(error));
        //Delete the notifcation
        deleteNotification(notification);
        //Remove notification from notification array
        deleteNotificationFromArray(index);
    }

    function handleDecline(notification, index){
        //Delete the notification
        deleteNotification(notification);
        deleteNotificationFromArray(index);
    }





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
                                    <button className="btn btn-transparent border-3 border-success rounded-pill text-success me-3" id="friend-accept-btn" onClick={() => handleAccept(item, index)}>Accept</button>
                                    <button className="btn rounded-pill border-danger border-3 border-danger text-danger btn-transparent" id="friend-decline-btn" onClick={() => handleDecline(item, index)}>Decline</button>
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
