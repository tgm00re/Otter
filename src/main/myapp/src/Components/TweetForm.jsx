import axios from 'axios';
import React, { useState } from 'react'

export default function TweetForm(props) {
    const [message, setMessage] = useState("");
    const [messageError, setMessageError] = useState("");
    const [imageError, setImageError] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    function handleSubmit(e){
        e.preventDefault();

        if(message.length !== 0){
            const post={
                message: message,
                imageUrl: imageUrl
            }

                axios.post("http://localhost:8080/api/posts/create/" + props.loggedInUser.userId, post)
                .then(response => {
                    let newPosts = [...props.posts];
                    newPosts.push(response.data);
                    props.setPosts(newPosts);
                    setMessage("");
                    setMessageError("");
                    setImageUrl("");
                })
                .catch(error => console.log(error.response))
            } else {
            setMessageError("Your anotter message cannot be blank!");
        }        
    }


    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = (() => {
                resolve(fileReader.result)
            });

            fileReader.onerror = ((error) => {
                reject(error);
                setImageError("File is too large!")
            })

        })
    }

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setImageUrl(base64);
    }


    return (
        <div id="tweet-form" className="pb-2">
            <div className="px-1 mt-2 d-flex align-items-start">
                <form className="w-100 mx-3" onSubmit={e => handleSubmit(e)}>
                    <p className="profile-img-container">
                        <img src={props.loggedInUser.profileImageUrl} alt="" className="rounded-circle profile-img"/>
                    </p>
                    <div className="text-end">
                        <textarea placeholder="What's happening?" className="w-100 bg-transparent border-0" rows="3" id="tweet-form-input" maxLength="200" value={message} onInput={e => {
                            setMessage(e.target.value);
                        }}/>
                    </div>
                    <div className="text-center w-100 mb-3">
                        {imageUrl != "" ?
                            <img className="rounded post-img" src={imageUrl}/>
                        :
                        null}
                    </div>
                    
                    <div className="text-end">
                    { imageUrl != "" ?
                        <label className="btn  border-danger text-start mx-2 px-1" style={{fontWeight:"bold"}}>
                            <span className="text-danger" onClick={() => setImageUrl("")}>Remove Image</span>
                        </label> 
                        :
                        null
                    }
                    
                        <label className="btn text-light border text-start mx-4 px-1" style={{fontWeight:"bold"}}>
                            Upload Image
                            <input type="file" className="form-control bg-transparent border-0" accept="image/*" onChange={e => uploadImage(e)} hidden/>
                        </label>  
                        <button type="submit" className="btn btn-primary rounded-pill p-2" id="tweet-submit">Anotter</button>    
                    </div>
                    <div className="text-end">
                    <p className="text-danger bg-transparent" style={{fontWeight:"bold"}}>{messageError}</p>

                    </div>
                    
                </form>
            </div>
        </div>
    )
}
