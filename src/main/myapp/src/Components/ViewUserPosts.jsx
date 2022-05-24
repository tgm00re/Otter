import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import PostDisplay from './PostDisplay';

export default function ViewUserPosts(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let isMounted = true;
        if(isMounted){
            const link = "http://localhost:8080/api/posts/user/" + props.id;
            console.log(link);
            axios.get(link)
                .then(response => {
                    setPosts(response.data);
                })
                .catch(err => console.log(err.response));
        }
        return () => {isMounted = false}
    }, [])



    return (
        <>
            <PostDisplay posts={posts}/>
        </>
    )
}
