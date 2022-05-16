import React from 'react'
import PostDisplay from './PostDisplay'
import TweetForm from './TweetForm'
import { useState, useEffect } from 'react';
import axios from 'axios';
export default function ExploreMid(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let isMounted = true;
        if(isMounted){
            axios.get("http://localhost:8080/api/posts")
                .then(response => {
                    setPosts(response.data.filter((post) => post.userId != sessionStorage.getItem("user_id")));
                })
                .catch(err => console.log(err));
        }
        return () => {isMounted = false}
    }, [])

    return (
        <div className="text-start">
            <h1 className="ps-2">Explore</h1>
            <PostDisplay posts={posts}/>
        </div>
    )
}