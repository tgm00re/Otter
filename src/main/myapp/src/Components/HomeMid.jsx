import React from 'react'
import PostDisplay from './PostDisplay'
import TweetForm from './TweetForm'
import { useState, useEffect } from 'react';
import axios from 'axios';
export default function HomeMid(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let isMounted = true;
        if(isMounted){
            const link = "http://localhost:8080/api/posts/friends/" + sessionStorage.getItem("user_id");
            axios.get(link)
                .then(response => {
                    console.log(response.data);
                    setPosts(response.data);
                })
                .catch(err => console.log(err.response));
        }
        return () => {isMounted = false}
    }, [])

    return (
        <div className="text-start">
            <h1 className="ps-2">Home</h1>
            <TweetForm setPosts={setPosts} loggedInUser={props.loggedInUser} posts={posts}/>
            <PostDisplay posts={posts}/>
        </div>
    )
}
