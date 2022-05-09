import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'

export default function UserDisplay(props) {
    const [userToDisplay, setUserToDisplay] = useState({});
    let history = useHistory();
    const [friendIds, setFriendIds] = useState([]);

    useEffect(() => {
        console.log(props.id)
        axios.get("http://localhost:8080/api/users/" + props.id)
            .then(response => {
                if(response.data.biography || response.data.biography == ""){
                    //User was found
                    console.log("user was found.")
                    setUserToDisplay(response.data)
                    findFriendIds();
                } else{
                    //User was not found
                    console.log("user was not found.")
                    history.push("/");
                }
            })
            .catch(err => console.log(err));
    }, [])

    function handleFollow(secondUserId){
        const addFriendship = {
            firstUserId: sessionStorage.getItem("user_id"),
            secondUserId: secondUserId
        }
        console.log(addFriendship);
        axios.post("http://localhost:8080/api/friendships/create", addFriendship)
            .then(response => {
                console.log(response)
                findFriendIds();
            })
            .catch(error => console.log(error));
    }

    function handleUnfollow(secondUserId){
        const firstUserId = sessionStorage.getItem("user_id");
        const link  = "http://localhost:8080/api/friendships/delete/" + firstUserId + "/" + secondUserId;
        axios.delete(link)
            .then(response => {
                let newFriendIds = [...friendIds];
                newFriendIds.splice(newFriendIds.indexOf(secondUserId), 1);
                setFriendIds(newFriendIds);
        })
            .catch(error => console.log(error))
    }

    function findFriendIds(){
        const link = "http://localhost:8080/api/friendships/findAllFriends/" + sessionStorage.getItem("user_id");
        axios.get(link)
            .then(response => setFriendIds(response.data))
            .catch(err => console.log(err.response));
    }

    return (
        <>
            <div className="text-start">
                <img src="https://c4.wallpaperflare.com/wallpaper/55/456/961/4k-galaxy-space-planet-wallpaper-preview.jpg" alt="Profile banner" style={{objectFit:"cover", objectPosition: "center center" ,height: "175px", width: "100%"}}/>
                <div className="ms-3">
                    <div className="d-flex justify-content-between" style={{height:"50px"}}>
                        <img src={userToDisplay.profileImageUrl} className="w-25" style={{borderRadius:"50%", width:"100px", height:"100px", position:"relative", top:"-75px"}} />
                        <span className="h3 mx-3" style={{height:"50px"}}>{userToDisplay.firstName} {userToDisplay.lastName}</span>
                        {userToDisplay.userId != sessionStorage.getItem("user_id") ?
                        !friendIds.includes(userToDisplay.userId) ? (
                            <button className="btn rounded-pill bg-light follow-btn justify-self-end"  onClick={e => handleFollow(e.target.value)} value={userToDisplay.userId}>Follow</button>
                            )
                            : <button className="btn rounded-pill bg-transparent text-light border border-3 follow-btn"  onClick={e => handleUnfollow(e.target.value)} value={userToDisplay.userId}>Unfollow</button>
                        
                            : <button className="btn rounded-pill bg-transparent text-light border border-3 follow-btn"  onClick={() => history.push("/account")}>Edit Profile</button>
  
                        }
                        
                    </div>
                    <p className="px-3 mt-4">{userToDisplay.biography}</p>
                </div>
                <hr />
            </div>
        </>
    )
}
