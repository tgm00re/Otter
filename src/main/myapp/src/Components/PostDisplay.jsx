import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaComment } from 'react-icons/fa';
import Post from './Post';

export default function PostDisplay(props) {
    // const [posts, setPosts] = useState([]);
    


    // useEffect(() => {
    //     let isMounted = true;
    //     if(isMounted){
    //         axios.get("http://localhost:8080/api/posts")
    //             .then(response => {
    //                 setPosts(response.data);
    //             })
    //             .catch(err => console.log(err));
    //     }
    //     return () => {isMounted = false}
    // }, [])

    return (
        <div>
            <ul id="post-list" className="text-start">
                {props.posts.sort(function(a,b) {
                    var keyA = new Date(a.createdAt);
                    var keyB = new Date(b.createdAt);
                    if(keyA > keyB) return -1;
                    if(keyA < keyB) return 1;
                    return 0
                }).map((post, index) => {
                    return (
                        <li className="post pt-1" key={index}>
                            <Post post={post}/>
                            <hr className="mt-1"/>
                        </li>
                    )
                })}
            </ul>

        </div>
    )
}
