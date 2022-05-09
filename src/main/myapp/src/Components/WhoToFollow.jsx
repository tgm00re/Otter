import axios from 'axios'
import React, { useEffect, useState } from 'react'
import placeholderImg from '../Static/Images/placeholder-img.png'






export default function WhoToFollow() {
    const [users, setUsers] = useState([]);
    const [friendIds, setFriendIds] = useState([]);

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


    useEffect(()=> {

        axios.get("http://localhost:8080/api/users/")
            .then(response => {
                setUsers(response.data);
                findFriendIds();

            })
            .catch(err => console.log(err))
    },[])

    function findFriendIds(){
        const link = "http://localhost:8080/api/friendships/findAllFriends/" + sessionStorage.getItem("user_id");
        axios.get(link)
            .then(response => setFriendIds(response.data))
            .catch(err => console.log(err.response));
    }



    return (
        <div style={{backgroundColor: "rgba(60, 64, 67, 0.01)"}} className="rounded mt-5 p-1" id="who-to-follow-container">
            <h3 className="bg-transparent">Who to follow</h3>
            <ul className="bg-transparent px-1">
                {users.map((user, index) => {
                    if(user.userId != sessionStorage.getItem("user_id")){
                        return(
                        <li className="d-flex justify-content-between align-items-center bg-transparent my-3" key={index}>
                            <img src={placeholderImg} alt="" className="rounded-circle bg-transparent profile-img"/>
                            <span className="bg-transparent">{user.firstName} {user.lastName}</span>
                            {!friendIds.includes(user.userId) ? (
                                <button className="btn rounded-pill bg-light p-2" onClick={e => handleFollow(e.target.value)} value={user.userId}>Follow</button>
                                )
                                :   <button className="btn rounded-pill bg-light p-2" onClick={e => handleUnfollow(e.target.value)} value={user.userId}>Unfollow</button>
                            }
                        </li>
                        )
                    }
                })}
            </ul>
        </div>
    )
}
