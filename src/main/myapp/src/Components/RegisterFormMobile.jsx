import React from 'react'
import { useState, useEffect } from 'react'
import background from '../Static/Images/login-image.webp'
import icon from '../Static/Images/otter-icon.png'
import googleIcon from '../Static/Images/google-icon.png'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import axios from 'axios'
import e from 'cors'
import backArrow from '../Static/Images/White-Arrow.png'

export default function RegisterFormMobile() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [confirmPassError, setConfirmPassError] = useState("");

    let history = useHistory();

    useEffect(() => {
        if (sessionStorage.getItem("user_id") != null) {
            history.push("/home")
        }
    })

    function handleSubmit(e) {
        e.preventDefault();

        const newUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }


        if (confirmPassError == "") {
            axios.post("http://localhost:8080/api/users/create", newUser)
                .then(response => {
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                    setConfirmPassError("");
                    setErrors({});

                    sessionStorage.setItem("user_id", response.data.id);
                    sessionStorage.setItem("loggedInUser", JSON.stringify(response.data));

                    window.location.replace("/home");
                })
                .catch(err => {
                    let errorObj = {};
                    if (err.response.data.message == "could not execute statement; SQL [n/a]; constraint [users.UK_6dotkott2kjsp8vw4d0m25fb7]; nested exception is org.hibernate.exception.ConstraintViolationException: could not execute statement") {
                        errorObj['email'] = "Email already exists";
                        setErrors(errorObj);
                        return;
                    }
                    let errorList = err.response.data.fieldErrors;
                    for (let i = 0; i < errorList.length; i++) {
                        if (errorList[i].field === "firstName") {
                            if (Object.keys(errorObj).includes("firstName")) {
                                errorObj[errorList[i].field] = "First name is required";
                            } else {
                                errorObj[errorList[i].field] = errorList[i].message;
                            }
                        } else if (errorList[i].field === "lastName") {
                            if (Object.keys(errorList[i]).includes("lastName")) {
                                errorObj['lastName'] = "Last name is required";
                            } else {
                                errorObj[errorList[i].field] = errorList[i].message;
                            }
                        } else {
                            errorObj[errorList[i].field] = errorList[i].message;
                        }
                    }
                    setErrors(errorObj);
                })
        }





    }

    function checkConfirmPasswordWithPassword(e) {
        if (confirmPassword !== e.target.value) {
            setConfirmPassError("Confirm password must match password");
        } else {
            setConfirmPassError("");
        }
    }

    
    function checkConfirmPasswordWithConfirmPassword(e) {
        if (e.target.value !== password) {
            setConfirmPassError("Confirm password must match password");
        } else {
            setConfirmPassError("");
        }
    }



    return (
        <div>
                        <div>
                            <div>
                                <div className="p-0 d-flex justify-content-between px-1 pt-1">
                                    <img src={backArrow} alt="back arrow" style={{width: "50px", height:"40px"}} onClick={() => history.push("/register")}/>
                                    <img src={icon} alt="Otter" id="login-icon" />
                                    <div style={{width: "70px"}}></div>
                                </div>
                                <div className=" mt-0 pt-0 px-5">

                                    <h5 className="modal-title h1" id="exampleModalLongTitle">Create your account</h5>
                                    <form onSubmit={e => handleSubmit(e)}>
                                        <div className="form-group my-3">
                                            <input type="text" className="form-control signup-input" placeholder="First name" maxLength="50" value={firstName} onInput={e => setFirstName(e.target.value)} />
                                            <p className="text-danger">{errors.firstName}</p>
                                        </div>
                                        <div className="form-group my-3">
                                            <input type="text" className="form-control signup-input" placeholder="Last name" value={lastName} onInput={e => setLastName(e.target.value)} />
                                            <p className="text-danger">{errors.lastName}</p>
                                        </div>
                                        <div className="form-group my-3">
                                            <input type="email" className="form-control signup-input" placeholder="Email" value={email} onInput={e => setEmail(e.target.value)} />
                                            <p className="text-danger">{errors.email}</p>
                                        </div>
                                        <div className="form-group my-3">
                                            <input type="password" className="form-control signup-input" placeholder="Password" value={password} onInput={e => {
                                                setPassword(e.target.value);
                                                checkConfirmPasswordWithPassword(e);
                                            }} />
                                            <p className="text-danger">{errors.password}</p>
                                        </div>
                                        <div className="form-group my-3">
                                            <input type="password" className="form-control signup-input" placeholder="Confirm password" value={confirmPassword} onInput={e => {
                                                setConfirmPassword(e.target.value)
                                                checkConfirmPasswordWithConfirmPassword(e);
                                            }} />
                                            <p className="text-danger">{confirmPassError}</p>
                                        </div>
                                        <button type="submit" className="btn btn-light rounded-pill register-page-button w-100 p-55 mt-5 mb-3" id="signup-submit-button">Sign up</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
    )
}
