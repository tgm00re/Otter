import React, { useState, useEffect } from 'react'
import background from '../Static/Images/login-image.webp'
import icon from '../Static/Images/otter-icon.png'
import googleIcon from '../Static/Images/google-icon.png'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import axios from 'axios'
import e from 'cors'
export default function Register() {
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
        //Container Start
        <>
            <div className="container-fluid p-0 m-0" id="register-container">
                <div className="row" id="first-row">
                    <div className="col-md-7">
                        <img src={background} alt="Otter" id="register-bg-img" />
                    </div>
                    <div className="col-md-5 text-start px-4 right-col">
                        <div className="row pt-3 mt-5">
                            <img src={icon} alt="Otter" id="login-icon" className="mb-3" />
                        </div>
                        <div className="row mt-5">
                            <h1 id="register-header">Happening now</h1>
                        </div>
                        <div className="row mt-5">
                            <h2 className="mb-3">Join Otter today.</h2>
                            <div>
                                <button className="btn btn-light rounded-pill register-page-button register-page-button-google my-3"> <img src={googleIcon} alt="Google Icon" id="google-icon" />Sign up with Google</button>
                                <button className="btn btn-light rounded-pill register-page-button">
                                    <svg id="apple-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-apple" viewBox="0 0 16 16">

                                        <path fill="black" d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z" />
                                        <path fill="black" d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z" />
                                    </svg>
                                    Sign up with Apple</button>
                            </div>
                        </div>
                        <div className="separator mt-3">or</div>
                        <button className="btn rounded-pill register-page-button register-page-button-email my-3" data-toggle="modal" data-target="#signup-modal"> Sign up with phone or email</button>
                        {/* Modal */}
                        <div className="modal fade" id="signup-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header p-0">
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                        <img src={icon} alt="Otter" id="login-icon" />
                                        <div></div>
                                    </div>
                                    <div className="modal-body mt-0 pt-0 px-5">

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
                        {/* END OF MODAL */}
                        <p id="sign-up-agreement">By signing up, you agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>, including <a href="#">Cookie Use</a></p>
                        <div className="mt-5">
                            <p>Already have an account?</p>
                            <Link to="/login" style={{ textDecoration: 'none' }}><button className="btn rounded-pill register-page-button register-page-button-signin my-3 border-1">Sign in</button></Link>
                        </div>
                    </div>
                </div>
                <div className="row px-2" id="second-row">
                    <div id="info-list">
                        <a href="#">About</a> &nbsp; &nbsp; <a href="#">Help Center</a> &nbsp; &nbsp; <a href="#">Terms of Service</a> &nbsp; &nbsp; <a href="#">Privacy Policy</a> &nbsp; &nbsp; <a href="#">Cookie Policy</a> &nbsp; &nbsp; <a href="#">Accessibility</a> &nbsp; &nbsp; <a href="#">Ads info</a> &nbsp; &nbsp; <a href="#">Blog</a> &nbsp; &nbsp; <a href="#">Status</a> &nbsp; &nbsp; <a href="#">Careers</a> &nbsp; &nbsp; <a href="#">Brand Resources</a> &nbsp; &nbsp; <a href="#">Advertising</a> &nbsp; &nbsp; <a href="#">Marketing</a> &nbsp; &nbsp; <a href="#">Twitter for Business</a> &nbsp; &nbsp; <a href="#">Developers</a> &nbsp; &nbsp; <a href="#">Directory</a> &nbsp; &nbsp; <a href="#">Settings</a> © 2022 Otter, Inc
                    </div>
                </div>
                {/* container finish */}
            </div>
            <div id="register-mobile">
                <div className="row ps-4 m-0 pb-0 pt-1">
                    <img src={icon} alt="Otter" style={{ width: "75px", height: "75px" }} className="m-0 p-0" />
                </div>

                <div className="row ps-5 py-0">
                    <h3 id="register-header" className="text-start p-0">Happening now</h3>
                </div>
                <div className="row ps-5 pt-0">
                    <h2 className="mb-3 p-0 text-start">Join Otter today.</h2>
                    <div className="text-start p-0 d-flex align-items-start justify-content-start flex-column">
                        <button className="btn btn-light rounded-pill register-page-button register-page-button-google my-3"> <img src={googleIcon} alt="Google Icon" id="google-icon" />Sign up with Google</button>
                        <button className="btn btn-light rounded-pill register-page-button">
                            <svg id="apple-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-apple" viewBox="0 0 16 16">

                                <path fill="black" d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z" />
                                <path fill="black" d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z" />
                            </svg>
                            Sign up with Apple</button>
                    </div>
                    <div className="p-0  m-0">
                        <div className="separator mt-3">or</div>
                    </div>
                    <div className="p-0 m-0">
                        <button className="btn rounded-pill register-page-button register-page-button-email my-3" onClick={() => history.push("/mobilereg")} > Sign up with phone or email</button>
                    </div>
                    <div className="p-0 m-0">
                        <p id="sign-up-agreement">By signing up, you agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>, including <a href="#">Cookie Use</a></p>
                    </div>
                    <div className="mt-3 p-0">
                            <p className="text-start">Already have an account?</p>
                            <Link to="/login" style={{ textDecoration: 'none' }}><button className="btn rounded-pill register-page-button register-page-button-signin my-3 border-1">Sign in</button></Link>
                        </div>
                    
                </div>
            </div>
        </>
    )
}

