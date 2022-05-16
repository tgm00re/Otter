import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
export default function EditAccount(props) {
    const [firstName, setFirstName] = useState(props.loggedInUser.firstName);
    const [firstNameError, setFirstNameError] = useState("");
    const [lastName, setLastName] = useState(props.loggedInUser.lastName);
    const [lastNameError, setLastNameError] = useState("");
    const [profileImageUrl, setProfileImageUrl] = useState(props.loggedInUser.profileImageUrl);
    const [imageError, setImageError] = useState("");
    const [biography, setBiography] = useState(props.loggedInUser.biography);


    let history = useHistory();

    function logout() {
        sessionStorage.clear();
        history.push("/");
    }

    

    function handleSubmit(e){
        e.preventDefault();
        const editAccountInformation = {
            id: props.loggedInUser.userId,
            firstName: firstName,
            lastName: lastName,
            profileImageUrl: profileImageUrl,
            biography: biography
        }
        axios.put("http://localhost:8080/api/users/update", editAccountInformation)
            .then(response => {
                if(!response.data.email){
                    if(response.data.firstName){
                        setFirstNameError(response.data.firstName);
                    }
                    if(response.data.lastName){
                        setLastNameError(response.data.lastName);
                    }

                } else {
                    sessionStorage.setItem("loggedInUser", JSON.stringify(response.data));
                    history.push("/home");
                }
            })
            .catch(err => console.log(err))
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
        setProfileImageUrl(base64);
    }


    return (
        <>
            <h1>DELETE THIS: <p onClick={logout}>Logout</p></h1>
            <h1 className="h1 mt-1 px-1" style={{ fontSize: "40px" }}>Edit Account Information</h1>
            <form onSubmit={(e) => handleSubmit(e)} className="text-center d-flex flex-column align-items-center px-2">

                            <h4 className="text-start w-100">Edit Name</h4>
                            <div className="row border-bottom w-100">
                                <div className="col p-0" >
                                    <input type="text" className="form-control signup-input" placeholder="First name" value={firstName} onInput={e => setFirstName(e.target.value)} />
                                    <p className="text-danger bold-font text-start">{firstNameError}</p>
                                </div>
                                <div className="col-1"></div>
                                <div className="col p-0">
                                    <input type="text" className="form-control signup-input " placeholder="Last name" value={lastName} onInput={e => setLastName(e.target.value)} />
                                    <p className="text-danger bold-font text-start">{lastNameError}</p>
                                </div>
                            </div>
                            <div className="form-group border-bottom my-3 w-100">
                                <h4 className="text-start">Edit Profile Image</h4>
                                <img src={profileImageUrl} className="profile-img-edit my-2" alt="current profile image" />
                                <div>
                                <label className="btn btn-primary form-control p-3 rounded-pill w-25" style={{backgroundColor: "rgb(29, 155, 240)", fontWeight:"bold"}}>Upload image
                                    <input type="file" className="form-control bg-transparent border-0" accept="image/*" onChange={e => uploadImage(e)} hidden/>
                                </label>  
                                </div>
                                <p className="text-danger bold-font text-start">{imageError}</p>
                            </div>
                            <div className="form-group border-bottom my-3 w-100">
                                <h4 className="text-start">Edit Biography {"( " + biography.length + " / 200  )"}</h4>
                                <textarea placeholder={"Tell us about yourself, " + firstName} className="w-100 bg-transparent border-0" rows="2" id="tweet-form-input" maxLength="200" value={biography} onInput={e => {
                                    setBiography(e.target.value);
                                }} />
                            </div>
                        
                <button type="submit" className="btn btn-light rounded-pill register-page-button w-75 p-1 mt-5 mb-3" id="signup-submit-button">Save Changes</button>
            </form>
        </>
    )
}
