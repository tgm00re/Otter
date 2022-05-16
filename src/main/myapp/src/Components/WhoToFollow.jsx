import axios from 'axios'
import React, { useEffect, useState } from 'react'





export default function WhoToFollow(props) {
    const [users, setUsers] = useState([]);
    const [friendIds, setFriendIds] = useState([]);
    const [sentNotifs, setSentNotifs] = useState([]);
    const [recipientIds, setRecipientIds] = useState([]);

    function handleCancelRequest(recipientId) {
        let notifIdToDelete = -1;
        console.log(sentNotifs);
        for (let i = 0; i < sentNotifs.length; i++) {
            if (sentNotifs[i].recipientId == recipientId) {
                console.log(sentNotifs[i].recipientId + " == " + recipientId);
                notifIdToDelete = sentNotifs[i].id;
            }
        }
        if(notifIdToDelete !== -1){
            console.log("Deleting: ", notifIdToDelete);
        axios.delete("http://localhost:8080/api/notifications/delete/" + notifIdToDelete)
            .then(response => {
                let newSentNotif = [...sentNotifs];
                newSentNotif.splice(newSentNotif.indexOf(notifIdToDelete));
                setSentNotifs(newSentNotif);

                let newArr = [...recipientIds];
                const indexToRemove = newArr.indexOf(recipientId);
                newArr.splice(indexToRemove, 1);
                setRecipientIds(newArr);

            })
            .catch(err => {
                console.log(err.response)
                let newArr = [...recipientIds];
                const indexToRemove = newArr.indexOf(recipientId);
                newArr.splice(indexToRemove, 1);
                setRecipientIds(newArr);
            })
        } else {
            console.log("Reached else! :D")
            let newArr = [...recipientIds];
            const indexToRemove = newArr.indexOf(recipientId);
            newArr.splice(indexToRemove, 1);
            setRecipientIds(newArr);
        }
        
    }


    function handleFollow(secondUserId) {
        console.log(secondUserId + " <<<<<")
        const notification = {
            message: "Friend Request",
            senderId: sessionStorage.getItem("user_id"),
            senderName: props.loggedInUser.firstName + " " + props.loggedInUser.lastName,
            recipientId: secondUserId
        }
        axios.post("http://localhost:8080/api/notifications/create", notification)
            .then(response => {
                let newSentNotif = [...sentNotifs];
                console.log("Adding notification: " );
                console.log(response.data);
                newSentNotif.push(response.data);
                setSentNotifs(newSentNotif);

                let newRecipientIds = [...recipientIds];
                newRecipientIds.push(response.data.recipientId);
                setRecipientIds(newRecipientIds);
            })
            .catch(error => console.log(error));
    }

    function handleUnfollow(secondUserId) {
        const firstUserId = sessionStorage.getItem("user_id");
        const link = "http://localhost:8080/api/friendships/delete/" + firstUserId + "/" + secondUserId;
        axios.delete(link)
            .then(response => {
                let newFriendIds = [...friendIds];
                newFriendIds.splice(newFriendIds.indexOf(secondUserId), 1);
                setFriendIds(newFriendIds);
            })
            .catch(error => console.log(error))
    }


    useEffect(() => {

        axios.get("http://localhost:8080/api/users/")
            .then(response => {
                setUsers(response.data);
                findFriendIds();

            })
            .catch(err => console.log(err))
    }, [])

    function findFriendIds() {
        const link = "http://localhost:8080/api/friendships/findAllFriends/" + sessionStorage.getItem("user_id");
        axios.get(link)
            .then(response => setFriendIds(response.data))
            .catch(err => console.log(err.response));
    }



    useEffect(() => {
        const link = "http://localhost:8080/api/notifications/find/sent/" + sessionStorage.getItem("user_id");
        axios.get(link)
            .then(response => {
                setSentNotifs(response.data);
                let sentIds = [];
                response.data.forEach(notif => {
                    sentIds.push(notif.recipientId);
                })
                setRecipientIds(sentIds);
            })
            .catch(err => console.log(err));
    }, [])



    return (
        <div style={{ backgroundColor: "rgba(255,255,255,0.10)" }} className="rounded mt-5 p-1" id="who-to-follow-container">
            <h3 className="bg-transparent">Who to follow</h3>
            <ul className="bg-transparent px-1">
                {users.map((user, index) => {
                    if (user.userId != sessionStorage.getItem("user_id")) {
                        return (
                            <li className="d-flex justify-content-between align-items-center bg-transparent my-3" key={index}>
                                <img src={user.profileImageUrl} alt="" className="rounded-circle bg-transparent profile-img" />
                                <span className="bg-transparent post-acc-link-txt">{user.firstName} {user.lastName}</span>
                                {
                                    recipientIds.includes(user.userId) ? (
                                        <button className="btn rounded-pill bg-light p-2" onClick={e => handleCancelRequest(user.userId)}>Requested</button>
                                    )

                                        : !friendIds.includes(user.userId) ? (
                                            <button className="btn rounded-pill bg-light p-2" onClick={e => handleFollow(user.userId)}>Follow</button>
                                        )
                                            : <button className="btn rounded-pill bg-light p-2" onClick={e => handleUnfollow(user.userId)}>Unfollow</button>
                                }
                            </li>
                        )
                    }
                })}
            </ul>
        </div>
    )
}
