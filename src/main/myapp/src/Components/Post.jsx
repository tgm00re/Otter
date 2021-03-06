import React from 'react'
import Heart from 'react-animated-heart'
import speechBubble from '../Static/Images/speech-bubble.png'
import { useState } from 'react';
import { useHistory } from 'react-router';

export default function Post(props) {
    const [isClicked, setClicked] = useState(false);
    let history = useHistory();


    return (
        <div className="post-container pt-3 pb-2">
            <h3><img src={props.post.profileImageUrl} className="profile-img mx-2" /><span className="post-acc-link-txt" onClick={() => history.push("/p/" + props.post.userId)}>{props.post.firstName} {props.post.lastName}</span> says:</h3>
            <div className="container">
                    <p className="ms-5">{props.post.message}</p>
                <div className="text-center mb-2" id="post-img-container">
                    {props.post.imageUrl != "" ?
                        <img className="post-img" src={props.post.imageUrl} />
                        :
                        null}
                </div>
                <div className="d-flex align-items-center justify-content-center" id="post-action-container" style={{height: "40px"}}>
                    <Heart isClick={isClicked} onClick={() => setClicked(!isClicked)} id="heart-icon"/>
                    <div style={{width: "100px",height: "100px"}} className="d-flex bg-transparent justify-content-center align-items-center" id="comment-bubble-container"><img src={speechBubble} alt="comment" style={{width: "33px",height: "33px", cursor:"pointer"}} id="comment-btn"/></div>

                </div>
            </div>
        </div>
    )
}
