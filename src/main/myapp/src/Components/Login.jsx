import React, { useEffect, useState } from 'react'
import icon from '../Static/Images/otter-icon.png'
import googleIcon from '../Static/Images/google-icon.png'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useHistory } from 'react-router';
import backArrow from '../Static/Images/White-Arrow.png'


export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    let history = useHistory();

    useEffect(() => {
        if (sessionStorage.getItem("user_id") != null) {
            history.push("/home")
        }
    })

    function handleSubmit(e) {
        e.preventDefault();
        // console.log("submitting");
        const loginUser = {
            email: email,
            password: password
        }
        console.log(loginUser);
        axios.post("http://localhost:8080/api/users/login", loginUser)
            .then(response => {
                if (response.data.userId) {
                    setError("");
                    //  console.log(response.data);
                    sessionStorage.setItem("user_id", response.data.userId);
                    sessionStorage.setItem("loggedInUser", JSON.stringify(response.data));
                    history.push("/home");
                } else {
                    setError("Please check your email/password");
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className="vw-100 bg-dark h-100 p-5" id="login-main">
                <div className="container border-0 rounded w-50">
                    <div role="document">
                        <div className="modal-content">
                            <div className="modal-header p-0">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"><Link to="/register" style={{ color: "inherit", textDecoration: "none" }}>&times;</Link></span>
                                </button>
                                <img src={icon} alt="Otter" id="login-icon" />
                                <div></div>
                            </div>

                            <div className="modal-body mt-0 pt-0 px-5">
                                <h5 className="modal-title h1" id="exampleModalLongTitle">Sign in to Otter</h5>
                                <div className="text-center" id="signin-button-container">
                                    <button className="btn btn-light rounded-pill register-page-button register-page-button-google my-3"> <img src={googleIcon} alt="Google Icon" id="google-icon" />Sign in with Google</button>
                                    <button className="btn btn-light rounded-pill register-page-button">
                                        <svg id="apple-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-apple" viewBox="0 0 16 16">
                                            <path fill="black" d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z" />
                                            <path fill="black" d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z" />
                                        </svg>
                                        Sign in with Apple</button>
                                    <div className="separator mt-3">or</div>
                                </div>

                                <form onSubmit={e => handleSubmit(e)}>
                                    <p className="text-danger bold-font">{error}</p>
                                    <div className="form-group my-3" id="signin-form">
                                        <input type="email" className="form-control signup-input" placeholder="Email" value={email} onInput={e => setEmail(e.target.value)} />
                                    </div>
                                    <div className="form-group my-3">
                                        <input type="password" className="form-control signup-input" placeholder="Password" value={password} onInput={e => setPassword(e.target.value)} />
                                    </div>
                                    <button type="submit" className="btn btn-light rounded-pill register-page-button w-100 p-55 mt-5 mb-3" id="signup-submit-button">Sign in</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="login-mobile" className="container">
            <div className="p-0 d-flex justify-content-between px-1 pt-1">
                                    <img src={backArrow} alt="back arrow" style={{width: "50px", height:"40px"}} onClick={() => history.push("/register")}/>
                                    <img src={icon} alt="Otter" id="login-icon" />
                                    <div style={{width: "70px"}}></div>
                                </div>
                <h5 className="modal-title h1" id="exampleModalLongTitle">Sign in to Otter</h5>
                <div className="text-center" id="signin-button-container">
                    <button className="btn btn-light rounded-pill register-page-button register-page-button-google my-3"> <img src={googleIcon} alt="Google Icon" id="google-icon" />Sign in with Google</button>
                    <button className="btn btn-light rounded-pill register-page-button">
                        <svg id="apple-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-apple" viewBox="0 0 16 16">
                            <path fill="black" d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z" />
                            <path fill="black" d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z" />
                        </svg>
                        Sign in with Apple</button>
                    <div className="separator mt-3">or</div>
                </div>

                <form onSubmit={e => handleSubmit(e)}>
                    <p className="text-danger bold-font">{error}</p>
                    <div className="form-group my-3" id="signin-form">
                        <input type="email" className="form-control signup-input" placeholder="Email" value={email} onInput={e => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group my-3">
                        <input type="password" className="form-control signup-input" placeholder="Password" value={password} onInput={e => setPassword(e.target.value)} />
                    </div>
                        <button type="submit" className="btn btn-light rounded-pill register-page-button w-100 p-55 mt-5 mb-3" id="signup-submit-button">Sign in</button>
                </form>
            </div>
        </>
    )
}
